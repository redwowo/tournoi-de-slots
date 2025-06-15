// Création de l'objet global TournamentApp
window.TournamentApp = {
  // Données des machines à sous
  slotMachines: [
    "Dorks of the Deep",
    "Strength of Hercules",
    "Hounds of Hell",
    "FRKN Bananas",
    "Marlin Masters",
    "Phoenix DuelReels",
    "Le Viking",
    "Klowns",
    "Fire my Laser",
    "Donut Division",
    "Shaolin Master",
    "Snow Slingers",
    "Duel at Dawn",
    "Wings of Horus",
    "Rise of Ymir",
    "Get the CHEESE",
    "Cloud Princess",
    "Le Pharaoh",
    "Evil Eyes",
    "Octo Attack",
    "Donny Dough",
    "Dragon's Domain",
    "SixSixSix",
    "Tai the Toad",
    "Twisted Lab",
    "Ze Zeus",
    "Cursed Crypt",
    "Slayers Inc",
    "Jelly Slice",
    "Keep'em",
    "Divine Drop",
    "Orb of Destiny",
    "Cash Crew",
    "Rusty & Curly",
    "Bouncy Bombs",
    "Dawn of Kings",
    "Fist of Destruction",
    "Beam Boys",
    "Feel the Beat",
    "2 Wild 2 Die",
    "Dark Summoning",
    "Xmas Drop",
    "Immortal Desire",
    "Eye of the Panda",
    "Benny the Beer",
    "Chaos Crew 2",
    "Densho",
    "Le Bandit",
    "Ronin Stackways",
    "Drop'em",
    "Vending Machine",
    "Beast Below",
    "Mighty Masks",
    "Temple of Torment",
    "Mayan Stackways",
    "Cursed Seas",
    "Fear the Dark",
    "Stormforged",
    "Keep 'em Cool",
    "Magic Piggy",
    "Bloodthirst",
    "Frank's Farm",
    "Rip City",
    "Rotten",
    "Gronk's Gems",
    "Book of Time",
    "Pug Life",
    "Undead Fortune",
    "Break Bones",
    "Alpha Eagle",
    "Forest Fortune",
    "Time Spinners",
    "Fruit Duel",
    "Dork Unit",
    "Born Wild",
    "Outlaws Inc.",
    "Buffalo Stack'n'Sync",
    "Itero",
    "Hand Of Anubis",
    "Gladiator Legends",
    "Warrior Ways",
    "Double Rainbow",
    "The Bowery Boys",
    "Harvest Wilds",
    "King Carrot",
    "Joker Bombs",
    "Tasty Treats",
    "Cash Quest",
    "Wanted Dead Or a Wild",
    "Rocket Reels",
    "Toshi Video Club",
    "Xpander",
    "Hop'N'Pop",
    "Stack'Em",
    "Frutz",
    "Aztec Twist",
    "Cubes 2",
    "Let It Snow",
    "Mystery Motel",
    "Chaos Crew",
    "The Respinners",
    "Cash Compass",
    "Cubes",
    "Miami Multiplier",
    "OmNom",
    "Stick'Em",
  ],

  nolimitCityMachines: [
    "Mental II",
    "Home of the Brave",
    "Dead, Dead Or Deader",
    "Duck Hunters",
    "Tombstone Slaughter: El Gordo's Revenge",
    "xWays Hoarder 2",
    "Outsourced: Payday",
    "Tanked",
    "Munchies",
    "Outsourced: Slash Game",
    "Blood & Shadow 2",
    "Brute Force",
    "San Quentin 2: Death Row",
    "Skate or Die",
    "Stockholm Syndrome",
    "Outsourced",
    "Apocalypse Super xNudge®",
    "Punk Rocker 2",
    "Beheaded",
    "Deadwood R.I.P",
    "Loner",
    "Kenneth Must Die",
    "Tombstone: No Mercy",
    "BRICK SNAKE 2000",
    "Possessed",
    "Fire in the Hole 2",
    "D-Day",
    "Land Of The Free",
    "Devil's Crossroad",
    "Jingle Balls",
    "Nine To Five",
    "Roadkill",
    "Ugliest Catch",
    "Space Donkey",
    "The Crypt",
    "DJ Psycho",
    "True Kult",
    "Bounty Hunters",
    "The Cage",
    "Gluttony",
    "Whacked!",
    "Disturbed",
    "Kiss My Chainsaw",
    "Blood & Shadow",
    "Benji Killed In Vegas",
    "Walk of Shame",
    "Dead Canary",
    "Pearl Harbor",
    "Rock Bottom",
    "Serial",
    "Little Bighorn",
    "The Border",
    "Road Rage",
    "The Rave",
    "Folsom Prison",
    "Karen Maneater",
    "Remember Gulag",
    "Misery Mining",
    "Punk Toilet",
    "Tombstone R.I.P",
    "True Grit Redemption",
    "Legion X",
    "Evil Goblins xBomb®",
    "Das xBoot",
    "Mental",
    "xWays Hoarder xSplit",
    "Infectious 5 xWays®",
    "El Paso Gunfight xNudge®",
    "Bushido Ways xNudge®",
    "Fire In The Hole",
    "East Coast VS West Coast",
    "San Quentin xWays®",
    "Tomb of Akhenaten",
    "Warrior Graveyard xNudge",
    "Monkey's Gold xPays",
    "Buffalo Hunter",
    "Book of Shadows",
    "Immortal Fruits",
    "Golden Genie And The Walking Wilds",
    "Milky Ways",
    "Bonus Bunnies",
    "Deadwood xNudge®",
    "Harlequin Carnival",
    "Gaelic Gold",
    "Barbarian Fury",
    "Punk Rocker",
    "Poison Eve",
    "Dragon Tribe",
    "Tomb of Néfertiti",
    "Manhattan Goes Wild",
  ],

  // Add Pragmatic Play machines
  pragmaticPlayMachines: [
    "5 Lions Megaways 2",
    "5 Lions Reborn",
    "6 Jokers",
    "7 Clovers of Fortune",
    "Ancient Island Megaways",
    "Angel vs Sinner",
    "Aztec Gems Megaways",
    "Aztec Smash",
    "Aztec Treasure Hunt",
    "Badge Blitz",
    "Bandit Megaways",
    "Big Bass Bonanza 1000",
    "Big Bass Bonanza 3 Reeler",
    "Big Bass Boxing Bonus Round",
    "Big Bass Halloween 2",
    "Big Bass Return to the Races",
    "Big Bass Vegas Double Down Deluxe",
    "Big Bass Xmas Extreme",
    "Bigger Bass Splash",
    "Blitz Super Wheel",
    "Book of Monsters",
    "Bow of Artemis",
    "Brick House Bonanza",
    "Candy Corner",
    "Cash Surge",
    "Chests of Cai Shen",
    "Congo Cash XL",
    "Crank It Up",
    "Dragon Gold 88",
    "Dragon King Hot Pots",
    "Dynamite Diggin Doug",
    "Emotiwins",
    "Escape the Pyramid Fire & Ice",
    "Eternal Empress Freeze Time",
    "Eye of Spartacus",
    "Fangtastic Freespins",
    "Fiesta Fortune",
    "Floating Dragon Year of the Snake",
    "Fonzos Feline Fortunes",
    "Forging Wilds",
    "Fortune Hitn Roll",
    "Gates of Hades",
    "Gates of Olympus Super Scatter",
    "Gates of Olympus Xmas 1000",
    "Gem Elevator",
    "Greedy Fortune Pig",
    "Hand of Midas 2",
    "Himalayan Wild",
    "Hot to Burn 7 Deadly Free Spins",
    "Irish Crown",
    "Jackpot Hunter",
    "Jelly Candy",
    "John Hunter and Galileos Secrets",
    "Jokers Jewels Cash",
    "Jokers Jewels Hot",
    "Jokers Jewels Wild",
    "Jumbo Safari",
    "Lucky Dog",
    "Lucky Monkey",
    "Lucky Mouse",
    "Lucky Ox",
    "Lucky Phoenix",
    "Lucky Tiger",
    "Lucky Tiger 1000",
    "Luckys Wild Pub",
    "Mahjong Wins Super Scatter",
    "Majestic Express Gold Run",
    "Might of Freya Megaways",
    "Mining Rush",
    "Moleionaire",
    "Money Stacks",
    "Money Stacks Megaways",
    "Mummys Jewels",
    "Mustang Gold Megaways",
    "Mystery Mice",
    "Oodles of Noodles",
    "Penguins Christmas Party Time",
    "Peppes Pepperoni Pizza Plaza",
    "Plushie Wins",
    "Raging Waterfall Megaways",
    "Ratinho Sortudo",
    "Release the Kraken Megaways",
    "Resurrecting Riches",
    "Ride The Lightning",
    "Running Sushi",
    "Samurai Code",
    "Santas Xmas Rush",
    "Savannah Legend",
    "Sleeping Dragon",
    "Sumo Supreme Megaways",
    "Sweet Kingdom",
    "Temple Guardians",
    "The Dog House Muttley Crew",
    "The Dog House Royal Hunt",
    "Tiny Toads",
    "Touro Sortudo",
    "Triple Pot Gold",
    "Vampy Party",
    "Volcano Goddess",
    "Wealthy Frog",
    "Wild West Gold Blazing Bounty",
    "Wild Wild Joker",
    "Wild Wild Pearls",
    "Wild Wildebeest Wins",
    "Wisdom of Athena 1000",
    "Witch Heart Megaways",
    "Wolf Gold Ultimate",
    "Yeti Quest",
  ],

  // Variables d'état
  players: [],
  matches: [],
  eliminated: [],
  winner: "",
  tournamentStarted: false,
  eliminationHistory: [],
  previousWinners: [],
  tournamentCompleted: false,
  randomSlotSelected: "",
  randomSlotCategory: "",
  selectedSlotType: "all",
  currentRoundIndex: -1,
  currentMatchIndex: -1,
  selectedSlotsArray: [],
  currentSlotIndex: 0,
}

