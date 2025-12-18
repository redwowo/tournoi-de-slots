const path = require('path');
const fs = require('fs');

const playersJsonStore = require('../../players-json-store');

const playersJsonPath = path.resolve(__dirname, '../../players.json');

function ensurePlayersJsonExists() {
  if (!fs.existsSync(playersJsonPath)) {
    const defaultData = {
      'Hacksaw Gaming': { color: '#101820', imagePath: '/hacksawlogo.png', players: [] },
      'Nolimit City': { color: '#ffd100', imagePath: '/nolimitcitylogo.png', players: [] },
      'Pragmatic Play': { color: '#ff6f00', imagePath: '/pragmaticplaylogo.png', players: [] }
    };
    fs.writeFileSync(playersJsonPath, JSON.stringify(defaultData, null, 2));
    console.log('[Netlify] Created default players.json');
  }
}

function getCommonHeaders(extra = {}) {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    ...extra
  };
}

function jsonResponse(statusCode, body, extraHeaders) {
  return {
    statusCode,
    headers: getCommonHeaders(extraHeaders),
    body: JSON.stringify(body)
  };
}

function parseBody(event) {
  if (!event.body) return {};
  try {
    return JSON.parse(event.body);
  } catch (error) {
    const err = new Error('Body JSON invalide');
    err.statusCode = 400;
    throw err;
  }
}

async function handlePlayersJsonRequest(event, action, { successMessage } = {}) {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: getCommonHeaders(),
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, {
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    ensurePlayersJsonExists();
    const payload = parseBody(event);
    const result = await action(payload);

    return jsonResponse(200, {
      success: true,
      message: successMessage,
      ...(result || {})
    });
  } catch (error) {
    console.error('[players.json function] Error:', error);
    return jsonResponse(Number(error.statusCode) || 500, {
      success: false,
      error: error.message || 'Erreur serveur'
    });
  }
}

module.exports = {
  playersJsonStore,
  playersJsonPath,
  handlePlayersJsonRequest,
  ensurePlayersJsonExists
};
