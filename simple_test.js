const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');

// Test if server starts correctly
app.get('/test', (req, res) => {
  res.json({ message: 'Test endpoint working' });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Test server listening on port ${PORT}`);
  
  // Now test our endpoints
  setTimeout(() => {
    testEndpoints();
  }, 1000);
});

function testEndpoints() {
  const http = require('http');
  
  // Test GET /api/players
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/players',
    method: 'GET'
  };
  
  const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
      console.log('GET /api/players response:', body);
      console.log('Status:', res.statusCode);
      
      // Test POST /api/add-player
      const postData = JSON.stringify({
        category: 'Hacksaw Gaming',
        playerName: 'Test Player'
      });
      
      const postOptions = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/add-player',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };
      
      const postReq = http.request(postOptions, (postRes) => {
        let postBody = '';
        postRes.on('data', (chunk) => postBody += chunk);
        postRes.on('end', () => {
          console.log('\nPOST /api/add-player response:', postBody);
          console.log('Status:', postRes.statusCode);
          
          server.close();
          process.exit(0);
        });
      });
      
      postReq.on('error', (e) => {
        console.error('POST request error:', e);
        server.close();
        process.exit(1);
      });
      
      postReq.write(postData);
      postReq.end();
    });
  });
  
  req.on('error', (e) => {
    console.error('GET request error:', e);
    console.log('Trying to start main server...');
    
    // Try to start the main server
    const { spawn } = require('child_process');
    const serverProcess = spawn('node', ['server.js'], {
      stdio: 'inherit',
      cwd: __dirname
    });
    
    setTimeout(() => {
      console.log('Server should be starting now...');
      server.close();
      process.exit(0);
    }, 3000);
  });
  
  req.end();
}