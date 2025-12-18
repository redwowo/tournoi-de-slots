const http = require('http');

function testEndpoint(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const jsonBody = JSON.parse(body);
          resolve({
            statusCode: res.statusCode,
            body: jsonBody
          });
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            body: body
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing API endpoints...\n');

  try {
    // Test GET /api/players
    console.log('1. Testing GET /api/players...');
    const playersResponse = await testEndpoint('GET', '/api/players');
    console.log('Status:', playersResponse.statusCode);
    console.log('Response:', JSON.stringify(playersResponse.body, null, 2));
    
    if (playersResponse.statusCode === 200) {
      console.log('✅ GET /api/players - SUCCESS\n');
    } else {
      console.log('❌ GET /api/players - FAILED\n');
    }

    // Test POST /api/add-player
    console.log('2. Testing POST /api/add-player...');
    const addPlayerData = {
      category: 'Hacksaw Gaming',
      playerName: 'Test Player'
    };
    const addPlayerResponse = await testEndpoint('POST', '/api/add-player', addPlayerData);
    console.log('Status:', addPlayerResponse.statusCode);
    console.log('Response:', JSON.stringify(addPlayerResponse.body, null, 2));
    
    if (addPlayerResponse.statusCode === 200 && addPlayerResponse.body.success) {
      console.log('✅ POST /api/add-player - SUCCESS\n');
    } else {
      console.log('❌ POST /api/add-player - FAILED\n');
    }

    // Test POST /api/update-player
    console.log('3. Testing POST /api/update-player...');
    const updatePlayerData = {
      category: 'Hacksaw Gaming',
      oldName: 'Test Player',
      newName: 'Updated Test Player'
    };
    const updatePlayerResponse = await testEndpoint('POST', '/api/update-player', updatePlayerData);
    console.log('Status:', updatePlayerResponse.statusCode);
    console.log('Response:', JSON.stringify(updatePlayerResponse.body, null, 2));
    
    if (updatePlayerResponse.statusCode === 200 && updatePlayerResponse.body.success) {
      console.log('✅ POST /api/update-player - SUCCESS\n');
    } else {
      console.log('❌ POST /api/update-player - FAILED\n');
    }

    // Test POST /api/update-category
    console.log('4. Testing POST /api/update-category...');
    const updateCategoryData = {
      category: 'Hacksaw Gaming',
      color: '#101820',
      imagePath: '/newhacksawlogo.png'
    };
    const updateCategoryResponse = await testEndpoint('POST', '/api/update-category', updateCategoryData);
    console.log('Status:', updateCategoryResponse.statusCode);
    console.log('Response:', JSON.stringify(updateCategoryResponse.body, null, 2));
    
    if (updateCategoryResponse.statusCode === 200 && updateCategoryResponse.body.success) {
      console.log('✅ POST /api/update-category - SUCCESS\n');
    } else {
      console.log('❌ POST /api/update-category - FAILED\n');
    }

    console.log('🎉 All tests completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Start the server and run tests
const { spawn } = require('child_process');
console.log('🚀 Starting server...');

const serverProcess = spawn('node', ['server.js'], {
  stdio: 'pipe',
  cwd: __dirname
});

serverProcess.stdout.on('data', (data) => {
  console.log(`[Server] ${data.toString().trim()}`);
  if (data.toString().includes('Serveur démarré')) {
    // Wait a bit more for server to be ready
    setTimeout(() => {
      runTests().then(() => {
        serverProcess.kill();
        process.exit(0);
      });
    }, 2000);
  }
});

serverProcess.stderr.on('data', (data) => {
  console.error(`[Server Error] ${data.toString().trim()}`);
});

serverProcess.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});