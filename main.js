// Déclarations des fonctions manquantes (à remplacer par les imports si elles sont dans d'autres fichiers)
function addPlayer() {
  console.warn("addPlayer() is not implemented")
}

function closeVictoryMessage() {
  console.warn("closeVictoryMessage() is not implemented")
}

function closeConfirmDialog() {
  console.warn("closeConfirmDialog() is not implemented")
}

function closeResetDialog() {
  console.warn("closeResetDialog() is not implemented")
}

function closeEliminationHistory() {
  console.warn("closeEliminationHistory() is not implemented")
}

function toggleWinnersPanel() {
  console.warn("toggleWinnersPanel() is not implemented")
}

function closeUndoConfirmDialog() {
  console.warn("closeUndoConfirmDialog() is not implemented")
}

function closeRandomSlotDialog() {
  console.warn("closeRandomSlotDialog() is not implemented")
}

// toggleTheme is handled by tournament-navigation.js

function showSuggestions(input) {
  console.warn("showSuggestions() is not implemented")
}

// Déclarations des fonctions manquantes (à remplacer par les imports si elles sont dans d'autres fichiers)
function initTheme() {
  console.warn("initTheme() is not implemented")
}

function initBracket() {
  console.warn("initBracket() is not implemented")
}

function loadDataFromLocalStorage() {
  console.warn("loadDataFromLocalStorage() is not implemented")
}

function updateWinnersDisplay() {
  console.warn("updateWinnersDisplay() is not implemented")
}

// Note: These functions are implemented in tournament-app.js for tournament page
// This main.js file appears to be a fallback/stub file

// Gérer l'appui sur Entrée dans le champ de saisie
document.addEventListener("DOMContentLoaded", () => {
  const playerNameInput = document.getElementById("playerName");
  if (playerNameInput) {
    playerNameInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        if (typeof addPlayer === 'function') {
          addPlayer();
        }
      }
    });
  }

  // Gérer le clic sur l'overlay pour fermer le message de victoire
  const overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      // Fermer uniquement si on clique directement sur l'overlay
      if (e.target === overlay) {
        if (typeof closeVictoryMessage === 'function') closeVictoryMessage();
        if (typeof closeConfirmDialog === 'function') closeConfirmDialog();
        if (typeof closeResetDialog === 'function') closeResetDialog();
        if (typeof closeEliminationHistory === 'function') closeEliminationHistory();
        if (typeof toggleWinnersPanel === 'function') toggleWinnersPanel();
        if (typeof closeUndoConfirmDialog === 'function') closeUndoConfirmDialog();
        if (typeof closeRandomSlotDialog === 'function') closeRandomSlotDialog();
      }
    });
  }

  // Note: themeToggle is handled by tournament-navigation.js for tournament pages
  // Don't add duplicate handlers here

  // Ajouter un événement d'entrée au champ de saisie
  if (playerNameInput) {
    playerNameInput.addEventListener("input", function () {
      if (typeof showSuggestions === 'function') {
        showSuggestions(this);
      }
    });
  }

  // Fermer les suggestions lorsqu'on clique ailleurs
  document.addEventListener("click", (e) => {
    const suggestionsContainer = document.getElementById("suggestionsList");
    const playerNameInput = document.getElementById("playerName");

    if (suggestionsContainer && 
        e.target !== playerNameInput && 
        e.target !== suggestionsContainer && 
        !suggestionsContainer.contains(e.target)) {
      suggestionsContainer.style.display = "none";
    }
  });

  // Fermer les suggestions avec la touche Échap
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const suggestionsContainer = document.getElementById("suggestionsList");
      if (suggestionsContainer) {
        suggestionsContainer.style.display = "none";
      }
    }
  });

  // Initialiser le thème si la fonction existe (avoid conflicts)
  if (typeof initTheme === 'function') {
    initTheme();
  }
  
  // Initialiser le bracket au chargement
  if (typeof initBracket === 'function') {
    initBracket();
  }
});