// Ajouter cette fonction après la déclaration de TournamentApp
// Mapping des machines vers leurs URLs
function getMachineURL(machineName, category) {
  // Format de base pour les URLs
  const baseURL = "https://howl.gg/slots/"

  // Déterminer le préfixe en fonction de la catégorie
  let prefix = ""
  if (category === "Hacksaw Gaming") {
    prefix = "hacksaw-gaming-"
  } else if (category === "Nolimit City") {
    prefix = "nolimit-city-"
  } else if (category === "Pragmatic Play") {
    prefix = "pragmatic-play-"
  }

  // Formater le nom de la machine pour l'URL
  // Supprimer le symbole ® et convertir en minuscules avec tirets
  const formattedName = machineName.replace(/®/g, "").toLowerCase().replace(/\s+/g, "-")

  // Cas spéciaux pour certaines machines qui pourraient avoir une URL différente
  const specialCases = {
    "le-bandit": "hacksaw-gaming-le-bandit",
    "le-viking": "hacksaw-gaming-le-viking",
    "le-pharaoh": "hacksaw-gaming-le-pharaoh",
    // Ajoutez d'autres cas spéciaux ici si nécessaire
  }

  if (specialCases[formattedName]) {
    return baseURL + specialCases[formattedName]
  }

  // URL standard
  return baseURL + prefix + formattedName
}

// ===== FONCTIONS UI =====

// Fonction pour sauvegarder les données dans localStorage
function saveDataToLocalStorage() {
  const tournamentData = {
    players: TournamentApp.players,
    matches: TournamentApp.matches,
    eliminated: TournamentApp.eliminated,
    winner: TournamentApp.winner,
    tournamentStarted: TournamentApp.tournamentStarted,
    eliminationHistory: TournamentApp.eliminationHistory,
    previousWinners: TournamentApp.previousWinners,
    tournamentCompleted: TournamentApp.tournamentCompleted,
  }
  localStorage.setItem("tournamentData", JSON.stringify(tournamentData))
}

// Fonction pour charger les données depuis localStorage
function loadDataFromLocalStorage() {
  const savedData = localStorage.getItem("tournamentData")
  if (savedData) {
    try {
      const tournamentData = JSON.parse(savedData)
      TournamentApp.players = tournamentData.players || []
      TournamentApp.matches = tournamentData.matches || []
      TournamentApp.eliminated = tournamentData.eliminated || []
      TournamentApp.winner = tournamentData.winner || ""
      TournamentApp.tournamentStarted = tournamentData.tournamentStarted || false
      TournamentApp.eliminationHistory = tournamentData.eliminationHistory || []
      TournamentApp.tournamentCompleted = tournamentData.tournamentCompleted || false

      // Convertir les dates de chaîne en objets Date
      TournamentApp.eliminationHistory.forEach((item) => {
        if (typeof item.time === "string") {
          item.time = new Date(item.time)
        }
      })

      TournamentApp.previousWinners = tournamentData.previousWinners || []

      // Convertir les dates de chaîne en objets Date pour les gagnants précédents
      TournamentApp.previousWinners.forEach((item) => {
        if (typeof item.date === "string") {
          item.date = new Date(item.date)
        }
      })

      // Mettre à jour l'affichage des gagnants précédents
      updateWinnersDisplay()

      // Mettre à jour l'interface utilisateur
      updatePlayersDisplay()
      document.getElementById("count").innerText = `Slot ajoutés : ${TournamentApp.players.length}/16`

      // Afficher/masquer les éléments appropriés
      if (TournamentApp.tournamentStarted) {
        document.getElementById("bracket").style.display = "flex"
        document.getElementById("resetButton").style.display = "block"
        document.getElementById("launchDraw").style.display = "none"
        document.getElementById("addPlayerContainer").style.display = "none"
        document.getElementById("randomSlotBtn").style.display = "none"

        if (TournamentApp.eliminationHistory.length > 0) {
          document.getElementById("eliminationHistoryBtn").style.display = "block"
        }

        renderBracket()
      } else {
        if (TournamentApp.players.length === 16) {
          document.getElementById("addPlayerContainer").style.display = "none"
          document.getElementById("randomSlotBtn").style.display = "none"
          document.getElementById("launchDraw").style.display = "block"
        }
      }

      showToast("Données chargées", "Les données du tournoi précédent ont été restaurées.", "success")
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error)
      // En cas d'erreur, réinitialiser les données
      clearAllData()
    }
  }
}

// Initialiser le thème
function initTheme() {
  // Vérifier si un thème est enregistré dans localStorage
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    document.documentElement.className = savedTheme
  } else {
    // Vérifier les préférences système
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.className = "dark"
    } else {
      // Si aucune préférence n'est définie, utiliser le thème clair par défaut
      document.documentElement.className = "light"
    }
  }

  // Mettre à jour l'icône du bouton
  updateThemeToggleIcon()
}

// Basculer entre les thèmes
function toggleTheme() {
  if (document.documentElement.className === "light") {
    document.documentElement.className = "dark"
    localStorage.setItem("theme", "dark")
  } else {
    document.documentElement.className = "light"
    localStorage.setItem("theme", "light")
    localStorage.setItem("theme", "light")
  }

  // Mettre à jour l'icône du bouton
  updateThemeToggleIcon()
}

// Mettre à jour l'icône du bouton de thème
function updateThemeToggleIcon() {
  const themeToggle = document.getElementById("themeToggle")
  if (document.documentElement.className === "dark") {
    themeToggle.innerHTML = '<img src="./soleil.png" alt="Soleil" width="20" height="20">'
    themeToggle.setAttribute("aria-label", "Passer au thème clair")
  } else {
    themeToggle.innerHTML = '<img src="./lune.png" alt="Lune" width="20" height="20">'
    themeToggle.setAttribute("aria-label", "Passer au thème sombre")
  }
}

// Modification de la structure des données pour inclure des URLs
// Ajoutez cette fonction pour définir les URLs des machines
function setMachineURL(machineName, url) {
  // Trouver la machine dans la liste des joueurs
  const machineIndex = TournamentApp.players.findIndex((player) => player.name === machineName)

  if (machineIndex !== -1) {
    // Ajouter ou mettre à jour l'URL
    TournamentApp.players[machineIndex].url = url
    // Sauvegarder les données
    saveDataToLocalStorage()
    // Mettre à jour l'affichage
    updatePlayersDisplay()
    return true
  }
  return false
}

// Modifier la fonction updatePlayersDisplay pour ajouter des liens
function updatePlayersDisplay() {
  const ul = document.getElementById("playersDisplay")
  ul.innerHTML = ""

  TournamentApp.players.forEach((player, index) => {
    const li = document.createElement("li")
    li.id = `player-list-${player.name.replace(/\s+/g, "-")} `

    const playerItem = document.createElement("div")
    playerItem.className = "player-item"

    const playerInfo = document.createElement("div")
    playerInfo.style.display = "flex"
    playerInfo.style.alignItems = "center"

    // Créer un élément lien pour chaque machine
    const playerElement = document.createElement("a")
    playerElement.href = getMachineURL(player.name, player.category)
    playerElement.target = "_blank" // Ouvrir dans un nouvel onglet
    playerElement.rel = "noopener noreferrer" // Sécurité pour les liens externes
    playerElement.style.textDecoration = "none" // Enlever le soulignement par défaut
    playerElement.style.color = "inherit" // Garder la couleur du texte
    playerElement.style.cursor = "pointer" // Montrer que c'est cliquable
    playerElement.textContent = player.name

    // Ajouter la classe eliminated si nécessaire
    if (TournamentApp.eliminated.includes(player.name)) {
      playerElement.classList.add("eliminated")
    }

    playerInfo.appendChild(playerElement)

    // Ajouter le badge de catégorie seulement si la machine a une catégorie
    if (player.category) {
      const categoryBadge = document.createElement("span")
      categoryBadge.className = "category-badge"

      // Ajouter une classe spécifique selon la catégorie
      if (player.category === "Hacksaw Gaming") {
        categoryBadge.classList.add("hacksaw")
      } else if (player.category === "Nolimit City") {
        categoryBadge.classList.add("nolimit")
      } else if (player.category === "Pragmatic Play") {
        categoryBadge.classList.add("pragmatic")
      }

      categoryBadge.textContent = player.category
      playerInfo.appendChild(categoryBadge)
    }

    const removeButton = document.createElement("button")
    removeButton.innerHTML = '<img src="./croix.png" alt="Supprimer" width="16" height="16">'
    removeButton.className = "remove-btn"
    removeButton.title = "Retirer cette machine"
    removeButton.onclick = () => {
      removePlayer(index)
    }

    // Désactiver le bouton de suppression si le tournoi a commencé
    if (TournamentApp.tournamentStarted) {
      removeButton.disabled = true
      removeButton.style.opacity = "0.5"
      removeButton.style.cursor = "not-allowed"
    }

    playerItem.appendChild(playerInfo)
    playerItem.appendChild(removeButton)

    li.appendChild(playerItem)
    ul.appendChild(li)
  })
}

