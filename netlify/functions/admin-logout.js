const { serializeCookie } = require('../../admin-token');

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

  const cookie = serializeCookie('admin_token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    path: '/',
    expires: new Date(0),
    maxAge: 0
  });

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'Set-Cookie': cookie
    },
    body: JSON.stringify({
      success: true
    })
  };
};
