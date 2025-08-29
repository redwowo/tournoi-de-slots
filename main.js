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

function toggleTheme() {
  console.warn("toggleTheme() is not implemented")
}

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

// Gérer l'appui sur Entrée dans le champ de saisie
document.getElementById("playerName").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addPlayer()
  }
})

// Gérer le clic sur l'overlay pour fermer le message de victoire
document.getElementById("overlay").addEventListener("click", (e) => {
  // Fermer uniquement si on clique directement sur l'overlay
  if (e.target === document.getElementById("overlay")) {
    closeVictoryMessage()
    closeConfirmDialog()
    closeResetDialog()
    closeEliminationHistory()
    toggleWinnersPanel()
    closeUndoConfirmDialog()
    closeRandomSlotDialog()
  }
})

// Ajouter l'événement de clic pour le bouton de thème
document.getElementById("themeToggle").addEventListener("click", toggleTheme)

// Ajouter un événement d'entrée au champ de saisie
document.getElementById("playerName").addEventListener("input", function () {
  showSuggestions(this)
})

// Fermer les suggestions lorsqu'on clique ailleurs
document.addEventListener("click", (e) => {
  const suggestionsContainer = document.getElementById("suggestionsList")
  const playerNameInput = document.getElementById("playerName")

  if (e.target !== playerNameInput && e.target !== suggestionsContainer && !suggestionsContainer.contains(e.target)) {
    suggestionsContainer.style.display = "none"
  }
})

// Fermer les suggestions avec la touche Échap
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.getElementById("suggestionsList").style.display = "none"
  }
})

// Initialiser le thème et le bracket au chargement
document.addEventListener("DOMContentLoaded", () => {
  initTheme()
  initBracket()
  loadDataFromLocalStorage()
  updateWinnersDisplay()
})

// Initialiser le thème immédiatement pour éviter un flash de thème incorrect
initTheme()
// Initialiser le bracket au chargement
initBracket()
