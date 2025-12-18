const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialiser Firebase Admin
const serviceAccountPath = path.join(__dirname, '../../serviceAccountKey.json');

if (!fs.existsSync(serviceAccountPath)) {
  // En production, utiliser les variables d'env
  console.log('[import-players] serviceAccountKey.json not found, using env vars');
}

let db;

try {
  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = require(serviceAccountPath);
    const app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: 'tournoi-de-slots'
    });
    db = admin.firestore(app);
  } else {
    // Fallback pour Netlify
    db = admin.firestore();
  }
} catch (error) {
  console.error('[import-players] Firebase init error:', error.message);
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'Method not allowed' })
    };
  }

  try {
    console.log('[import-players] Starting import from players.json...');
    
    // Lire players.json depuis le projet
    const playersJsonPath = path.join(__dirname, '../../players.json');
    
    if (!fs.existsSync(playersJsonPath)) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: false, error: 'players.json not found' })
      };
    }

    const data = JSON.parse(fs.readFileSync(playersJsonPath, 'utf8'));
    
    let categoriesImported = 0;
    let playersImported = 0;

    // Importer les catégories dans Firestore
    console.log('[import-players] Importing categories...');
    for (const [categoryName, categoryData] of Object.entries(data)) {
      if (categoryData.color && categoryData.imagePath) {
        await db.collection('categories').add({
          name: categoryName,
          color: categoryData.color,
          imagePath: categoryData.imagePath
        });
        console.log(`[import-players] ✅ Category: ${categoryName}`);
        categoriesImported++;
      }
    }

    // Importer les joueurs dans Firestore
    console.log('[import-players] Importing players...');
    for (const [categoryName, categoryData] of Object.entries(data)) {
      if (categoryData.players && Array.isArray(categoryData.players)) {
        for (const player of categoryData.players) {
          const playerName = typeof player === 'object' ? player.name : player;
          const playerId = typeof player === 'object' ? player.id : null;
          
          await db.collection('players').add({
            category: categoryName,
            name: playerName,
            ...(playerId && { id: playerId })
          });
          playersImported++;
        }
      }
    }

    console.log('[import-players] ✅ Import completed');
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        message: 'Import completed',
        categoriesImported,
        playersImported
      })
    };
  } catch (error) {
    console.error('[import-players] ❌ Error:', error.message);
    console.error('[import-players] Stack:', error.stack);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};