// Mettre à jour l'affichage des gagnants précédents
function updateWinnersDisplay() {
  const winnersList = document.getElementById("winnersList")
  winnersList.innerHTML = ""

  if (TournamentApp.previousWinners.length > 0) {
    TournamentApp.previousWinners.sort((a, b) => b.date - a.date) // Trier par date décroissante

    TournamentApp.previousWinners.forEach((winner) => {
      const li = document.createElement("li")
      li.className = "winner-item"

      const trophy = document.createElement("div")
      trophy.className = "winner-trophy"
      trophy.textContent = "🏆"

      const info = document.createElement("div")
      info.className = "winner-info"

      const name = document.createElement("div")
      name.className = "winner-name"
      name.textContent = winner.name

      const date = document.createElement("div")
      date.className = "winner-date"
      date.textContent = winner.date.toLocaleDateString()

      info.appendChild(name)
      info.appendChild(date)

      li.appendChild(trophy)
      li.appendChild(info)

      winnersList.appendChild(li)
    })
  } else {
    const noWinners = document.createElement("li")
    noWinners.className = "no-winners"
    noWinners.textContent = "Aucun gagnant enregistré"
    winnersList.appendChild(noWinners)
  }
}

// Fonction pour afficher les suggestions de machines
function showSuggestions(input) {
  const inputValue = input.value.trim().toLowerCase()
  const suggestionsContainer = document.getElementById("suggestionsList")

  // Vider le conteneur de suggestions
  suggestionsContainer.innerHTML = ""

  // Si l'entrée est vide, cacher les suggestions
  if (inputValue.length < 2) {
    suggestionsContainer.style.display = "none"
    return
  }

  // Rechercher des correspondances dans les trois listes
  const hacksawMatches = TournamentApp.slotMachines.filter(
    (machine) =>
      machine.toLowerCase().includes(inputValue) && !TournamentApp.players.some((player) => player.name === machine),
  )

  const nolimitMatches = TournamentApp.nolimitCityMachines.filter(
    (machine) =>
      machine.toLowerCase().includes(inputValue) && !TournamentApp.players.some((player) => player.name === machine),
  )

  const pragmaticMatches = TournamentApp.pragmaticPlayMachines.filter(
    (machine) =>
      machine.toLowerCase().includes(inputValue) && !TournamentApp.players.some((player) => player.name === machine),
  )

  // Combiner les résultats et limiter à 10 suggestions
  const allMatches = [...hacksawMatches, ...nolimitMatches, ...pragmaticMatches].slice(0, 10)

  // Si aucune correspondance, afficher un message
  if (allMatches.length === 0) {
    const noSuggestions = document.createElement("div")
    noSuggestions.className = "no-suggestions"
    noSuggestions.textContent = "Aucune machine correspondante trouvée"
    suggestionsContainer.appendChild(noSuggestions)
  } else {
    // Créer un élément pour chaque suggestion
    allMatches.forEach((machine) => {
      const item = document.createElement("div")
      item.className = "suggestion-item"

      const nameSpan = document.createElement("span")
      nameSpan.className = "suggestion-name"
      nameSpan.textContent = machine

      const categorySpan = document.createElement("span")
      categorySpan.className = "suggestion-category"

      if (TournamentApp.slotMachines.includes(machine)) {
        categorySpan.textContent = "Hacksaw"
        categorySpan.classList.add("hacksaw")
      } else if (TournamentApp.nolimitCityMachines.includes(machine)) {
        categorySpan.textContent = "Nolimit"
        categorySpan.classList.add("nolimit")
      } else if (TournamentApp.pragmaticPlayMachines.includes(machine)) {
        categorySpan.textContent = "Pragmatic"
        categorySpan.classList.add("pragmatic")
      }

      item.appendChild(nameSpan)
      item.appendChild(categorySpan)

      // Ajouter un événement de clic pour sélectionner cette suggestion
      item.addEventListener("click", () => {
        input.value = machine
        suggestionsContainer.style.display = "none"
        // Optionnel : ajouter automatiquement la machine après sélection
        // addPlayer();
      })

      suggestionsContainer.appendChild(item)
    })
  }

  // Afficher le conteneur de suggestions
  suggestionsContainer.style.display = "block"
}

// Afficher une notification toast
function showToast(title, message, type = "default") {
  const toastContainer = document.getElementById("toastContainer")

  const toast = document.createElement("div")
  toast.className = `toast ${type}`

  const toastTitle = document.createElement("div")
  toastTitle.className = "toast-title"
  toastTitle.textContent = title

  const toastMessage = document.createElement("div")
  toastMessage.className = "toast-message"
  toastMessage.textContent = message

  toast.appendChild(toastTitle)
  toast.appendChild(toastMessage)

  toastContainer.appendChild(toast)

  // Supprimer le toast après 3 secondes
  setTimeout(() => {
    toast.style.animation = "slideOut 0.3s ease-out forwards"
    setTimeout(() => {
      toastContainer.removeChild(toast)
    }, 300)
  }, 3000)
}

// Afficher la boîte de dialogue de confirmation
function showConfirmDialog(title, message, confirmCallback) {
  const dialog = document.getElementById("confirmDialog")
  const titleElement = document.getElementById("confirmDialogTitle")
  const messageElement = document.getElementById("confirmDialogMessage")
  const confirmButton = document.getElementById("confirmDialogConfirmBtn")

  titleElement.textContent = title
  messageElement.textContent = message

  // Définir la fonction de rappel pour le bouton de confirmation
  confirmButton.onclick = confirmCallback

  // Afficher l'overlay et la boîte de dialogue
  document.getElementById("overlay").style.display = "block"
  dialog.style.display = "block"
}

// Fermer la boîte de dialogue de confirmation
function closeConfirmDialog() {
  document.getElementById("confirmDialog").style.display = "none"
  document.getElementById("overlay").style.display = "none"
}

// Afficher l'historique des éliminations
function showEliminationHistory() {
  const eliminationList = document.getElementById("eliminationList")
  eliminationList.innerHTML = ""

  if (TournamentApp.eliminationHistory.length > 0) {
    TournamentApp.eliminationHistory.forEach((elimination, index) => {
      const li = document.createElement("li")
      li.className = "elimination-item"

      const header = document.createElement("div")
      header.className = "elimination-header"

      const eliminatedPlayer = document.createElement("span")
      eliminatedPlayer.className = "eliminated-player"
      eliminatedPlayer.textContent = elimination.loser

      const round = document.createElement("span")
      round.className = "elimination-round"
      round.textContent = elimination.roundName

      header.appendChild(eliminatedPlayer)
      header.appendChild(round)

      const details = document.createElement("div")
      details.className = "elimination-details"
      details.textContent = `Éliminée par ${elimination.winner}`

      const time = document.createElement("div")
      time.className = "elimination-time"
      time.textContent = elimination.time.toLocaleString()

      li.appendChild(header)
      li.appendChild(details)
      li.appendChild(time)

      eliminationList.appendChild(li)
    })
  } else {
    const emptyMessage = document.createElement("p")
    emptyMessage.textContent = "Aucune élimination enregistrée"
    emptyMessage.style.textAlign = "center"
    emptyMessage.style.color = "var(--muted-text)"
    eliminationList.appendChild(emptyMessage)
  }

  document.getElementById("eliminationHistoryModal").style.display = "block"
  document.getElementById("overlay").style.display = "block"
}

// Fermer l'historique des éliminations
function closeEliminationHistory() {
  document.getElementById("eliminationHistoryModal").style.display = "none"
  document.getElementById("overlay").style.display = "none"
}

// Afficher/masquer le panneau des gagnants précédents
function toggleWinnersPanel() {
  const panel = document.getElementById("winnersPanel")
  const isVisible = panel.style.display === "block"

  if (isVisible) {
    panel.style.display = "none"
    document.getElementById("overlay").style.display = "none"
  } else {
    updateWinnersDisplay() // Mettre à jour la liste avant d'afficher
    panel.style.display = "block"
    document.getElementById("overlay").style.display = "block"
  }
}

// Afficher la boîte de dialogue de réinitialisation
function showResetConfirmDialog() {
  document.getElementById("resetDialog").style.display = "block"
  document.getElementById("overlay").style.display = "block"
}

// Fermer la boîte de dialogue de réinitialisation
function closeResetDialog() {
  document.getElementById("resetDialog").style.display = "none"
  document.getElementById("overlay").style.display = "none"
}

// Fermer la boîte de dialogue d'annulation de match
function closeUndoConfirmDialog() {
  document.getElementById("undoConfirmDialog").style.display = "none"
  document.getElementById("overlay").style.display = "none"
}

