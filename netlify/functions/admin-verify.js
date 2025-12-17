const {
  parseCookies,
  verifyAdminToken
} = require('../../admin-token');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        valid: false,
        reason: 'method_not_allowed'
      })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (error) {
    body = {};
  }

  const cookies = parseCookies(event.headers?.cookie);
  const token = body?.token || cookies.admin_token;

  const result = verifyAdminToken(token);

  if (!result.valid) {
    return {
      statusCode: 401,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store'
      },
      body: JSON.stringify({
        valid: false,
        reason: result.reason
      })
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    },
    body: JSON.stringify({
      valid: true,
      expiresAt: result.expiresAt
    })
  };
};
