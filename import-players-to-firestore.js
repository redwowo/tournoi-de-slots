const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.error('❌ serviceAccountKey.json not found');
  console.log('Download it from Firebase Console → Settings → Service Accounts');
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'tournoi-de-slots'
});

const db = admin.firestore();

async function importPlayersToFirestore() {
  try {
    const playersJsonPath = path.join(__dirname, 'players.json');
    
    if (!fs.existsSync(playersJsonPath)) {
      console.error('❌ players.json not found');
      process.exit(1);
    }

    const data = JSON.parse(fs.readFileSync(playersJsonPath, 'utf8'));
    
    let categoriesImported = 0;
    let playersImported = 0;

    // Import categories
    console.log('\n📥 Importing categories...');
    for (const [categoryName, categoryData] of Object.entries(data)) {
      if (typeof categoryData === 'object' && categoryData.color && categoryData.imagePath) {
        await db.collection('categories').add({
          name: categoryName,
          color: categoryData.color,
          imagePath: categoryData.imagePath,
          lastUpdated: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log(`  ✅ ${categoryName}`);
        categoriesImported++;
      }
    }

    // Import players
    console.log('\n📥 Importing players...');
    for (const [categoryName, categoryData] of Object.entries(data)) {
      if (categoryData.players && Array.isArray(categoryData.players)) {
        for (const player of categoryData.players) {
          // player peut être { id, name } ou juste une string
          if (typeof player === 'object' && player.name) {
            await db.collection('players').add({
              id: player.id,
              name: player.name,
              category: categoryName,
              lastUpdated: admin.firestore.FieldValue.serverTimestamp()
            });
            console.log(`  ✅ [${player.id}] ${player.name} (${categoryName})`);
            playersImported++;
          } else if (typeof player === 'string') {
            // Fallback si juste un string
            await db.collection('players').add({
              name: player,
              category: categoryName,
              lastUpdated: admin.firestore.FieldValue.serverTimestamp()
            });
            console.log(`  ✅ ${player} (${categoryName})`);
            playersImported++;
          }
        }
      }
    }

    console.log('\n✅ Import completed!');
    console.log(`📊 ${categoriesImported} categories imported`);
    console.log(`📊 ${playersImported} players imported`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

importPlayersToFirestore();