// Afficher la boîte de dialogue de confirmation d'annulation de match
function showUndoConfirmDialog(roundIndex, matchIndex) {
  // Store the current match indices globally
  TournamentApp.currentRoundIndex = roundIndex
  TournamentApp.currentMatchIndex = matchIndex

  const match = TournamentApp.matches[roundIndex][matchIndex]

  // Obtenir les noms des joueurs sans les checkmarks
  const p1Name = match.p1.replace(" ✓", "")
  const p2Name = match.p2.replace(" ✓", "")

  // Déterminer le gagnant et le perdant
  const winnerName = match.p1.includes(" ✓") ? p1Name : p2Name
  const loserName = match.p1.includes(" ✓") ? p2Name : p1Name

  // Définir le message de confirmation
  document.getElementById("undoConfirmMessage").innerHTML =
    `Êtes-vous sûr de vouloir annuler le résultat de ce match entre <strong>${p1Name}</strong> et <strong>${p2Name}</strong> ?<br><br>` +
    `<strong>${winnerName}</strong> ne sera plus considéré comme le vainqueur et <strong>${loserName}</strong> sera retiré de la liste des éliminés.`

  // Afficher la boîte de dialogue
  document.getElementById("undoConfirmDialog").style.display = "block"
  document.getElementById("overlay").style.display = "block"
}

// Afficher la boîte de dialogue de sélection aléatoire améliorée
function showRandomSlotDialog() {
  // Réinitialiser l'état
  document.getElementById("randomSlotResult").style.display = "none"
  document.getElementById("addRandomSlotBtn").style.display = "none"
  document.getElementById("slotSelecting").style.display = "none"
  document.getElementById("selectRandomBtn").disabled = false

  // Réinitialiser les variables
  TournamentApp.selectedSlotsArray = []
  TournamentApp.currentSlotIndex = 0

  // Sélectionner l'option "Toutes les machines" par défaut
  const allOption = document.querySelector('.slot-type-option[data-value="all"]')
  selectSlotType(allOption, "all")

  // Mettre à jour le nombre maximum de machines disponibles
  updateMaxAvailableSlots()

  // Afficher la boîte de dialogue
  document.getElementById("randomSlotDialog").style.display = "block"
  document.getElementById("overlay").style.display = "block"
}

// Fermer la boîte de dialogue de sélection aléatoire
function closeRandomSlotDialog() {
  document.getElementById("randomSlotDialog").style.display = "none"
  document.getElementById("overlay").style.display = "none"

  // Nettoyer le résultat
  const resultElement = document.getElementById("randomSlotResult")
  // Supprimer le compteur s'il existe
  const countElement = document.querySelector("#randomSlotResult div:last-child")
  if (countElement && (countElement.textContent.includes("machine") || countElement.textContent.includes("Machine"))) {
    resultElement.removeChild(countElement)
  }

  // Réinitialiser les variables
  TournamentApp.selectedSlotsArray = []
  TournamentApp.currentSlotIndex = 0
}

// Fonction pour mettre à jour le nombre maximum de machines disponibles
function updateMaxAvailableSlots() {
  let availableSlots = []

  if (TournamentApp.selectedSlotType === "all") {
    const allSlots = [
      ...TournamentApp.slotMachines,
      ...TournamentApp.nolimitCityMachines,
      ...TournamentApp.pragmaticPlayMachines,
    ]
    availableSlots = allSlots.filter((slot) => !TournamentApp.players.some((player) => player.name === slot))
  } else if (TournamentApp.selectedSlotType === "hacksaw") {
    availableSlots = TournamentApp.slotMachines.filter(
      (slot) => !TournamentApp.players.some((player) => player.name === slot),
    )
  } else if (TournamentApp.selectedSlotType === "nolimit") {
    availableSlots = TournamentApp.nolimitCityMachines.filter(
      (slot) => !TournamentApp.players.some((player) => player.name === slot),
    )
  } else if (TournamentApp.selectedSlotType === "pragmatic") {
    availableSlots = TournamentApp.pragmaticPlayMachines.filter(
      (slot) => !TournamentApp.players.some((player) => player.name === slot),
    )
  }

  // Mettre à jour l'affichage du nombre total de machines disponibles
  document.getElementById("maxAvailable").textContent = availableSlots.length

  // Limiter le nombre maximum dans l'input
  const slotCountInput = document.getElementById("slotCount")

  // Limiter à 16 machines maximum, ou moins si moins de places disponibles dans le tournoi
  const maxSelectable = Math.min(16, 16 - TournamentApp.players.length)

  // Limiter également au nombre de machines disponibles
  slotCountInput.max = Math.min(availableSlots.length, maxSelectable)

  // Si la valeur actuelle est supérieure au maximum, la réduire
  if (Number.parseInt(slotCountInput.value) > Number.parseInt(slotCountInput.max)) {
    slotCountInput.value = slotCountInput.max
  }

  // Vérification supplémentaire pour s'assurer que la valeur ne dépasse jamais 16
  if (Number.parseInt(slotCountInput.value) > 16) {
    slotCountInput.value = 16
  }
}

// Fonction pour valider le nombre de machines sélectionnées
function validateSlotCount(input) {
  // S'assurer que la valeur ne dépasse jamais 16
  if (Number.parseInt(input.value) > 16) {
    input.value = 16
    showToast("Limite atteinte", "Le nombre maximum de machines sélectionnables est de 16.", "warning")
  }

  // Mettre à jour le nombre maximum disponible
  updateMaxAvailableSlots()
}

// Fonction pour mettre à jour l'interface après l'ajout d'une machine
function updateRandomSlotInterface() {
  // Mettre à jour le nombre maximum de machines disponibles
  updateMaxAvailableSlots()

  // Mettre à jour l'affichage des joueurs
  updatePlayersDisplay()

  // Mettre à jour le compteur de machines
  document.getElementById("count").innerText = `Slot ajoutés : ${TournamentApp.players.length}/16`
}

// ===== FONCTIONS TOURNAMENT =====

// Initialiser le bracket
function initBracket() {
  TournamentApp.matches = []
  for (let i = 0; i < 4; i++) {
    TournamentApp.matches[i] = []
    for (let j = 0; j < Math.pow(2, 4 - i - 1); j++) {
      TournamentApp.matches[i][j] = { p1: "", p2: "", score1: "", score2: "" }
    }
  }
  renderBracket()
}

// Rendre le bracket
function renderBracket() {
  const bracket = document.getElementById("bracket")
  bracket.innerHTML = ""
  const rounds = ["🎯 Huitièmes", "🏅 Quarts", "🥈 Demi-finales", "🏆 Finale"]

  for (let i = 0; i < 4; i++) {
    const round = document.createElement("div")
    round.className = "round"

    const roundTitle = document.createElement("h3")
    roundTitle.textContent = rounds[i]
    round.appendChild(roundTitle)

    const matchCount = Math.pow(2, 4 - i - 1)
    for (let j = 0; j < matchCount; j++) {
      const matchWrapper = document.createElement("div")
      matchWrapper.className = "match-wrapper"
      matchWrapper.id = `match-wrapper-${i}-${j}`

      const match = document.createElement("div")
      match.className = "match"
      match.id = `match-${i}-${j}`
      match.innerHTML = renderMatchButtons(i, j)

      matchWrapper.appendChild(match)

      // Ajouter les connecteurs pour les lignes
      if (i < 3) {
        // Pas de connecteur pour la finale
        // Connecteur horizontal vers la droite
        const horizontalConnector = document.createElement("div")
        horizontalConnector.className = "connector connector-horizontal"
        horizontalConnector.style.top = "50%"
        matchWrapper.appendChild(horizontalConnector)
      }

      // Connecteur vertical pour les matchs qui ne sont pas le dernier de leur round
      if (j % 2 === 0 && j < matchCount - 1) {
        const verticalConnector = document.createElement("div")
        verticalConnector.className = "connector connector-vertical"
        verticalConnector.style.top = "100%"
        verticalConnector.style.height = "2rem"
        matchWrapper.appendChild(verticalConnector)
      }

      round.appendChild(matchWrapper)
    }
    bracket.appendChild(round)
  }

  // Ajuster les espacements pour les rounds avec moins de matchs
  adjustBracketSpacing()
}

// Ajuster les espacements pour que les lignes se connectent correctement
function adjustBracketSpacing() {
  for (let i = 1; i < 4; i++) {
    // Commencer au deuxième round (quarts)
    const prevRoundMatchCount = Math.pow(2, 4 - i)
    const currentRoundMatchCount = Math.pow(2, 4 - i - 1)

    for (let j = 0; j < currentRoundMatchCount; j++) {
      const matchWrapper = document.getElementById(`match-wrapper-${i}-${j}`)
      if (matchWrapper) {
        // Calculer la hauteur totale que devrait occuper ce match
        // Augmenté le multiplicateur de 4 à 6 pour plus d'espace
        const totalHeight = (prevRoundMatchCount / currentRoundMatchCount) * 6 + "rem"
        matchWrapper.style.height = totalHeight

        // Centrer le match dans son wrapper
        const match = matchWrapper.querySelector(".match")
        if (match) {
          match.style.position = "absolute"
          match.style.top = "50%"
          match.style.transform = "translateY(-50%)"
          match.style.width = "calc(100% - 1rem)"
        }
      }
    }
  }
}

