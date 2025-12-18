#!/bin/bash

echo "🔍 Vérification de la correction Firestore"
echo "=========================================="
echo ""

# Check window.db initialization
echo "1️⃣ Vérification de l'initialisation window.db..."
if grep -q "window.db = firebase.firestore()" admin-panel.html; then
    echo "   ✅ window.db est correctement initialisé dans admin-panel.html"
else
    echo "   ❌ ERREUR: window.db n'est PAS initialisé correctement!"
    exit 1
fi

echo ""

# Check for direct db.collection calls (should be none)
echo "2️⃣ Vérification des appels directs à db.collection..."
if grep -q "^\s*db\.collection\|await db\.collection" admin-*.js 2>/dev/null; then
    echo "   ❌ ERREUR: Des appels directs à db.collection ont été trouvés!"
    grep -n "^\s*db\.collection\|await db\.collection" admin-*.js
    exit 1
else
    echo "   ✅ Aucun appel direct à db.collection trouvé"
fi

echo ""

# Count window.db usages
echo "3️⃣ Comptage des utilisations de window.db.collection..."
PLAYER_MANAGER=$(grep -c "window.db.collection" admin-players-manager.js || echo "0")
ADMIN_MANAGER=$(grep -c "window.db.collection" admin-manager.js || echo "0")
BONUS_MANAGER=$(grep -c "window.db.collection" admin-bonushunt-manager.js || echo "0")
TOTAL=$((PLAYER_MANAGER + ADMIN_MANAGER + BONUS_MANAGER))

echo "   - admin-players-manager.js: $PLAYER_MANAGER usages"
echo "   - admin-manager.js: $ADMIN_MANAGER usages"
echo "   - admin-bonushunt-manager.js: $BONUS_MANAGER usages"
echo "   ✅ Total: $TOTAL utilisations de window.db.collection"

echo ""

# Check for enhanced logging
echo "4️⃣ Vérification des logs améliorés..."
if grep -q "✅.*Firestore" admin-players-manager.js; then
    echo "   ✅ Logs améliorés présents"
else
    echo "   ⚠️  Logs améliorés non trouvés"
fi

echo ""
echo "=========================================="
echo "✅ Toutes les vérifications sont passées!"
echo ""
echo "Pour tester manuellement:"
echo "1. Ouvrir http://localhost:3000/admin-panel.html"
echo "2. Ouvrir la console du navigateur (F12)"
echo "3. Vérifier le message: '✅ Firebase initialized - window.db is ready: true'"
echo "4. Créer une catégorie et vérifier qu'elle persiste après rechargement"
