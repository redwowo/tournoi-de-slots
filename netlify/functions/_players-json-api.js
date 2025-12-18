const path = require('path');
const fs = require('fs');

const playersJsonStore = require('../../players-json-store');

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

const defaultData = {
  'Hacksaw Gaming': { color: '#101820', imagePath: '/hacksawlogo.png', players: [] },
  'Nolimit City': { color: '#ffd100', imagePath: '/nolimitcitylogo.png', players: [] },
  'Pragmatic Play': { color: '#ff6f00', imagePath: '/pragmaticplaylogo.png', players: [] }
};

function ensurePlayersJsonExists() {
  console.log('[ensurePlayersJsonExists] Starting check...');
  console.log('[ensurePlayersJsonExists] playersJsonPath:', playersJsonPath);
  console.log('[ensurePlayersJsonExists] __dirname:', __dirname);
  console.log('[ensurePlayersJsonExists] process.cwd():', process.cwd());
  console.log('[ensurePlayersJsonExists] isNetlify:', isNetlify);
  console.log('[ensurePlayersJsonExists] LAMBDA_TASK_ROOT:', process.env.LAMBDA_TASK_ROOT);
  
  try {
    const exists = fs.existsSync(playersJsonPath);
    console.log('[ensurePlayersJsonExists] File exists?', exists);
    
    if (!exists) {
      console.log('[ensurePlayersJsonExists] Creating default players.json...');
      
      // On Netlify, we need to copy from the bundled source if available
      if (isNetlify) {
        const sourcePath = path.join(process.env.LAMBDA_TASK_ROOT || '', 'players.json');
        console.log('[ensurePlayersJsonExists] Checking source path:', sourcePath);
        
        if (fs.existsSync(sourcePath)) {
          console.log('[ensurePlayersJsonExists] Copying from source to /tmp/');
          const sourceContent = fs.readFileSync(sourcePath, 'utf8');
          fs.writeFileSync(playersJsonPath, sourceContent);
          console.log('[ensurePlayersJsonExists] ✓ Copied from source');
          return;
        }
      }
      
      // Create with default data
      fs.writeFileSync(playersJsonPath, JSON.stringify(defaultData, null, 2));
      console.log('[ensurePlayersJsonExists] ✓ Created with default data');
    } else {
      console.log('[ensurePlayersJsonExists] ✓ File already exists');
      // Log file size for debugging
      const stats = fs.statSync(playersJsonPath);
      console.log('[ensurePlayersJsonExists] File size:', stats.size, 'bytes');
    }
  } catch (error) {
    console.error('[ensurePlayersJsonExists] ERROR:', error.message);
    console.error('[ensurePlayersJsonExists] Stack:', error.stack);
    throw error;
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
  console.log('[handlePlayersJsonRequest] Starting request handler');
  console.log('[handlePlayersJsonRequest] HTTP Method:', event.httpMethod);
  console.log('[handlePlayersJsonRequest] Path:', event.path);
  
  if (event.httpMethod === 'OPTIONS') {
    console.log('[handlePlayersJsonRequest] Handling CORS preflight');
    return {
      statusCode: 200,
      headers: getCommonHeaders(),
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    console.log('[handlePlayersJsonRequest] Method not allowed:', event.httpMethod);
    return jsonResponse(405, {
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    console.log('[handlePlayersJsonRequest] Ensuring players.json exists...');
    ensurePlayersJsonExists();
    
    console.log('[handlePlayersJsonRequest] Parsing request body...');
    const payload = parseBody(event);
    console.log('[handlePlayersJsonRequest] Parsed payload:', JSON.stringify(payload));
    
    console.log('[handlePlayersJsonRequest] Executing action...');
    const result = await action(payload);
    console.log('[handlePlayersJsonRequest] Action result:', JSON.stringify(result));

    console.log('[handlePlayersJsonRequest] ✓ Success');
    return jsonResponse(200, {
      success: true,
      message: successMessage,
      ...(result || {})
    });
  } catch (error) {
    console.error('[handlePlayersJsonRequest] ❌ ERROR:', error.message);
    console.error('[handlePlayersJsonRequest] Error statusCode:', error.statusCode);
    console.error('[handlePlayersJsonRequest] Error stack:', error.stack);
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