// Rendre les boutons de match
function renderMatchButtons(i, j) {
  const match = TournamentApp.matches[i][j]
  const p1HasCheckmark = match.p1 && match.p1.includes(" ✓")
  const p2HasCheckmark = match.p2 && match.p2.includes(" ✓")
  const p1Name = match.p1 ? match.p1.replace(" ✓", "") : ""
  const p2Name = match.p2 ? match.p2.replace(" ✓", "") : ""

  // Vérifier si les deux joueurs sont présents
  const bothPlayersPresent = match.p1 && match.p2
  const matchCompleted = p1HasCheckmark || p2HasCheckmark

  // Classes et attributs pour le joueur 1
  let p1Classes = "player-btn"
  let p1Disabled = "disabled"
  if (match.p1) {
    if (p1HasCheckmark) {
      p1Classes += " winner"
    } else if (!bothPlayersPresent) {
      p1Classes += " waiting"
    } else if (!matchCompleted && !TournamentApp.tournamentCompleted) {
      p1Disabled = ""
    }
  }

  // Classes et attributs pour le joueur 2
  let p2Classes = "player-btn"
  let p2Disabled = "disabled"
  if (match.p2) {
    if (p2HasCheckmark) {
      p2Classes += " winner"
    } else if (!bothPlayersPresent) {
      p2Classes += " waiting"
    } else if (!matchCompleted && !TournamentApp.tournamentCompleted) {
      p2Disabled = ""
    }
  }

  // Ajouter le checkmark pour le gagnant
  const p1Display = p1HasCheckmark ? `${p1Name} <span class="checkmark">✓</span>` : match.p1
  const p2Display = p2HasCheckmark ? `${p2Name} <span class="checkmark">✓</span>` : match.p2

  const btn1 = match.p1
    ? `<button class="${p1Classes}" ${p1Disabled} 
            onclick="setWinner(${i}, ${j}, '${p1Name.replace(/'/g, "\\'")}')" title="${p1Name}">${p1Display}</button>`
    : `<button class="player-btn" disabled>---</button>`

  const btn2 = match.p2
    ? `<button class="${p2Classes}" ${p2Disabled} 
            onclick="setWinner(${i}, ${j}, '${p2Name.replace(/'/g, "\\'")}')" title="${p2Name}">${p2Display}</button>`
    : `<button class="player-btn" disabled>---</button>`

  let matchHtml = `${btn1}${btn2}`

  // Ajouter un message d'information si un seul joueur est présent
  if ((match.p1 && !match.p2) || (!match.p1 && match.p2)) {
    matchHtml += `<div class="match-info">En attente du second joueur</div>`
  }

  // Ajouter les champs de score si les deux joueurs sont présents
  if (bothPlayersPresent) {
    // Si le match est terminé, afficher les scores dans une boîte de score
    if (matchCompleted) {
      if (match.score1 !== "" || match.score2 !== "") {
        matchHtml += `
                <div class="score-box">
                    <div class="score-box-value">
                        <span>${match.score1 || "0"}</span>
                        <span>-</span>
                        <span>${match.score2 || "0"}</span>
                    </div>
                </div>`
      }
    } else {
      // Sinon, afficher les champs de saisie de score
      matchHtml += `
            <div class="score-inputs">
                <input type="number" min="0" class="score-input" id="score1-${i}-${j}" 
                    value="${match.score1}" placeholder="0" 
                    style="${match.score1 ? "width: " + Math.max(45, match.score1.toString().length * 10 + 25) + "px" : ""}"
                    onchange="updateScore(${i}, ${j}, 'score1', this.value)"
                    oninput="this.style.width = Math.max(45, (this.value.length * 10) + 25) + 'px'">
                <span class="score-separator">-</span>
                <input type="number" min="0" class="score-input" id="score2-${i}-${j}" 
                    value="${match.score2}" placeholder="0" 
                    style="${match.score2 ? "width: " + Math.max(45, match.score2.toString().length * 10 + 25) + "px" : ""}"
                    onchange="updateScore(${i}, ${j}, 'score2', this.value)"
                    oninput="this.style.width = Math.max(45, (this.value.length * 10) + 25) + 'px'">
            </div>`
    }
  }

  // Ajouter un bouton d'annulation si le match est terminé et que le tournoi n'est pas terminé
  if (matchCompleted && !TournamentApp.tournamentCompleted) {
    matchHtml += `<button class="undo-match-btn" onclick="showUndoConfirmDialog(${i}, ${j})">
            <span class="undo-icon">↺</span> Annuler ce match
        </button>`
  }

  return matchHtml
}

// Modifions la fonction addPlayer pour s'assurer que le bouton de tirage apparaît correctement
function addPlayer() {
  const nameInput = document.getElementById("playerName")
  const name = nameInput.value.trim()

  // Vérifier si le nom est vide
  if (!name) {
    showToast("Nom invalide", "Veuillez entrer un nom de machine valide.", "error")
    return
  }

  // Vérifier si le joueur existe déjà (insensible à la casse)
  const playerExists = TournamentApp.players.some((player) => player.name.toLowerCase() === name.toLowerCase())

  if (playerExists) {
    showToast("Machine déjà inscrite", "Cette machine est déjà inscrite au tournoi !", "error")
    // Mettre en surbrillance le champ de saisie
    nameInput.focus()
    nameInput.classList.add("input-error")
    // Retirer la classe après un délai
    setTimeout(() => {
      nameInput.classList.remove("input-error")
    }, 2000)
    return
  }

  // Ajouter le joueur si la limite n'est pas atteinte
  if (TournamentApp.players.length < 16) {
    // Vérifier si la machine est dans l'une des listes
    const isHacksawGaming = TournamentApp.slotMachines.includes(name)
    const isNolimitCity = TournamentApp.nolimitCityMachines.includes(name)
    const isPragmaticPlay = TournamentApp.pragmaticPlayMachines.includes(name)

    // Déterminer la catégorie
    let category = ""
    if (isHacksawGaming) {
      category = "Hacksaw Gaming"
    } else if (isNolimitCity) {
      category = "Nolimit City"
    } else if (isPragmaticPlay) {
      category = "Pragmatic Play"
    }

    // Ajouter le joueur avec sa catégorie
    TournamentApp.players.push({
      name: name,
      category: category,
    })
    nameInput.value = ""
    document.getElementById("count").innerText = `Slot ajoutés : ${TournamentApp.players.length}/16`
    updatePlayersDisplay()

    // Sauvegarder les données
    saveDataToLocalStorage()

    console.log("Nombre de joueurs:", TournamentApp.players.length) // Débogage

    // Vérifier si on a atteint 16 joueurs
    if (TournamentApp.players.length >= 16) {
      console.log("16 joueurs atteints, affichage du bouton de tirage") // Débogage
      // Cacher le conteneur d'ajout de joueurs
      document.getElementById("addPlayerContainer").style.display = "none"
      document.getElementById("randomSlotBtn").style.display = "none"
      // Afficher le bouton de tirage
      document.getElementById("launchDraw").style.display = "block"
    }

    showToast("Machine ajoutée", `${name} a été ajoutée au tournoi.`, "success")
  } else if (TournamentApp.players.length >= 16) {
    showToast("Limite atteinte", "Le tournoi est limité à 16 machines !", "error")
  }
}

// Améliorons la fonction launchDraw pour s'assurer qu'elle fonctionne correctement
function launchDraw() {
  console.log("Lancement du tirage...") // Débogage

  // Afficher l'animation de chargement
  document.getElementById("loadingOverlay").style.display = "flex"
  updateLoadingProgress()

  try {
    // Utiliser setTimeout pour simuler un temps de chargement plus court
    setTimeout(() => {
      console.log("Première étape du tirage") // Débogage

      // Première étape - simuler le traitement
      setTimeout(() => {
        console.log("Deuxième étape du tirage") // Débogage

        // Deuxième étape - continuer le traitement
        setTimeout(() => {
          console.log("Troisième étape du tirage") // Débogage

          try {
            // Troisième étape - finaliser et afficher le tournoi
            TournamentApp.tournamentStarted = true
            shufflePlayers()
            placePlayersRandomly()

            // Mettre à jour l'interface
            document.getElementById("bracket").style.display = "flex"
            document.getElementById("launchDraw").style.display = "none"
            document.getElementById("resetButton").style.display = "block"
            document.getElementById("addPlayerContainer").style.display = "none"
            document.getElementById("randomSlotBtn").style.display = "none"

            // Mettre à jour l'affichage pour désactiver les boutons de suppression
            updatePlayersDisplay()

            // Sauvegarder les données
            saveDataToLocalStorage()

            // Masquer l'animation de chargement
            document.getElementById("loadingOverlay").style.display = "none"

            showToast(
              "Tournoi lancé !",
              "Le tirage au sort a été effectué. Que la meilleure machine gagne !",
              "success",
            )

            console.log("Tournoi lancé avec succès") // Débogage
          } catch (error) {
            console.error("Erreur lors de la finalisation du tournoi:", error)
            document.getElementById("loadingOverlay").style.display = "none"
            showToast("Erreur", "Une erreur est survenue lors du lancement du tournoi.", "error")
          }
        }, 500) // Délai réduit à 0.5 seconde pour la troisième étape
      }, 500) // Délai réduit à 0.5 seconde pour la deuxième étape
    }, 500) // Délai réduit à 0.5 seconde pour la première étape
  } catch (error) {
    console.error("Erreur lors du lancement du tirage:", error)
    document.getElementById("loadingOverlay").style.display = "none"
    showToast("Erreur", "Une erreur est survenue lors du lancement du tournoi.", "error")
  }
}

