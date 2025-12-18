#!/bin/bash

# Script to test API endpoints
echo "🚀 Starting server test..."

# Start server in background
cd /home/engine/project
node server.js > server.log 2>&1 &
SERVER_PID=$!

echo "📝 Server PID: $SERVER_PID"
echo "⏳ Waiting for server to start..."

# Wait for server to be ready
sleep 5

echo "🧪 Testing endpoints..."

# Test GET /api/players
echo ""
echo "1. Testing GET /api/players"
curl -s -w "Status: %{http_code}\n" http://localhost:3000/api/players | head -5

# Test POST /api/add-player
echo ""
echo "2. Testing POST /api/add-player"
curl -s -X POST http://localhost:3000/api/add-player \
  -H "Content-Type: application/json" \
  -d '{"category":"Hacksaw Gaming","playerName":"API Test Player"}' \
  -w "Status: %{http_code}\n"

# Test POST /api/update-player
echo ""
echo "3. Testing POST /api/update-player"
curl -s -X POST http://localhost:3000/api/update-player \
  -H "Content-Type: application/json" \
  -d '{"category":"Hacksaw Gaming","oldName":"API Test Player","newName":"Updated API Test Player"}' \
  -w "Status: %{http_code}\n"

# Test POST /api/update-category
echo ""
echo "4. Testing POST /api/update-category"
curl -s -X POST http://localhost:3000/api/update-category \
  -H "Content-Type: application/json" \
  -d '{"category":"Hacksaw Gaming","color":"#123456"}' \
  -w "Status: %{http_code}\n"

# Test POST /api/delete-player
echo ""
echo "5. Testing POST /api/delete-player"
curl -s -X POST http://localhost:3000/api/delete-player \
  -H "Content-Type: application/json" \
  -d '{"category":"Hacksaw Gaming","playerName":"Updated API Test Player"}' \
  -w "Status: %{http_code}\n"

echo ""
echo "🛑 Stopping server (PID: $SERVER_PID)"
kill $SERVER_PID 2>/dev/null

echo "✅ Tests completed!"