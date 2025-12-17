const {
  DEFAULT_ADMIN_SESSION_SECONDS,
  getAdminPanelCode,
  createAdminToken,
  serializeCookie
} = require('../../admin-token');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: 'Method not allowed'
      })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (error) {
    body = {};
  }

  const code = String(body?.code || '').trim();

  if (!code || code !== getAdminPanelCode()) {
    return {
      statusCode: 401,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      },
      body: JSON.stringify({
        success: false,
        error: 'Code incorrect'
      })
    };
  }

  const { token, expiresAt, expiresInSeconds } = createAdminToken({
    expiresInSeconds: DEFAULT_ADMIN_SESSION_SECONDS
  });

  const cookie = serializeCookie('admin_token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    path: '/',
    maxAge: expiresInSeconds
  });

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'Set-Cookie': cookie
    },
    body: JSON.stringify({
      success: true,
      expiresAt
    })
  };
};