// Ajouter cette fonction après la fonction launchDraw()
function updateLoadingProgress() {
  const progressBar = document.getElementById("loadingProgress")
  const loadingText = document.getElementById("loadingText")

  // Démarrer l'animation de la barre de progression
  progressBar.style.width = "0%"

  // Forcer un reflow pour que la transition fonctionne
  void progressBar.offsetWidth

  // Animer jusqu'à 100%
  progressBar.style.width = "100%"

  // Mettre à jour le texte pendant le chargement
  setTimeout(() => {
    loadingText.textContent = "Mélange des machines..."
  }, 500)

  setTimeout(() => {
    loadingText.textContent = "Création des matchs..."
  }, 1000)

  setTimeout(() => {
    loadingText.textContent = "Finalisation du tournoi..."
  }, 1500)
}

// Mélanger les joueurs
function shufflePlayers() {
  for (let i = TournamentApp.players.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[TournamentApp.players[i], TournamentApp.players[j]] = [TournamentApp.players[j], TournamentApp.players[i]]
  }
}

// Placer les joueurs aléatoirement
function placePlayersRandomly() {
  for (let i = 0; i < TournamentApp.players.length; i++) {
    const matchIndex = Math.floor(i / 2)
    if (i % 2 === 0) {
      TournamentApp.matches[0][matchIndex].p1 = TournamentApp.players[i].name
      TournamentApp.matches[0][matchIndex].score1 = ""
    } else {
      TournamentApp.matches[0][matchIndex].p2 = TournamentApp.players[i].name
      TournamentApp.matches[0][matchIndex].score2 = ""
    }
  }
  renderBracket()
}

// Définir le gagnant d'un match
function setWinner(roundIndex, matchIndex, winnerName) {
  // Vérifier si le tournoi est déjà terminé
  if (TournamentApp.tournamentCompleted) {
    showToast("Action impossible", "Le tournoi est déjà terminé avec un gagnant déclaré !", "error")
    return
  }

  const match = TournamentApp.matches[roundIndex][matchIndex]

  // Vérifier si les deux joueurs sont présents
  if (!match.p1 || !match.p2) {
    showToast(
      "Action impossible",
      "Impossible de déterminer un gagnant tant que les deux machines ne sont pas présentes !",
      "error",
    )
    return
  }

  // Nettoyer les noms des joueurs (enlever les checkmarks s'ils existent)
  const p1Name = match.p1.replace(" ✓", "")
  const p2Name = match.p2.replace(" ✓", "")

  // Déterminer le perdant
  const loserName = p1Name === winnerName ? p2Name : p1Name

  // Ajouter le perdant à la liste des éliminés s'il n'y est pas déjà
  if (!TournamentApp.eliminated.includes(loserName)) {
    TournamentApp.eliminated.push(loserName)
    const playerElement = document.querySelector(`#player-list-${loserName.replace(/\s+/g, "-")} span`)
    if (playerElement) playerElement.classList.add("eliminated")

    // Ajouter à l'historique des éliminations
    const roundNames = ["Huitièmes", "Quarts", "Demi-finales", "Finale"]
    TournamentApp.eliminationHistory.push({
      winner: winnerName,
      loser: loserName,
      round: roundIndex,
      roundName: roundNames[roundIndex],
      time: new Date(),
    })

    // Afficher le bouton d'historique des éliminations s'il n'est déjà visible
    document.getElementById("eliminationHistoryBtn").style.display = "block"

    showToast(`${loserName} éliminée !`, `${winnerName} remporte le match et avance au prochain tour.`, "success")
  }

  // Marquer le match actuel comme terminé
  if (p1Name === winnerName) {
    TournamentApp.matches[roundIndex][matchIndex].p1 = winnerName + " ✓"
    TournamentApp.matches[roundIndex][matchIndex].p2 = loserName
  } else {
    TournamentApp.matches[roundIndex][matchIndex].p2 = winnerName + " ✓"
    TournamentApp.matches[roundIndex][matchIndex].p1 = loserName
  }

  // Conserver les scores existants (ne pas les réinitialiser)
  // Les scores sont maintenant purement informatifs

  const nextRound = roundIndex + 1
  const nextMatchIndex = Math.floor(matchIndex / 2)

  // Faire avancer le gagnant au prochain tour
  if (nextRound < 4) {
    const nextMatch = TournamentApp.matches[nextRound][nextMatchIndex]

    // Déterminer si le joueur doit être placé en position p1 ou p2
    // Si le match actuel a un index pair, le gagnant va en p1, sinon en p2
    if (matchIndex % 2 === 0) {
      nextMatch.p1 = winnerName
      // Ne pas réinitialiser le score1, juste le définir s'il n'existe pas
      if (nextMatch.score1 === undefined) nextMatch.score1 = ""
    } else {
      nextMatch.p2 = winnerName
      // Ne pas réinitialiser le score2, juste le définir s'il n'existe pas
      if (nextMatch.score2 === undefined) nextMatch.score2 = ""
    }

    renderBracket()
  } else {
    // C'est la finale, nous avons un gagnant du tournoi
    TournamentApp.winner = winnerName
    TournamentApp.tournamentCompleted = true // Marquer le tournoi comme terminé
    showVictoryMessage(winnerName)
  }

  // Sauvegarder les données
  saveDataToLocalStorage()
}

// Afficher le message de victoire
function showVictoryMessage(winnerName) {
  document.getElementById("winnerText").innerHTML =
    `🏆 Félicitations <strong>${winnerName}</strong>, grande gagnante du tournoi ! 🎉`
  document.getElementById("victoryMessage").style.display = "block"
  document.getElementById("overlay").style.display = "block"
}

// Fermer le message de victoire
function closeVictoryMessage() {
  // Ajouter le gagnant à la liste des gagnants précédents
  if (TournamentApp.winner) {
    TournamentApp.previousWinners.push({
      name: TournamentApp.winner,
      date: new Date(),
    })

    // Mettre à jour l'affichage des gagnants
    updateWinnersDisplay()

    // Afficher un message indiquant que le tournoi est terminé
    if (TournamentApp.tournamentCompleted) {
      showToast(
        "Tournoi terminé",
        `${TournamentApp.winner} est la grande gagnante ! Pour commencer un nouveau tournoi, utilisez le bouton "Réinitialiser le tournoi".`,
        "success",
      )
    }

    // Sauvegarder les données
    saveDataToLocalStorage()
  }

  document.getElementById("victoryMessage").style.display = "none"
  document.getElementById("overlay").style.display = "none"
}

// Réinitialiser le tournoi avec option
function resetTournamentWithOption(keepPlayers) {
  // Sauvegarder la liste des joueurs si demandé
  const savedPlayers = keepPlayers ? [...TournamentApp.players] : []

  // Réinitialiser les variables
  TournamentApp.players = keepPlayers ? savedPlayers : []
  TournamentApp.matches = []
  TournamentApp.eliminated = []
  TournamentApp.winner = ""
  TournamentApp.tournamentStarted = false
  TournamentApp.tournamentCompleted = false // Réinitialiser l'état de complétion du tournoi

  // Réinitialiser l'interface
  document.getElementById("bracket").style.display = "none"
  document.getElementById("resetButton").style.display = "none"
  document.getElementById("launchDraw").style.display =
    keepPlayers && TournamentApp.players.length === 16 ? "block" : "none"
  document.getElementById("eliminationHistoryBtn").style.display =
    TournamentApp.eliminationHistory.length > 0 ? "block" : "none"
  document.getElementById("count").innerText = `Slot ajoutés : ${TournamentApp.players.length}/16`

  // Mettre à jour l'affichage des joueurs
  updatePlayersDisplay()

  // Réafficher le conteneur d'ajout de joueurs si nécessaire
  document.getElementById("addPlayerContainer").style.display =
    keepPlayers && TournamentApp.players.length === 16 ? "none" : "block"
  document.getElementById("randomSlotBtn").style.display =
    keepPlayers && TournamentApp.players.length === 16 ? "none" : "block"

  // Initialiser un nouveau bracket
  initBracket()

  // Sauvegarder les données
  saveDataToLocalStorage()

  showToast(
    "Tournoi réinitialisé",
    keepPlayers
      ? "Le tournoi a été réinitialisé en conservant la liste des machines."
      : "Toutes les données du tournoi ont été effacées.",
    "success",
  )

  // Fermer la boîte de dialogue
  closeResetDialog()
}

// Effacer toutes les données
function clearAllData() {
  localStorage.removeItem("tournamentData")
  location.reload() // Recharger la page pour repartir de zéro
}

// Mettre à jour le score d'un match
function updateScore(roundIndex, matchIndex, scoreType, scoreValue) {
  TournamentApp.matches[roundIndex][matchIndex][scoreType] = scoreValue

  // Conserver la largeur du champ après la mise à jour
  const inputElement = document.getElementById(`${scoreType}-${roundIndex}-${matchIndex}`)
  if (inputElement && scoreValue) {
    inputElement.style.width = Math.max(45, scoreValue.toString().length * 10 + 25) + "px"
  }

  saveDataToLocalStorage()
  renderBracket()
}

