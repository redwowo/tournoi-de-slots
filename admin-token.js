const crypto = require('crypto');

const DEFAULT_ADMIN_SESSION_SECONDS = 30 * 60;

function getAdminPanelCode() {
  return process.env.ADMIN_PANEL_CODE || 'golopodie';
}

function getAdminTokenSecret() {
  return process.env.ADMIN_PANEL_TOKEN_SECRET || process.env.ADMIN_PANEL_CODE || 'dev_admin_secret_change_me';
}

function base64UrlEncode(input) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(String(input));
  return buf
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function base64UrlDecode(input) {
  const normalized = String(input)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const padLength = (4 - (normalized.length % 4)) % 4;
  const padded = normalized + '='.repeat(padLength);

  return Buffer.from(padded, 'base64');
}

function signTokenPart(payloadB64, secret) {
  return base64UrlEncode(
    crypto.createHmac('sha256', secret).update(payloadB64).digest()
  );
}

function createAdminToken({ expiresInSeconds = DEFAULT_ADMIN_SESSION_SECONDS } = {}) {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const expiresAtSeconds = nowSeconds + expiresInSeconds;

  const payload = {
    iat: nowSeconds,
    exp: expiresAtSeconds,
    nonce: crypto.randomBytes(16).toString('hex')
  };

  const payloadB64 = base64UrlEncode(JSON.stringify(payload));
  const signatureB64 = signTokenPart(payloadB64, getAdminTokenSecret());

  return {
    token: `${payloadB64}.${signatureB64}`,
    expiresAt: expiresAtSeconds * 1000,
    expiresInSeconds
  };
}

function verifyAdminToken(token, { now = Date.now() } = {}) {
  if (!token || typeof token !== 'string') {
    return { valid: false, reason: 'missing_token' };
  }

  const [payloadB64, signatureB64] = token.split('.');
  if (!payloadB64 || !signatureB64) {
    return { valid: false, reason: 'invalid_format' };
  }

  const expectedSig = signTokenPart(payloadB64, getAdminTokenSecret());

  const sigBuf = Buffer.from(signatureB64);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length) {
    return { valid: false, reason: 'invalid_signature' };
  }

  if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) {
    return { valid: false, reason: 'invalid_signature' };
  }

  let payload;
  try {
    payload = JSON.parse(base64UrlDecode(payloadB64).toString('utf8'));
  } catch (error) {
    return { valid: false, reason: 'invalid_payload' };
  }

  const nowSeconds = Math.floor(now / 1000);
  if (!payload?.exp || typeof payload.exp !== 'number') {
    return { valid: false, reason: 'missing_exp' };
  }

  if (payload.exp <= nowSeconds) {
    return { valid: false, reason: 'expired' };
  }

  return {
    valid: true,
    payload,
    expiresAt: payload.exp * 1000
  };
}

function parseCookies(cookieHeader) {
  const header = cookieHeader || '';
  return header
    .split(';')
    .map(part => part.trim())
    .filter(Boolean)
    .reduce((acc, part) => {
      const index = part.indexOf('=');
      if (index === -1) return acc;
      const key = part.slice(0, index).trim();
      const value = part.slice(index + 1).trim();
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
}

function serializeCookie(name, value, options = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`];

  if (options.maxAge != null) {
    parts.push(`Max-Age=${Math.floor(options.maxAge)}`);
  }

  if (options.expires) {
    parts.push(`Expires=${options.expires.toUTCString()}`);
  }

  parts.push(`Path=${options.path || '/'}`);

  if (options.httpOnly) parts.push('HttpOnly');
  if (options.secure) parts.push('Secure');

  if (options.sameSite) {
    parts.push(`SameSite=${options.sameSite}`);
  }

  return parts.join('; ');
}

module.exports = {
  DEFAULT_ADMIN_SESSION_SECONDS,
  getAdminPanelCode,
  createAdminToken,
  verifyAdminToken,
  parseCookies,
  serializeCookie
};
