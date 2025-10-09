const express = require('express');
const path = require('path');
const app = express();

// Redirige /tournois vers tournois.html (AVANT express.static)
app.get('/tournois', (req, res) => {
  res.sendFile(path.join(__dirname, 'tournois.html'));
});

// Route pour les tournois spécifiques (ex: /tournoi/s4emrt9h)
app.get('/tournoi/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Sert tous les fichiers statiques du dossier courant (APRÈS les routes spécifiques)
app.use(express.static(__dirname));

// (Optionnel) Redirige /accueil vers index.html si tu veux
app.get('/accueil', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Démarre le serveur sur le port 3000
app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
}); 