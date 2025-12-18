const path = require('path');
const fs = require('fs');
const { playersJsonStore } = require('./_players-json-api');

// Detect if we're running on Netlify (Lambda environment)
const isNetlify = !!(process.env.LAMBDA_TASK_ROOT || process.env.AWS_LAMBDA_FUNCTION_NAME);

// On Netlify Functions (AWS Lambda), use /tmp/ for writable storage
// Local filesystem is read-only in Lambda
let playersJsonPath;

if (isNetlify) {
  playersJsonPath = '/tmp/players.json';
  console.log('[Netlify] Using /tmp/players.json for Lambda environment');
} else {
  playersJsonPath = path.resolve(__dirname, '../../players.json');
  console.log('[Local] Using local path:', playersJsonPath);
}

function getCommonHeaders(extra = {}) {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
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

exports.handler = async (event) => {
  console.log('[GET /api/players] Starting request handler');
  console.log('[GET /api/players] HTTP Method:', event.httpMethod);
  console.log('[GET /api/players] Path:', event.path);
  
  if (event.httpMethod === 'OPTIONS') {
    console.log('[GET /api/players] Handling CORS preflight');
    return {
      statusCode: 200,
      headers: getCommonHeaders(),
      body: ''
    };
  }

  if (event.httpMethod !== 'GET') {
    console.log('[GET /api/players] Method not allowed:', event.httpMethod);
    return jsonResponse(405, {
      success: false,
      error: 'Method not allowed. Use GET.'
    });
  }

  try {
    console.log('[GET /api/players] Reading players.json...');
    
    // Ensure file exists
    if (!fs.existsSync(playersJsonPath)) {
      console.log('[GET /api/players] File not found, creating default...');
      const defaultData = {
        'Hacksaw Gaming': { color: '#101820', imagePath: '/hacksawlogo.png', players: [] },
        'Nolimit City': { color: '#ffd100', imagePath: '/nolimitcitylogo.png', players: [] },
        'Pragmatic Play': { color: '#ff6f00', imagePath: '/pragmaticplaylogo.png', players: [] }
      };
      fs.writeFileSync(playersJsonPath, JSON.stringify(defaultData, null, 2));
    }
    
    const categories = playersJsonStore.readPlayersJson(playersJsonPath);
    
    // Transform to match expected format
    const response = {
      categories,
      players: {}
    };
    
    // Build players object with just the names
    Object.entries(categories).forEach(([categoryName, category]) => {
      response.players[categoryName] = category.players.map(player => player.name);
    });
    
    console.log('[GET /api/players] ✓ Success');
    return jsonResponse(200, response);
  } catch (error) {
    console.error('[GET /api/players] ❌ ERROR:', error.message);
    return jsonResponse(500, {
      success: false,
      error: 'Impossible de récupérer les données des joueurs'
    });
  }
};