// Fonction pour annuler un match
function undoMatch() {
  const roundIndex = TournamentApp.currentRoundIndex
  const matchIndex = TournamentApp.currentMatchIndex

  const match = TournamentApp.matches[roundIndex][matchIndex]

  // Obtenir les noms des joueurs sans les checkmarks
  const p1Name = match.p1.replace(" ✓", "")
  const p2Name = match.p2.replace(" ✓", "")

  // Déterminer le gagnant et le perdant
  const winnerName = match.p1.includes(" ✓") ? p1Name : p2Name
  const loserName = match.p1.includes(" ✓") ? p2Name : p1Name

  // Retirer le checkmark du gagnant
  match.p1 = p1Name
  match.p2 = p2Name

  // Retirer le perdant de la liste des éliminés
  const eliminatedIndex = TournamentApp.eliminated.indexOf(loserName)
  if (eliminatedIndex !== -1) {
    TournamentApp.eliminated.splice(eliminatedIndex, 1)
  }

  // Retirer de l'historique des éliminations
  TournamentApp.eliminationHistory = TournamentApp.eliminationHistory.filter(
    (item) => !(item.winner === winnerName && item.loser === loserName && item.round === roundIndex),
  )

  // Mettre à jour l'affichage des joueurs pour retirer la classe eliminated
  const playerElement = document.querySelector(`#player-list-${loserName.replace(/\s+/g, "-")} span`)
  if (playerElement) playerElement.classList.remove("eliminated")

  // Vérifier si nous devons retirer le joueur des tours suivants
  if (roundIndex < 3) {
    // Pas la finale
    const nextRound = roundIndex + 1
    const nextMatchIndex = Math.floor(matchIndex / 2)
    const nextMatch = TournamentApp.matches[nextRound][nextMatchIndex]

    // Vérifier si le gagnant est présent dans le match suivant
    if (nextMatch.p1 === winnerName || nextMatch.p2 === winnerName) {
      // Déterminer si le joueur était en position p1 ou p2 dans le match suivant
      if (nextMatch.p1 === winnerName) {
        nextMatch.p1 = ""
        nextMatch.score1 = ""
      } else if (nextMatch.p2 === winnerName) {
        nextMatch.p2 = ""
        nextMatch.score2 = ""
      }

      // Si le match suivant a déjà un gagnant, annuler récursivement ce match aussi
      if (nextMatch.p1.includes(" ✓") || nextMatch.p2.includes(" ✓")) {
        // Sauvegarder les indices actuels
        const savedRoundIndex = TournamentApp.currentRoundIndex
        const savedMatchIndex = TournamentApp.currentMatchIndex

        // Mettre à jour les indices pour le match suivant
        TournamentApp.currentRoundIndex = nextRound
        TournamentApp.currentMatchIndex = nextMatchIndex

        // Annuler le match suivant
        undoMatch()

        // Restaurer les indices
        TournamentApp.currentRoundIndex = savedRoundIndex
        TournamentApp.currentMatchIndex = savedMatchIndex
      } else {
        // Vérifier et propager les annulations aux tours suivants même sans gagnant
        checkAndPropagateUndos(nextRound, nextMatchIndex, winnerName)
      }
    }
  } else {
    // Si c'était la finale, réinitialiser le gagnant et le drapeau tournamentCompleted
    if (TournamentApp.winner === winnerName) {
      TournamentApp.winner = ""
      TournamentApp.tournamentCompleted = false
    }
  }

  // Mettre à jour l'affichage du bracket
  renderBracket()

  // Sauvegarder les données
  saveDataToLocalStorage()

  // Fermer la boîte de dialogue
  closeUndoConfirmDialog()

  // Afficher un message de succès
  showToast("Match annulé", `Le résultat du match entre ${p1Name} et ${p2Name} a été annulé.`, "success")
}

// Nouvelle fonction pour vérifier et propager les annulations aux tours suivants
function checkAndPropagateUndos(roundIndex, matchIndex, playerName) {
  if (roundIndex >= 3) return // Arrêter à la finale

  const nextRound = roundIndex + 1
  const nextMatchIndex = Math.floor(matchIndex / 2)

  if (nextRound < TournamentApp.matches.length) {
    const nextMatch = TournamentApp.matches[nextRound][nextMatchIndex]

    // Vérifier si le joueur est présent dans le match suivant
    if (nextMatch.p1 === playerName) {
      nextMatch.p1 = ""
      nextMatch.score1 = ""
      // Continuer la propagation
      checkAndPropagateUndos(nextRound, nextMatchIndex, playerName)
    } else if (nextMatch.p2 === playerName) {
      nextMatch.p2 = ""
      nextMatch.score2 = ""
      // Continuer la propagation
      checkAndPropagateUndos(nextRound, nextMatchIndex, playerName)
    }
  }
}

// Sélectionner un type de slot
function selectSlotType(element, type) {
  // Mettre à jour la variable globale
  TournamentApp.selectedSlotType = type

  // Mettre à jour l'interface utilisateur
  const options = document.querySelectorAll(".slot-type-option")
  options.forEach((option) => {
    option.classList.remove("selected")
  })
  element.classList.add("selected")

  // Mettre à jour le nombre maximum de machines disponibles
  updateMaxAvailableSlots()
}

// Sélectionner une machine à sous aléatoire avec animation
function selectRandomSlot() {
  // Désactiver le bouton pendant l'animation
  document.getElementById("selectRandomBtn").disabled = true

  // Récupérer le type de machine sélectionné
  const slotType = TournamentApp.selectedSlotType

  // Récupérer le nombre de machines à sélectionner
  const slotCount = Number.parseInt(document.getElementById("slotCount").value) || 1

  let availableSlots = []

  if (slotType === "all") {
    // Combiner les trois listes
    const allSlots = [
      ...TournamentApp.slotMachines,
      ...TournamentApp.nolimitCityMachines,
      ...TournamentApp.pragmaticPlayMachines,
    ]
    // Filtrer les machines qui ne sont pas déjà dans la liste des joueurs
    availableSlots = allSlots.filter((slot) => !TournamentApp.players.some((player) => player.name === slot))
  } else if (slotType === "hacksaw") {
    // Filtrer uniquement les machines Hacksaw Gaming
    availableSlots = TournamentApp.slotMachines.filter(
      (slot) => !TournamentApp.players.some((player) => player.name === slot),
    )
  } else if (slotType === "nolimit") {
    // Filtrer uniquement les machines Nolimit City
    availableSlots = TournamentApp.nolimitCityMachines.filter(
      (slot) => !TournamentApp.players.some((player) => player.name === slot),
    )
  } else if (slotType === "pragmatic") {
    // Filtrer uniquement les machines Pragmatic Play
    availableSlots = TournamentApp.pragmaticPlayMachines.filter(
      (slot) => !TournamentApp.players.some((player) => player.name === slot),
    )
  }

  if (availableSlots.length === 0) {
    showToast(
      "Aucune machine disponible",
      "Toutes les machines de cette catégorie sont déjà ajoutées au tournoi.",
      "error",
    )
    document.getElementById("selectRandomBtn").disabled = false
    return
  }

  // Vérifier si le nombre demandé est supérieur au nombre disponible ou à la limite de 16
  const maxSelectable = Math.min(16, 16 - TournamentApp.players.length)
  const actualCount = Math.min(slotCount, availableSlots.length, maxSelectable)

  // Si l'utilisateur demande plus de machines que ce qui est disponible, mettre à jour l'input
  if (actualCount < slotCount) {
    document.getElementById("slotCount").value = actualCount
  }

  if (actualCount < slotCount) {
    if (availableSlots.length < slotCount) {
      showToast(
        "Nombre limité",
        `Seulement ${availableSlots.length} machines disponibles dans cette catégorie.`,
        "warning",
      )
    } else if (maxSelectable < slotCount) {
      showToast(
        "Nombre limité",
        `Vous ne pouvez ajouter que ${maxSelectable} machines supplémentaires au tournoi.`,
        "warning",
      )
    }
  }

  // Mélanger le tableau pour une sélection aléatoire
  shuffleArray(availableSlots)

  // Sélectionner les machines
  const selectedSlots = availableSlots.slice(0, actualCount)

  // Préparer la zone d'animation
  const slotSelecting = document.getElementById("slotSelecting")
  slotSelecting.innerHTML = ""
  slotSelecting.style.display = "block"

  // Animer la sélection
  let count = 0
  const maxCount = 15 // Nombre d'étapes d'animation
  const interval = setInterval(() => {
    // Sélectionner une machine aléatoire pour l'animation
    const animIndex = Math.floor(Math.random() * availableSlots.length)
    const animSlot = availableSlots[animIndex]

    // Créer un élément pour l'animation
    const slotItem = document.createElement("div")
    slotItem.className = "slot-item"
    slotItem.textContent = count === maxCount - 1 ? selectedSlots[0].name || selectedSlots[0] : animSlot
    slotSelecting.appendChild(slotItem)

    // Supprimer les anciens éléments
    setTimeout(() => {
      if (slotItem.parentNode === slotSelecting) {
        slotSelecting.removeChild(slotItem)
      }
    }, 200)

    count++
    if (count >= maxCount) {
      clearInterval(interval)

      // Cacher la zone d'animation
      setTimeout(() => {
        slotSelecting.style.display = "none"

        // Préparer les résultats
        TournamentApp.selectedSlotsArray = selectedSlots.map((slot) => {
          const name = typeof slot === "string" ? slot : slot.name
          let category = ""
          if (TournamentApp.slotMachines.includes(name)) {
            category = "Hacksaw Gaming"
          } else if (TournamentApp.nolimitCityMachines.includes(name)) {
            category = "Nolimit City"
          } else if (TournamentApp.pragmaticPlayMachines.includes(name)) {
            category = "Pragmatic Play"
          }
          return { name, category }
        })

        // Afficher le premier résultat
        if (TournamentApp.selectedSlotsArray.length > 0) {
          TournamentApp.randomSlotSelected = TournamentApp.selectedSlotsArray[0].name
          TournamentApp.randomSlotCategory = TournamentApp.selectedSlotsArray[0].category

          document.getElementById("randomSlotName").textContent = TournamentApp.randomSlotSelected

          const categoryElement = document.getElementById("randomSlotCategory")
          if (TournamentApp.randomSlotCategory) {
            categoryElement.textContent = TournamentApp.randomSlotCategory
            categoryElement.className = "random-slot-category"
            if (TournamentApp.randomSlotCategory === "Hacksaw Gaming") {
              categoryElement.classList.add("hacksaw")
            } else if (TournamentApp.randomSlotCategory === "Nolimit City") {
              categoryElement.classList.add("nolimit")
            } else if (TournamentApp.randomSlotCategory === "Pragmatic Play") {
              categoryElement.classList.add("pragmatic")
            }
          } else {
            categoryElement.textContent = ""
          }

          // CORRECTION: Supprimer l'ancien compteur s'il existe avant d'en ajouter un nouveau
          const resultElement = document.getElementById("randomSlotResult")
          const existingCountElement = document.querySelector("#randomSlotResult div:last-child")
          if (existingCountElement && (existingCountElement.textContent.includes("machine") || existingCountElement.textContent.includes("Machine"))) {
            resultElement.removeChild(existingCountElement)
          }

          // Afficher le compteur si plusieurs machines sont sélectionnées
          if (TournamentApp.selectedSlotsArray.length > 1) {
            const countElement = document.createElement("div")
            countElement.style.marginTop = "0.5rem"
            countElement.style.fontSize = "0.9rem"
            countElement.style.color = "var(--muted-text)"
            countElement.textContent = `${TournamentApp.selectedSlotsArray.length} machines sélectionnées`
            resultElement.appendChild(countElement)
          }

          document.getElementById("randomSlotResult").style.display = "block"
          const addBtn = document.getElementById("addRandomSlotBtn")
          addBtn.style.display = "inline-flex"
          if (TournamentApp.selectedSlotsArray.length > 1) {
            addBtn.innerHTML = `<img src="./slot.png" alt="Slot Machine" width="16" height="16"> Ajouter ces machines`
          } else {
            addBtn.innerHTML = `<img src="./slot.png" alt="Slot Machine" width="16" height="16"> Ajouter cette machine`
          }
          document.getElementById("selectRandomBtn").disabled = false
        }
      }, 200)
    }
  }, 100)
}

// Ajouter la machine aléatoire sélectionnée
function addRandomSlot() {
  if (!TournamentApp.randomSlotSelected || TournamentApp.selectedSlotsArray.length === 0) {
    showToast("Erreur", "Aucune machine n'a été sélectionnée.", "error")
    return
  }

  // Vérifier si la limite de joueurs est atteinte
  if (TournamentApp.players.length >= 16) {
    showToast("Limite atteinte", "Le tournoi est limité à 16 machines !", "error")
    closeRandomSlotDialog() // Fermer la boîte de dialogue si la limite est atteinte
    return
  }

  // Ajouter la machine actuelle à la liste des joueurs avec sa catégorie
  TournamentApp.players.push({
    name: TournamentApp.randomSlotSelected,
    category: TournamentApp.randomSlotCategory,
  })
  document.getElementById("count").innerText = `Slot ajoutés : ${TournamentApp.players.length}/16`
  updatePlayersDisplay()

  // Sauvegarder les données
  saveDataToLocalStorage()

  // Afficher un message de succès
  showToast("Machine ajoutée", `${TournamentApp.randomSlotSelected} a été ajoutée au tournoi.`, "success")

  // Passer à la machine suivante s'il y en a d'autres
  TournamentApp.currentSlotIndex++
  if (TournamentApp.currentSlotIndex < TournamentApp.selectedSlotsArray.length) {
    // Mettre à jour l'affichage avec la machine suivante
    TournamentApp.randomSlotSelected = TournamentApp.selectedSlotsArray[TournamentApp.currentSlotIndex].name
    TournamentApp.randomSlotCategory = TournamentApp.selectedSlotsArray[TournamentApp.currentSlotIndex].category

    document.getElementById("randomSlotName").textContent = TournamentApp.randomSlotSelected

    const categoryElement = document.getElementById("randomSlotCategory")
    if (TournamentApp.randomSlotCategory) {
      categoryElement.textContent = TournamentApp.randomSlotCategory
      categoryElement.className = "random-slot-category"
      if (TournamentApp.randomSlotCategory === "Hacksaw Gaming") {
        categoryElement.classList.add("hacksaw")
      } else if (TournamentApp.randomSlotCategory === "Nolimit City") {
        categoryElement.classList.add("nolimit")
      } else if (TournamentApp.randomSlotCategory === "Pragmatic Play") {
        categoryElement.classList.add("pragmatic")
      }
    } else {
      categoryElement.textContent = ""
    }

    // Mettre à jour le compteur
    const countElement = document.querySelector("#randomSlotResult div:last-child")
    if (countElement) {
      const remaining = TournamentApp.selectedSlotsArray.length - TournamentApp.currentSlotIndex
      countElement.textContent = `${remaining} machine${remaining > 1 ? "s" : ""} restante${remaining > 1 ? "s" : ""}`
    }

    // Vérifier si on a atteint 16 joueurs
    if (TournamentApp.players.length >= 16) {
      // Fermer la boîte de dialogue
      closeRandomSlotDialog()

      // Cacher le conteneur d'ajout de joueurs
      document.getElementById("addPlayerContainer").style.display = "none"
      document.getElementById("randomSlotBtn").style.display = "none"
      // Afficher le bouton de tirage
      document.getElementById("launchDraw").style.display = "block"
    }
  } else {
    // CORRECTION: Ajouter cette condition pour gérer le cas où toutes les machines ont été ajoutées
    // et qu'on a atteint exactement 16 joueurs
    if (TournamentApp.players.length >= 16) {
      // Fermer la boîte de dialogue
      closeRandomSlotDialog()

      // Cacher le conteneur d'ajout de joueurs
      document.getElementById("addPlayerContainer").style.display = "none"
      document.getElementById("randomSlotBtn").style.display = "none"
      // Afficher le bouton de tirage
      document.getElementById("launchDraw").style.display = "block"
    }
  }
}

// Fonction utilitaire pour mélanger un tableau
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// Assurons-nous que le bouton de tirage est correctement configuré au chargement
document.addEventListener("DOMContentLoaded", () => {
  // Initialiser le thème et le bracket au chargement
  initTheme()
  initBracket()
  loadDataFromLocalStorage()
  updateWinnersDisplay()

  // Vérifier si nous avons déjà 16 joueurs pour afficher le bouton de tirage
  if (TournamentApp.players.length >= 16 && !TournamentApp.tournamentStarted) {
    document.getElementById("addPlayerContainer").style.display = "none"
    document.getElementById("randomSlotBtn").style.display = "none"
    document.getElementById("launchDraw").style.display = "block"
    console.log("Bouton de tirage affiché au chargement") // Débogage
  }

  // ===== INITIALISATION ET ÉVÉNEMENTS =====

  // Gérer l'appui sur Entrée dans le champ de saisie
  // Ajouter les écouteurs d'événements
  document.getElementById("playerName").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addPlayer()
    }
  })

  // S'assurer que le bouton de tirage a bien un écouteur d'événements
  document.getElementById("launchDraw").addEventListener("click", () => {
    console.log("Clic sur le bouton de tirage détecté") // Débogage
    launchDraw()
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
})

// Initialiser le thème immédiatement pour éviter un flash de thème incorrect
initTheme()

// Fonction pour supprimer un joueur
function removePlayer(index) {
  TournamentApp.players.splice(index, 1)
  document.getElementById("count").innerText = `Slot ajoutés : ${TournamentApp.players.length}/16`
  updatePlayersDisplay()

  // Réafficher le conteneur d'ajout de joueurs et le bouton randomSlotBtn si nécessaire
  if (TournamentApp.players.length < 16) {
    document.getElementById("addPlayerContainer").style.display = "block"
    document.getElementById("randomSlotBtn").style.display = "block"
    document.getElementById("launchDraw").style.display = "none"
  }

  saveDataToLocalStorage()
  showToast("Machine retirée", "La machine a été retirée du tournoi.", "success")
}
