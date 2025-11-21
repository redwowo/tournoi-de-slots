// Création de l'objet global TournamentApp
window.TournamentApp = {
  // Données des machines à sous
  slotMachines: [
    "Booze Bash",
    "Ultimate Slot of America",
    "Spinman",
    "Pray for Three",
    "Danny Dollar",
    "Rad Maxx",
    "Reign of Rome",
    "Fighter Pit",
    "Wishbringer",
    "Life and Death",
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
    "Tractor Beam",
    "Fire in the Hole 3",
    "Kill Em All",
    "Highway to Hell",
    "Blood Diamond",
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

  // Variables d'état - MODIFICATION: selectedSlotType devient selectedSlotTypes (tableau)
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
  selectedSlotTypes: ["all"], // CHANGEMENT: maintenant un tableau au lieu d'une chaîne
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

// ===== NORMALISATEUR DE DATES FIRESTORE =====

// Helper function to normalize dates from Firestore state
// Converts Firestore Timestamps and date strings to Date objects
function normalizeStateDates(state) {
  if (!state) return state;

  // Helper to convert a single date/timestamp value
  const convertToDate = (value) => {
    if (!value) return value;
    
    // If it's already a Date object, return as is
    if (value instanceof Date) {
      return value;
    }
    
    // If it has a toDate method (Firestore Timestamp), use it
    if (value && typeof value.toDate === 'function') {
      return value.toDate();
    }
    
    // If it's a string, parse it as a Date
    if (typeof value === 'string') {
      return new Date(value);
    }
    
    return value;
  };

  // Normalize previousWinners dates
  if (state.previousWinners && Array.isArray(state.previousWinners)) {
    state.previousWinners = state.previousWinners.map(winner => ({
      ...winner,
      date: convertToDate(winner.date)
    }));
  }

  // Normalize eliminationHistory times
  if (state.eliminationHistory && Array.isArray(state.eliminationHistory)) {
    state.eliminationHistory = state.eliminationHistory.map(elimination => ({
      ...elimination,
      time: convertToDate(elimination.time)
    }));
  }

  return state;
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
  // CORRECTION: Empêcher le chargement depuis localStorage si le mode spectateur est actif.
  // La logique est déjà couverte par l'initialisation du DOM, mais c'est une sécurité supplémentaire.
  if (isSpectatorMode) {
      return;
  }
  
  const savedData = localStorage.getItem("tournamentData")
  if (savedData) {
    try {
      const tournamentData = JSON.parse(savedData)
      TournamentApp.players = tournamentData.players || []
      TournamentApp.matches = tournamentData.matches || []
      TournamentApp.eliminated = tournamentData.eliminated || []
      TournamentApp.winner = tournamentData.winner || ""
      TournamentApp.tournamentStarted = tournamentData.tournamentStarted || false
      TournamentApp.tournamentCompleted = tournamentData.tournamentCompleted || false
      TournamentApp.eliminationHistory = tournamentData.eliminationHistory || []
      TournamentApp.previousWinners = tournamentData.previousWinners || []

      // Normalize dates from localStorage (handle both strings and Date objects)
      TournamentApp.eliminationHistory.forEach((item) => {
        if (typeof item.time === "string" || (item.time && typeof item.time.toDate === 'function')) {
          item.time = new Date(item.time)
        }
      })

      // Normalize dates from localStorage for previous winners
      TournamentApp.previousWinners.forEach((item) => {
        if (typeof item.date === "string" || (item.date && typeof item.date.toDate === 'function')) {
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
          const eliminationHistoryBtn = document.getElementById("eliminationHistoryBtn")
          if (eliminationHistoryBtn) {
            eliminationHistoryBtn.style.display = "block"
          }
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
    themeToggle.innerHTML = '<img src="/soleil.png" alt="Soleil" width="20" height="20">'
    themeToggle.setAttribute("aria-label", "Passer au thème clair")
  } else {
    themeToggle.innerHTML = '<img src="/lune.png" alt="Lune" width="20" height="20">'
    themeToggle.setAttribute("aria-label", "Passer au thème sombre")
  }
}

// Modifier la fonction addPlayer pour s'assurer que le bouton de tirage apparaît correctement
function addPlayer() {
  // Empêcher les actions en mode spectateur
  if (isSpectatorMode) {
    showToast("Mode spectateur", "Vous ne pouvez pas modifier le tournoi en mode spectateur", "warning");
    return;
  }
  
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
    updateTournamentState({
      players: TournamentApp.players,
      matches: (() => { const o={}; for(let i=0;i<TournamentApp.matches.length;i++){o['round'+i]=TournamentApp.matches[i];} return o; })(),
      eliminated: TournamentApp.eliminated,
      winner: TournamentApp.winner,
      tournamentStarted: TournamentApp.tournamentStarted,
      eliminationHistory: TournamentApp.eliminationHistory,
      previousWinners: TournamentApp.previousWinners,
      tournamentCompleted: TournamentApp.tournamentCompleted
    })

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

// NOUVELLE FONCTION: Fonction pour supprimer un joueur
function removePlayer(index) {
  if (TournamentApp.tournamentStarted) {
    showToast("Action impossible", "Impossible de retirer une machine une fois le tournoi commencé.", "error")
    return
  }

  const removedPlayer = TournamentApp.players[index]
  TournamentApp.players.splice(index, 1)

  updatePlayersDisplay()
  document.getElementById("count").innerText = `Slot ajoutés : ${TournamentApp.players.length}/16`

  // Réafficher les contrôles d'ajout si nécessaire
  if (TournamentApp.players.length < 16) {
    document.getElementById("addPlayerContainer").style.display = "block"
    document.getElementById("randomSlotBtn").style.display = "block"
    document.getElementById("launchDraw").style.display = "none"
  }

  saveDataToLocalStorage()
  showToast("Machine retirée", `${removedPlayer.name} a été retirée du tournoi.`, "success")
  updateTournamentState({
    players: TournamentApp.players,
    matches: (() => { const o={}; for(let i=0;i<TournamentApp.matches.length;i++){o['round'+i]=TournamentApp.matches[i];} return o; })(),
    eliminated: TournamentApp.eliminated,
    winner: TournamentApp.winner,
    tournamentStarted: TournamentApp.tournamentStarted,
    eliminationHistory: TournamentApp.eliminationHistory,
    previousWinners: TournamentApp.previousWinners,
    tournamentCompleted: TournamentApp.tournamentCompleted
  });
}

// Modifier la fonction updatePlayersDisplay pour ajouter des liens
function updatePlayersDisplay() {
  const ul = document.getElementById("playersDisplay")
  ul.innerHTML = ""

  TournamentApp.players.forEach((player, index) => {
    const li = document.createElement("li")
    li.id = `player-list-${toSafeId(player.name)}`

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
    removeButton.innerHTML = '<img src="/croix.png" alt="Supprimer" width="16" height="16">'
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
  if (!eliminationList) return
  
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

  const eliminationHistoryModal = document.getElementById("eliminationHistoryModal")
  const overlay = document.getElementById("overlay")
  if (eliminationHistoryModal) eliminationHistoryModal.style.display = "block"
  if (overlay) overlay.style.display = "block"
}

// Fermer l'historique des éliminations
function closeEliminationHistory() {
  const eliminationHistoryModal = document.getElementById("eliminationHistoryModal")
  const overlay = document.getElementById("overlay")
  if (eliminationHistoryModal) eliminationHistoryModal.style.display = "none"
  if (overlay) overlay.style.display = "none"
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

// NOUVELLE FONCTION: Afficher la boîte de dialogue de sélection aléatoire améliorée
function showRandomSlotDialog() {
  // Réinitialiser l'état
  document.getElementById("randomSlotResult").style.display = "none"
  document.getElementById("addRandomSlotBtn").style.display = "none"
  document.getElementById("slotSelecting").style.display = "none"
  document.getElementById("selectRandomBtn").disabled = false

  // Réinitialiser l'affichage des boutons
  document.getElementById("selectRandomBtn").style.display = "inline-flex"
  document.getElementById("selectAnotherBtn").style.display = "none"
  document.getElementById("acceptSlotBtn").style.display = "none"
  document.getElementById("rejectSlotBtn").style.display = "none"
  document.getElementById("addRandomSlotBtn").style.display = "none"

  // Réinitialiser les variables
  TournamentApp.selectedSlotsArray = []
  TournamentApp.currentSlotIndex = 0

  // Réinitialiser la sélection à "Toutes les machines"
  TournamentApp.selectedSlotTypes = ["all"]

  // Mettre à jour l'interface
  document.querySelectorAll(".slot-type-option").forEach((option) => {
    const checkbox = option.querySelector('input[type="checkbox"]')
    if (option.dataset.value === "all") {
      option.classList.add("selected")
      checkbox.checked = true
    } else {
      option.classList.remove("selected")
      checkbox.checked = false
    }
  })

  updateMaxAvailableSlots()

  document.getElementById("randomSlotDialog").style.display = "flex"
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

  // Réinitialiser l'affichage des boutons
  document.getElementById("selectRandomBtn").style.display = "inline-flex"
  document.getElementById("selectAnotherBtn").style.display = "none"
  document.getElementById("acceptSlotBtn").style.display = "none"
  document.getElementById("rejectSlotBtn").style.display = "none"
  document.getElementById("addRandomSlotBtn").style.display = "none"

  // Réinitialiser les variables
  TournamentApp.selectedSlotsArray = []
  TournamentApp.currentSlotIndex = 0
}

// NOUVELLE FONCTION: Fonction pour basculer la sélection d'un type de slot (sélection multiple)
function toggleSlotType(element, type) {
  const checkbox = element.querySelector('input[type="checkbox"]')

  if (type === "all") {
    // Si "Toutes les machines" est sélectionné, désélectionner les autres
    if (!TournamentApp.selectedSlotTypes.includes("all")) {
      TournamentApp.selectedSlotTypes = ["all"]
      // Décocher toutes les autres options
      document.querySelectorAll('.slot-type-option:not([data-value="all"])').forEach((option) => {
        option.classList.remove("selected")
        option.querySelector('input[type="checkbox"]').checked = false
      })
      // Cocher "Toutes les machines"
      element.classList.add("selected")
      checkbox.checked = true
    } else {
      // Si "Toutes les machines" était déjà sélectionné, on ne peut pas le désélectionner
      // (il faut au moins une option sélectionnée)
      return
    }
  } else {
    // Pour les autres options
    if (TournamentApp.selectedSlotTypes.includes(type)) {
      // Désélectionner ce type
      TournamentApp.selectedSlotTypes = TournamentApp.selectedSlotTypes.filter((t) => t !== type)
      element.classList.remove("selected")
      checkbox.checked = false

      // Si "Toutes les machines" était sélectionné, le désélectionner
      if (TournamentApp.selectedSlotTypes.includes("all")) {
        TournamentApp.selectedSlotTypes = TournamentApp.selectedSlotTypes.filter((t) => t !== "all")
        const allOption = document.querySelector('.slot-type-option[data-value="all"]')
        allOption.classList.remove("selected")
        allOption.querySelector('input[type="checkbox"]').checked = false
      }

      // Si aucune option n'est sélectionnée, sélectionner "Toutes les machines"
      if (TournamentApp.selectedSlotTypes.length === 0) {
        TournamentApp.selectedSlotTypes = ["all"]
        const allOption = document.querySelector('.slot-type-option[data-value="all"]')
        allOption.classList.add("selected")
        allOption.querySelector('input[type="checkbox"]').checked = true
      }
    } else {
      // Sélectionner ce type
      TournamentApp.selectedSlotTypes.push(type)
      element.classList.add("selected")
      checkbox.checked = true

      // Si "Toutes les machines" était sélectionné, le désélectionner
      if (TournamentApp.selectedSlotTypes.includes("all")) {
        TournamentApp.selectedSlotTypes = TournamentApp.selectedSlotTypes.filter((t) => t !== "all")
        const allOption = document.querySelector('.slot-type-option[data-value="all"]')
        allOption.classList.remove("selected")
        allOption.querySelector('input[type="checkbox"]').checked = false
      }
    }
  }

  // Mettre à jour l'affichage des providers sélectionnés
  updateSelectedProvidersDisplay()

  // Mettre à jour le nombre maximum de machines disponibles
  updateMaxAvailableSlots()
}

// NOUVELLE FONCTION: Mettre à jour l'affichage des providers sélectionnés
function updateSelectedProvidersDisplay() {
  const displayElement = document.getElementById("selectedProvidersList");
  if (!displayElement) return;
  let html = ""
  TournamentApp.selectedSlotTypes.forEach((type) => {
    if (type === "hacksaw") {
      html += '<span class="provider-tag hacksaw">Hacksaw Gaming</span> '
    } else if (type === "nolimit") {
      html += '<span class="provider-tag nolimit">Nolimit City</span> '
    } else if (type === "pragmatic") {
      html += '<span class="provider-tag pragmatic">Pragmatic Play</span> '
    }
  })
  displayElement.innerHTML = html || '<span style="color: var(--muted-text);">Aucun provider sélectionné</span>'
}

// MODIFICATION: Fonction pour mettre à jour le nombre maximum de machines disponibles
function updateMaxAvailableSlots() {
  let availableSlots = []

  if (TournamentApp.selectedSlotTypes.includes("all")) {
    const allSlots = [
      ...TournamentApp.slotMachines,
      ...TournamentApp.nolimitCityMachines,
      ...TournamentApp.pragmaticPlayMachines,
    ]
    availableSlots = allSlots.filter((slot) => !TournamentApp.players.some((player) => player.name === slot))
  } else {
    // Combiner les machines des providers sélectionnés
    if (TournamentApp.selectedSlotTypes.includes("hacksaw")) {
      const hacksawSlots = TournamentApp.slotMachines.filter(
        (slot) => !TournamentApp.players.some((player) => player.name === slot),
      )
      availableSlots = availableSlots.concat(hacksawSlots)
    }

    if (TournamentApp.selectedSlotTypes.includes("nolimit")) {
      const nolimitSlots = TournamentApp.nolimitCityMachines.filter(
        (slot) => !TournamentApp.players.some((player) => player.name === slot),
      )
      availableSlots = availableSlots.concat(nolimitSlots)
    }

    if (TournamentApp.selectedSlotTypes.includes("pragmatic")) {
      const pragmaticSlots = TournamentApp.pragmaticPlayMachines.filter(
        (slot) => !TournamentApp.players.some((player) => player.name === slot),
      )
      availableSlots = availableSlots.concat(pragmaticSlots)
    }
  }

  // Mettre à jour l'affichage du nombre total de machines disponibles
  document.getElementById("maxAvailable").textContent = availableSlots.length

  // Limiter le nombre maximum dans l'input
  const slotCountInput = document.getElementById("slotCount")
  const maxSelectable = Math.min(16, 16 - TournamentApp.players.length)
  slotCountInput.max = Math.min(availableSlots.length, maxSelectable)

  if (Number.parseInt(slotCountInput.value) > Number.parseInt(slotCountInput.max)) {
    slotCountInput.value = slotCountInput.max
  }

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
      // p1Classes += " waiting" // On retire la classe waiting pour ne pas afficher le message sur le bouton
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
      // p2Classes += " waiting" // On retire la classe waiting pour ne pas afficher le message sur le bouton
    } else if (!matchCompleted && !TournamentApp.tournamentCompleted) {
      p2Disabled = ""
    }
  }

  // Ajouter le checkmark pour le gagnant
  const p1Display = p1HasCheckmark ? `${p1Name} <span class="checkmark">✓</span>` : match.p1
  const p2Display = p2HasCheckmark ? `${p2Name} <span class="checkmark">✓</span>` : match.p2

  // Si c'est la finale et le tournoi est terminé, forcer l'affichage du gagnant même si le checkmark a sauté
  let finaleWinner = null;
  if (i === 3 && TournamentApp.tournamentCompleted) {
    if (p1Name === TournamentApp.winner) finaleWinner = 'p1';
    if (p2Name === TournamentApp.winner) finaleWinner = 'p2';
  }

  // Correction : les boutons ne sont désactivés que pour la finale si le tournoi est terminé
  const isFinale = (i === 3);
  const tournoiFini = TournamentApp.tournamentCompleted;

  const btn1 = match.p1
    ? `<button class="${p1Classes}${((isFinale && ((p1HasCheckmark && tournoiFini) || finaleWinner==='p1')) ? ' finale-winner' : '')}"
        ${(isFinale && tournoiFini) || !match.p1 || !match.p2 || matchCompleted ? 'disabled' : ''}
        onclick="setWinner(${i}, ${j}, '${p1Name.replace(/'/g, "\\'")}')" title="${p1Name}">${p1Display}${((isFinale && ((p1HasCheckmark && tournoiFini) || finaleWinner==='p1')) ? '<span class=\"winner-crown\">👑</span>' : '')}</button>`
    : `<button class="player-btn" disabled>---</button>`

  const btn2 = match.p2
    ? `<button class="${p2Classes}${((isFinale && ((p2HasCheckmark && tournoiFini) || finaleWinner==='p2')) ? ' finale-winner' : '')}"
        ${(isFinale && tournoiFini) || !match.p1 || !match.p2 || matchCompleted ? 'disabled' : ''}
        onclick="setWinner(${i}, ${j}, '${p2Name.replace(/'/g, "\\'")}')" title="${p2Name}">${p2Display}${((isFinale && ((p2HasCheckmark && tournoiFini) || finaleWinner==='p2')) ? '<span class=\"winner-crown\">👑</span>' : '')}</button>`
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

  // Affichage spécial pour la finale terminée : gagnant doré + perdant grisé
  if (i === 3 && TournamentApp.tournamentCompleted && TournamentApp.winner) {
    const winnerName = TournamentApp.winner;
    let loserName = '';
    if (match.p1 && match.p2) {
      const p1Name = match.p1.replace(' ✓', '');
      const p2Name = match.p2.replace(' ✓', '');
      loserName = (p1Name === winnerName) ? p2Name : p1Name;
    }
    return `
      <div style="display:flex;flex-direction:column;align-items:center;gap:0.5em;">
        <button class="player-btn finale-winner" style="width:100%;font-size:1.2em;display:flex;align-items:center;justify-content:center;gap:0.5em;" disabled>
          <span>${winnerName}</span> <span class=\"winner-crown\" style=\"font-size:1.3em;vertical-align:middle;\">👑</span>
        </button>
        ${loserName ? `<button class=\"player-btn\" style=\"width:100%;opacity:0.6;cursor:not-allowed;background:#888;color:#222;font-size:1.1em;\" disabled>${loserName}</button>` : ''}
      </div>
    `;
  }

  return matchHtml
}

// NOUVELLE FONCTION pour vérifier et propager les annulations aux tours suivants
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

// Définir le gagnant d'un match
function setWinner(roundIndex, matchIndex, winnerName) {
  // Empêcher les actions en mode spectateur
  if (isSpectatorMode) {
    showToast("Mode spectateur", "Vous ne pouvez pas modifier le tournoi en mode spectateur", "warning");
    return;
  }

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
    const playerElement = document.querySelector(`#player-list-${toSafeId(loserName)} .player-item a`)
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
    const eliminationHistoryBtn = document.getElementById("eliminationHistoryBtn")
    if (eliminationHistoryBtn) {
      eliminationHistoryBtn.style.display = "block"
    }

    showToast(`${loserName} éliminée !`, `${winnerName} remporte le match et avance au prochain tour.`, "success")
    updatePlayersDisplay()
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
    renderBracket() // <-- Ajouté pour forcer la mise à jour visuelle du bracket
  }

  // Sauvegarder les données
  saveDataToLocalStorage()
  updateTournamentState({
    players: TournamentApp.players,
    matches: (() => { const o={}; for(let i=0;i<TournamentApp.matches.length;i++){o['round'+i]=TournamentApp.matches[i];} return o; })(),
    eliminated: TournamentApp.eliminated,
    winner: TournamentApp.winner,
    tournamentStarted: TournamentApp.tournamentStarted,
    eliminationHistory: TournamentApp.eliminationHistory,
    previousWinners: TournamentApp.previousWinners,
    tournamentCompleted: TournamentApp.tournamentCompleted
  });
}

// Afficher le message de victoire
function showVictoryMessage(winnerName) {
  document.getElementById("winnerText").innerHTML =
    `🏆 Félicitations <strong>${winnerName}</strong>, grande gagnante du tournoi ! 🎉`
  document.getElementById("victoryMessage").style.display = "block"
  document.getElementById("overlay").style.display = "block"
  launchConfetti();
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
  stopConfetti();
}

// Réinitialiser le tournoi avec option
function resetTournamentWithOption(keepPlayers) {
  // Empêcher les actions en mode spectateur
  if (isSpectatorMode) {
    showToast("Mode spectateur", "Vous ne pouvez pas modifier le tournoi en mode spectateur", "warning");
    return;
  }
  
  // Sauvegarder la liste des joueurs si demandé
  const savedPlayers = keepPlayers ? [...TournamentApp.players] : []

  // Réinitialiser les variables
  TournamentApp.players = keepPlayers ? savedPlayers : []
  TournamentApp.matches = []
  TournamentApp.eliminated = []
  TournamentApp.eliminationHistory = []
  TournamentApp.winner = ""
  TournamentApp.tournamentStarted = false
  TournamentApp.tournamentCompleted = false // Réinitialiser l'état de complétion du tournoi

  // Réinitialiser l'interface
  const bracket = document.getElementById("bracket");
  if (bracket) bracket.style.display = "none";
  const resetButton = document.getElementById("resetButton");
  if (resetButton) resetButton.style.display = "none";
  const launchDraw = document.getElementById("launchDraw");
  if (launchDraw) launchDraw.style.display = keepPlayers && TournamentApp.players.length === 16 ? "block" : "none";
  const eliminationHistoryBtn = document.getElementById("eliminationHistoryBtn");
  if (eliminationHistoryBtn) eliminationHistoryBtn.style.display = TournamentApp.eliminationHistory && TournamentApp.eliminationHistory.length > 0 ? "block" : "none";
  const count = document.getElementById("count");
  if (count) count.innerText = `Slot ajoutés : ${TournamentApp.players.length}/16`;

  // Mettre à jour l'affichage des joueurs
  updatePlayersDisplay()

  // Réafficher le conteneur d'ajout de joueurs si nécessaire
  const addPlayerContainer = document.getElementById("addPlayerContainer");
  if (addPlayerContainer) addPlayerContainer.style.display = keepPlayers && TournamentApp.players.length === 16 ? "none" : "block";
  const randomSlotBtn = document.getElementById("randomSlotBtn");
  if (randomSlotBtn) randomSlotBtn.style.display = keepPlayers && TournamentApp.players.length === 16 ? "none" : "block";

  // Initialiser un nouveau bracket
  initBracket()

  // Sauvegarder les données
  saveDataToLocalStorage()
  updateTournamentState({
    players: TournamentApp.players,
    matches: (() => { const o={}; for(let i=0;i<TournamentApp.matches.length;i++){o['round'+i]=TournamentApp.matches[i];} return o; })(),
    eliminated: TournamentApp.eliminated,
    winner: TournamentApp.winner,
    tournamentStarted: TournamentApp.tournamentStarted,
    eliminationHistory: TournamentApp.eliminationHistory,
    previousWinners: TournamentApp.previousWinners,
    tournamentCompleted: TournamentApp.tournamentCompleted
  })

  showToast(
    "Tournoi réinitialisé",
    keepPlayers
      ? "Le tournoi a été réinitialisé en conservant la liste des machines."
      : "Toutes les données du tournoi ont été effacées.",
    "success",
  )

  // Fermer la boîte de dialogue
  closeResetDialog()

  // Juste avant d'accéder à loadingOverlay.style.display = "none" dans resetTournamentWithOption
  const loadingOverlay = document.getElementById("loadingOverlay");
  if (loadingOverlay) loadingOverlay.style.display = "none";

  // Rediriger vers la page d'accueil après réinitialisation
  window.location.href = "/";
}

// Effacer toutes les données
function clearAllData() {
  // Empêcher les actions en mode spectateur
  if (isSpectatorMode) {
    showToast("Mode spectateur", "Vous ne pouvez pas modifier le tournoi en mode spectateur", "warning");
    return;
  }
  
  localStorage.removeItem("tournamentData")
  // Recharger la page pour repartir de zéro
  window.location.href = "/";
}

// Mettre à jour le score d'un match
function updateScore(roundIndex, matchIndex, scoreType, scoreValue) {
  // Empêcher les actions en mode spectateur
  if (isSpectatorMode) {
    showToast("Mode spectateur", "Vous ne pouvez pas modifier le tournoi en mode spectateur", "warning");
    return;
  }
  
  TournamentApp.matches[roundIndex][matchIndex][scoreType] = scoreValue

  // Conserver la largeur du champ après la mise à jour
  const inputElement = document.getElementById(`${scoreType}-${roundIndex}-${matchIndex}`)
  if (inputElement && scoreValue) {
    inputElement.style.width = Math.max(45, scoreValue.toString().length * 10 + 25) + "px"
  }

  saveDataToLocalStorage()
  renderBracket()

  // Synchronisation en temps réel des scores
  updateTournamentState({
    players: TournamentApp.players,
    matches: (() => { const o={}; for(let i=0;i<TournamentApp.matches.length;i++){o['round'+i]=TournamentApp.matches[i];} return o; })(),
    eliminated: TournamentApp.eliminated,
    winner: TournamentApp.winner,
    tournamentStarted: TournamentApp.tournamentStarted,
    eliminationHistory: TournamentApp.eliminationHistory,
    previousWinners: TournamentApp.previousWinners,
    tournamentCompleted: TournamentApp.tournamentCompleted
  });
}

// Fonction pour annuler un match
function undoMatch() {
  // Empêcher les actions en mode spectateur
  if (isSpectatorMode) {
    showToast("Mode spectateur", "Vous ne pouvez pas modifier le tournoi en mode spectateur", "warning");
    return;
  }
  
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
  const playerElement = document.querySelector(`#player-list-${toSafeId(loserName)} .player-item a`)
  if (playerElement) playerElement.classList.remove("eliminated")
  updatePlayersDisplay()

  // NOUVEAU : Retirer le joueur de TOUS les matchs des tours suivants
  for (let r = roundIndex + 1; r < TournamentApp.matches.length; r++) {
    for (let m = 0; m < TournamentApp.matches[r].length; m++) {
      const nextMatch = TournamentApp.matches[r][m];
      if (nextMatch.p1 === winnerName) {
        nextMatch.p1 = "";
        nextMatch.score1 = "";
      }
      if (nextMatch.p2 === winnerName) {
        nextMatch.p2 = "";
        nextMatch.score2 = "";
      }
    }
  }

  // Si c'était la finale, réinitialiser le gagnant et le drapeau tournamentCompleted
  if (roundIndex === 3 && TournamentApp.winner === winnerName) {
    TournamentApp.winner = ""
    TournamentApp.tournamentCompleted = false
  }

  // Mettre à jour l'affichage du bracket
  renderBracket()

  // Sauvegarder les données
  saveDataToLocalStorage()
  updateTournamentState({
    players: TournamentApp.players,
    matches: (() => { const o={}; for(let i=0;i<TournamentApp.matches.length;i++){o['round'+i]=TournamentApp.matches[i];} return o; })(),
    eliminated: TournamentApp.eliminated,
    winner: TournamentApp.winner,
    tournamentStarted: TournamentApp.tournamentStarted,
    eliminationHistory: TournamentApp.eliminationHistory,
    previousWinners: TournamentApp.previousWinners,
    tournamentCompleted: TournamentApp.tournamentCompleted
  })

  // Fermer la boîte de dialogue
  closeUndoConfirmDialog()

  // Afficher un message de succès
  showToast("Match annulé", `Le résultat du match entre ${p1Name} et ${p2Name} a été annulé.`, "success")
}

// MODIFICATION: Fonction selectRandomSlot pour gérer la sélection multiple
function selectRandomSlot() {
  const slotCount = Number.parseInt(document.getElementById("slotCount").value) || 1;
  let availableSlots = [];

  if (TournamentApp.selectedSlotTypes.includes("all")) {
    const allSlots = [
      ...TournamentApp.slotMachines,
      ...TournamentApp.nolimitCityMachines,
      ...TournamentApp.pragmaticPlayMachines,
    ];
    availableSlots = allSlots.filter((slot) => !TournamentApp.players.some((player) => player.name === slot));
  } else {
    if (TournamentApp.selectedSlotTypes.includes("hacksaw")) {
      const hacksawSlots = TournamentApp.slotMachines.filter(
        (slot) => !TournamentApp.players.some((player) => player.name === slot),
      );
      availableSlots = availableSlots.concat(hacksawSlots);
    }
    if (TournamentApp.selectedSlotTypes.includes("nolimit")) {
      const nolimitSlots = TournamentApp.nolimitCityMachines.filter(
        (slot) => !TournamentApp.players.some((player) => player.name === slot),
      );
      availableSlots = availableSlots.concat(nolimitSlots);
    }
    if (TournamentApp.selectedSlotTypes.includes("pragmatic")) {
      const pragmaticSlots = TournamentApp.pragmaticPlayMachines.filter(
        (slot) => !TournamentApp.players.some((player) => player.name === slot),
      );
      availableSlots = availableSlots.concat(pragmaticSlots);
    }
  }

  if (availableSlots.length === 0) {
    showToast(
      "Aucune machine disponible",
      "Toutes les machines des providers sélectionnés sont déjà ajoutées au tournoi.",
      "error",
    );
    document.getElementById("selectRandomBtn").disabled = false;
    return;
  }

  const maxSelectable = Math.min(16, 16 - TournamentApp.players.length);
  const actualCount = Math.min(slotCount, availableSlots.length, maxSelectable);

  if (actualCount < slotCount) {
    document.getElementById("slotCount").value = actualCount;
  }

  if (actualCount < slotCount) {
    if (availableSlots.length < slotCount) {
      showToast(
        "Nombre limité",
        `Seulement ${availableSlots.length} machines disponibles pour les providers sélectionnés.`,
        "warning",
      );
    } else if (maxSelectable < slotCount) {
      showToast(
        "Nombre limité",
        `Vous ne pouvez ajouter que ${maxSelectable} machines supplémentaires au tournoi.`,
        "warning",
      );
    }
  }

  shuffleArray(availableSlots);

  // Si la liste existe déjà (refus), on passe à la suivante
  if (TournamentApp.selectedSlotsArray && TournamentApp.selectedSlotsArray.length > 1) {
    TournamentApp.selectedSlotsArray.shift();
    afficherMachineCourante();
    return;
  }

  // Sinon, on crée la liste aléatoire complète
  const selectedSlots = availableSlots.slice(0, actualCount).map((slot) => {
    let category = "";
    if (TournamentApp.slotMachines.includes(slot)) {
      category = "Hacksaw Gaming";
    } else if (TournamentApp.nolimitCityMachines.includes(slot)) {
      category = "Nolimit City";
    } else if (TournamentApp.pragmaticPlayMachines.includes(slot)) {
      category = "Pragmatic Play";
    }
    return { name: slot, category };
  });
  TournamentApp.selectedSlotsArray = selectedSlots;
  afficherMachineCourante();
}

// Fonction pour mélanger un tableau (Fisher-Yates shuffle)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

// Nouvelle version : placer les joueurs aléatoirement à partir d'un tableau donné
function placePlayersRandomly(playersArray) {
  for (let i = 0; i < playersArray.length; i++) {
    const matchIndex = Math.floor(i / 2)
    if (i % 2 === 0) {
      TournamentApp.matches[0][matchIndex].p1 = playersArray[i].name
      TournamentApp.matches[0][matchIndex].score1 = ""
    } else {
      TournamentApp.matches[0][matchIndex].p2 = playersArray[i].name
      TournamentApp.matches[0][matchIndex].score2 = ""
    }
  }
  renderBracket()
}

// Fonction utilitaire pour générer un id CSS sûr à partir d'un nom
function toSafeId(name) {
  return name.replace(/[^a-zA-Z0-9_-]/g, "-");
}

// Améliorons la fonction launchDraw pour s'assurer qu'elle fonctionne correctement
function launchDraw() {
  // Empêcher les actions en mode spectateur
  if (isSpectatorMode) {
    showToast("Mode spectateur", "Vous ne pouvez pas modifier le tournoi en mode spectateur", "warning");
    return;
  }
  
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
            initBracket() // Initialiser le bracket avant de placer les joueurs
            placePlayersRandomly(TournamentApp.players) // Utilisez le tableau mélangé de TournamentApp.players

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
            const loadingOverlay = document.getElementById("loadingOverlay");
            if (loadingOverlay) loadingOverlay.style.display = "none";

            showToast(
              "Tournoi lancé !",
              "Le tirage au sort a été effectué. Que la meilleure machine gagne !",
              "success",
            )

            console.log("Tournoi lancé avec succès") // Débogage
          } catch (error) {
            console.error("Erreur lors de la finalisation du tournoi:", error)
            const loadingOverlay = document.getElementById("loadingOverlay");
            if (loadingOverlay) loadingOverlay.style.display = "none";
            showToast("Erreur", "Une erreur est survenue lors du lancement du tournoi.", "error")
          }
        }, 500) // Délai réduit à 0.5 seconde pour la troisième étape
      }, 500) // Délai réduit à 0.5 seconde pour la deuxième étape
    }, 500) // Délai réduit à 0.5 seconde pour la première étape
  } catch (error) {
    console.error("Erreur lors du lancement du tirage:", error)
    const loadingOverlay = document.getElementById("loadingOverlay");
    if (loadingOverlay) loadingOverlay.style.display = "none";
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

// Fonction pour ajouter les machines sélectionnées aléatoirement
function addRandomSlot() {
  if (TournamentApp.selectedSlotsArray.length === 0) {
    showToast("Erreur", "Aucune machine sélectionnée.", "error")
    return
  }

  let addedCount = 0
  let skippedCount = 0

  TournamentApp.selectedSlotsArray.forEach((slot) => {
    // Vérifier si la machine n'est pas déjà dans la liste
    const playerExists = TournamentApp.players.some((player) => player.name.toLowerCase() === slot.name.toLowerCase())

    if (!playerExists && TournamentApp.players.length < 16) {
      TournamentApp.players.push({
        name: slot.name,
        category: slot.category,
      })
      addedCount++
    } else {
      skippedCount++
    }
  })

  // Mettre à jour l'interface
  updateRandomSlotInterface()

  // Fermer le dialogue
  closeRandomSlotDialog()

  // Afficher un message de confirmation
  if (addedCount > 0) {
    let message = `${addedCount} machine${addedCount > 1 ? "s" : ""} ajoutée${addedCount > 1 ? "s" : ""} au tournoi.`
    if (skippedCount > 0) {
      message += ` ${skippedCount} machine${skippedCount > 1 ? "s" : ""} ignorée${skippedCount > 1 ? "s" : ""} (déjà présente${skippedCount > 1 ? "s" : ""} ou limite atteinte).`
    }
    showToast("Machines ajoutées", message, "success")
  } else {
    showToast(
      "Aucune machine ajoutée",
      "Toutes les machines sélectionnées sont déjà présentes ou la limite est atteinte.",
      "warning",
    )
  }

  // Vérifier si on a atteint 16 joueurs
  if (TournamentApp.players.length >= 16) {
    document.getElementById("addPlayerContainer").style.display = "none";
    document.getElementById("randomSlotBtn").style.display = "none";
    document.getElementById("launchDraw").style.display = "block";
  }

  // Sauvegarder les données
  saveDataToLocalStorage();
  updateTournamentState({
    players: TournamentApp.players,
    matches: (() => { const o={}; for(let i=0;i<TournamentApp.matches.length;i++){o['round'+i]=TournamentApp.matches[i];} return o; })(),
    eliminated: TournamentApp.eliminated,
    winner: TournamentApp.winner,
    tournamentStarted: TournamentApp.tournamentStarted,
    eliminationHistory: TournamentApp.eliminationHistory,
    previousWinners: TournamentApp.previousWinners,
    tournamentCompleted: TournamentApp.tournamentCompleted
  });
}

// Initialisation unifiée au chargement de la page
document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialiser le thème (doit être fait en premier pour éviter le flash)
  initTheme();

  // 2. Détecter le mode spectateur AVANT tout chargement de données
  initializeSpectatorMode();
  
  // 3. Vérifier les paramètres URL pour déterminer le mode
  const tournamentId = getTournamentFromUrl();

  if (tournamentId) {
    // Mode spectateur forcé par l'URL
    isSpectatorMode = true;
    localStorage.setItem('spectatorMode', 'true');
    await loadSpecificTournament(tournamentId);
  } else {
    // Mode créateur ou normal: pas de paramètre tournament dans l'URL
    isSpectatorMode = false;
    localStorage.removeItem('spectatorMode');
  }

  // 4. Charger les données locales SEULEMENT si pas en mode spectateur
  if (!isSpectatorMode) {
    loadDataFromLocalStorage();
    updateWinnersDisplay();
  }

  // 5. Initialiser le bracket
  initBracket();

  // 6. S'assurer que la fenêtre de sélection aléatoire est fermée au démarrage
  const randomSlotDialog = document.getElementById("randomSlotDialog")
  const overlay = document.getElementById("overlay")
  if (randomSlotDialog) {
    randomSlotDialog.style.display = "none"
  }
  if (overlay) {
    overlay.style.display = "none"
  }

  // 7. Ajouter les événements UI
  document.getElementById("themeToggle").addEventListener("click", toggleTheme)

  // Ajouter l'événement pour les suggestions
  const playerNameInput = document.getElementById("playerName")
  playerNameInput.addEventListener("input", function () {
    showSuggestions(this)
  })

  // Cacher les suggestions quand on clique ailleurs
  document.addEventListener("click", (event) => {
    if (!event.target.closest("#addPlayerContainer")) {
      document.getElementById("suggestionsList").style.display = "none"
    }
  })

  // Fermer la fenêtre de sélection aléatoire quand on clique sur l'overlay
  document.getElementById("overlay").addEventListener("click", (event) => {
    if (event.target === document.getElementById("overlay")) {
      closeRandomSlotDialog()
    }
  })

  // Permettre d'ajouter un joueur en appuyant sur Entrée
  playerNameInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addPlayer()
    }
  })

  // Fermer la fenêtre de sélection aléatoire avec la touche Échap
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const randomSlotDialog = document.getElementById("randomSlotDialog")
      if (randomSlotDialog && randomSlotDialog.style.display === "flex") {
        closeRandomSlotDialog()
      }
    }
  })

  // Mettre à jour le nombre maximum de machines disponibles au chargement
  updateMaxAvailableSlots()

  // Redirection vers l'accueil si on clique sur le titre ou les images du titre
  const h1 = document.querySelector("h1");
  if (h1) {
    h1.style.cursor = "pointer";
    h1.addEventListener("click", () => {
      window.location.href = "/";
    });
    const imgs = h1.querySelectorAll("img");
    imgs.forEach(img => {
      img.style.cursor = "pointer";
      img.addEventListener("click", (e) => {
        e.stopPropagation();
        window.location.href = "/";
      });
    });
  }

  // 8. Mettre en place l'écoute Firestore en temps réel pour les mises à jour
  if (tournamentId) {
    db.collection("tournois").doc(tournamentId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          updateTournamentUI(doc.data().state);
        }
      });
  }

  // 9. Appliquer les restrictions spectateur si nécessaire
  if (isSpectatorMode) {
    disableActionsIfSpectator();
  }

  // 10. Raccourci clavier pour sortir du mode spectateur (Échap)
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isSpectatorMode) {
      exitSpectatorMode();
    }
  });
});

// Accepter la machine affichée et l'ajouter au tournoi
function acceptCurrentSlot() {
  if (!TournamentApp.selectedSlotsArray || TournamentApp.selectedSlotsArray.length === 0) return;
  const slot = TournamentApp.selectedSlotsArray[0];
  // Vérifier si la machine n'est pas déjà dans la liste
  const playerExists = TournamentApp.players.some((player) => player.name.toLowerCase() === slot.name.toLowerCase());
  if (!playerExists && TournamentApp.players.length < 16) {
    TournamentApp.players.push({
      name: slot.name,
      category: slot.category,
    });
    updateRandomSlotInterface();
    showToast("Machine ajoutée", `${slot.name} a été ajoutée au tournoi.`, "success");
  } else {
    showToast("Déjà présente", "Cette machine est déjà dans le tournoi ou la limite est atteinte.", "warning");
  }
  // Vérifier si on a atteint 16 joueurs
  if (TournamentApp.players.length >= 16) {
    document.getElementById("addPlayerContainer").style.display = "none";
    document.getElementById("randomSlotBtn").style.display = "none";
    document.getElementById("launchDraw").style.display = "block";
  }
  // Retirer la machine acceptée de la liste
  TournamentApp.selectedSlotsArray.shift();
  // S'il reste des machines, afficher la suivante, sinon fermer la fenêtre
  if (TournamentApp.selectedSlotsArray.length > 0) {
    afficherMachineCourante();
  } else {
    closeRandomSlotDialog();
  }
  updateTournamentState({
    players: TournamentApp.players,
    matches: (() => { const o={}; for(let i=0;i<TournamentApp.matches.length;i++){o['round'+i]=TournamentApp.matches[i];} return o; })(),
    eliminated: TournamentApp.eliminated,
    winner: TournamentApp.winner,
    tournamentStarted: TournamentApp.tournamentStarted,
    eliminationHistory: TournamentApp.eliminationHistory,
    previousWinners: TournamentApp.previousWinners,
    tournamentCompleted: TournamentApp.tournamentCompleted
  });
}

// Nouvelle fonction pour afficher la machine courante de la liste aléatoire
function afficherMachineCourante() {
  if (!TournamentApp.selectedSlotsArray || TournamentApp.selectedSlotsArray.length === 0) {
    closeRandomSlotDialog();
    return;
  }
  const slot = TournamentApp.selectedSlotsArray[0];
  TournamentApp.randomSlotSelected = slot.name;
  TournamentApp.randomSlotCategory = slot.category;
  document.getElementById("randomSlotName").textContent = TournamentApp.randomSlotSelected;
  const categoryElement = document.getElementById("randomSlotCategory");
  if (TournamentApp.randomSlotCategory) {
    categoryElement.textContent = TournamentApp.randomSlotCategory;
    categoryElement.className = "random-slot-category";
    if (TournamentApp.randomSlotCategory === "Hacksaw Gaming") {
      categoryElement.classList.add("hacksaw");
    } else if (TournamentApp.randomSlotCategory === "Nolimit City") {
      categoryElement.classList.add("nolimit");
    } else if (TournamentApp.randomSlotCategory === "Pragmatic Play") {
      categoryElement.classList.add("pragmatic");
    }
  } else {
    categoryElement.textContent = "";
  }
  document.getElementById("randomSlotResult").style.display = "block";
  document.getElementById("acceptSlotBtn").style.display = "inline-flex";
  document.getElementById("rejectSlotBtn").style.display = "inline-flex";
  document.getElementById("selectRandomBtn").style.display = "none";
  document.getElementById("selectAnotherBtn").style.display = "inline-flex";
}

// Refuser la machine affichée et en proposer une autre
function rejectCurrentSlot() {
  // Relancer la sélection aléatoire pour proposer une nouvelle machine
  selectRandomSlot();
}

// Affichage/fermeture de la mention légale en slide
const legalNoticeIcon = document.getElementById('legalNoticeIcon');
const legalNoticeSlide = document.getElementById('legalNoticeSlide');

if (legalNoticeIcon && legalNoticeSlide) {
  legalNoticeIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    legalNoticeSlide.classList.toggle('active');
  });
  // Fermer si on clique ailleurs
  document.addEventListener('click', (e) => {
    if (legalNoticeSlide.classList.contains('active')) {
      if (!legalNoticeSlide.contains(e.target) && !legalNoticeIcon.contains(e.target)) {
        legalNoticeSlide.classList.remove('active');
      }
    }
  });
}

// === Confettis de victoire ===
let confettiActive = false;
let confettiParticles = [];
let confettiCanvas, confettiCtx, confettiAnimationFrame;

function launchConfetti() {
  confettiCanvas = document.getElementById('confetti-canvas');
  if (!confettiCanvas) return;
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  confettiCtx = confettiCanvas.getContext('2d');
  confettiParticles = [];
  confettiActive = true;
  confettiCanvas.style.display = 'block';
  // Générer 150 confettis
  for (let i = 0; i < 150; i++) {
    confettiParticles.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * -confettiCanvas.height,
      r: 6 + Math.random() * 8,
      d: 8 + Math.random() * 8,
      color: randomConfettiColor(),
      tilt: Math.random() * 10 - 10,
      tiltAngle: 0,
      tiltAngleIncremental: (Math.random() * 0.07) + 0.05,
      speed: 2 + Math.random() * 3
    });
  }
  confettiDraw();
}

function randomConfettiColor() {
  const colors = ['#FFD700', '#FF69B4', '#00CFFF', '#FF6347', '#32CD32', '#FFF', '#FFA500'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function confettiDraw() {
  if (!confettiActive || !confettiCtx) return;
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  for (let i = 0; i < confettiParticles.length; i++) {
    let p = confettiParticles[i];
    confettiCtx.beginPath();
    confettiCtx.ellipse(p.x, p.y, p.r, p.r / 2, p.tilt, 0, 2 * Math.PI);
    confettiCtx.fillStyle = p.color;
    confettiCtx.fill();
  }
  updateConfetti();
  confettiAnimationFrame = requestAnimationFrame(confettiDraw);
}

function updateConfetti() {
  for (let i = 0; i < confettiParticles.length; i++) {
    let p = confettiParticles[i];
    p.y += p.speed;
    p.tiltAngle += p.tiltAngleIncremental;
    p.tilt = Math.sin(p.tiltAngle) * 15;
    // Remettre en haut si en bas
    if (p.y > confettiCanvas.height + 20) {
      p.x = Math.random() * confettiCanvas.width;
      p.y = -10;
      p.tilt = Math.random() * 10 - 10;
    }
  }
}

function stopConfetti() {
  confettiActive = false;
  if (confettiAnimationFrame) cancelAnimationFrame(confettiAnimationFrame);
  if (confettiCanvas) confettiCanvas.style.display = 'none';
}

window.addEventListener('resize', () => {
  if (confettiCanvas && confettiActive) {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
});

// Remplace les ... par ta vraie config copiée sur la console Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB6aCO2sSWT-Symbty0K83sPzVXwRQAvAk",
  authDomain: "tournoi-de-slots.firebaseapp.com",
  projectId: "tournoi-de-slots",
  storageBucket: "tournoi-de-slots.appspot.com", // <-- CORRIGÉ
  messagingSenderId: "834358073654",
  appId: "1:834358073654:web:6d935be1322c9450e37b97",
  measurementId: "G-MZKD5K781T"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function generateTournamentId() {
  return Math.random().toString(36).substring(2, 10);
}

async function createTournament(initialState) {
  const id = generateTournamentId();
  await db.collection("tournois").doc(id).set({ state: initialState });
  
  // S'assurer qu'on n'est PAS en mode spectateur
  isSpectatorMode = false;
  localStorage.removeItem('spectatorMode');
  
  // Rediriger vers l'URL du tournoi (mode créateur)
  window.location.href = `/tournoi/${id}`;
}

function getTournamentIdFromUrl() {
  const match = window.location.pathname.match(/tournoi\/([a-z0-9]+)/i);
  return match ? match[1] : null;
}

const tournamentId = getTournamentIdFromUrl();
if (tournamentId) {
  db.collection("tournois").doc(tournamentId)
    .onSnapshot((doc) => {
      if (doc.exists) {
        const state = doc.data().state;
        // Ici, tu dois mettre à jour ton UI avec le state reçu
        updateTournamentUI(state);
      }
    });
}

async function updateTournamentState(newState) {
  const tournamentId = getTournamentIdFromUrl();
  if (tournamentId) {
    await db.collection("tournois").doc(tournamentId).update({ state: newState });
  }
}

// 1. Initialisation Firebase (voir plus haut)
// 2. Fonctions utilitaires (voir plus haut)

// 3. Création d'un tournoi (à appeler au bon moment)
function generateTournamentName() {
  const now = new Date();
  return "Tournoi du " + now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
}

async function lancerNouveauTournoi() {
  // Initialiser le bracket et placer les joueurs
  TournamentApp.tournamentStarted = true;
  initBracket();
  // Mélange temporaire pour le bracket uniquement
  const shuffled = [...TournamentApp.players];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  placePlayersRandomly(shuffled);

  // Cacher le message 'Slot ajoutés'
  const count = document.getElementById('count');
  if (count) count.style.display = 'none';

  // Transforme matches en objet pour Firestore
  const matchesObject = {};
  for (let i = 0; i < TournamentApp.matches.length; i++) {
    matchesObject['round' + i] = TournamentApp.matches[i];
  }

  const initialState = {
    name: generateTournamentName(),
    players: TournamentApp.players,
    matches: matchesObject,
    eliminated: [],
    winner: "",
    tournamentStarted: true,
    eliminationHistory: [],
    previousWinners: [],
    tournamentCompleted: false,
    createdAt: new Date().toISOString()
  };
  await createTournament(initialState);
}

// 4. Écoute en temps réel (au chargement d'un tournoi) - SUPPRIMÉ POUR ÉVITER LES CONFLITS
/*
document.addEventListener('DOMContentLoaded', () => {
  const id = getTournamentIdFromUrl();
  if (id) {
    db.collection("tournois").doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          updateTournamentUI(doc.data().state);
        }
      });
  }
});
*/

// 5. Mise à jour (à chaque action)
async function onAction(newState) {
  await updateTournamentState(newState);
}

function updateTournamentUI(state) {
  // Normalize dates from Firestore (convert Timestamps and strings to Date objects)
  state = normalizeStateDates(state);

  // Met à jour l'état du tournoi à partir de l'objet reçu de Firestore
  TournamentApp.players = state.players || [];
  TournamentApp.eliminated = state.eliminated || [];
  TournamentApp.winner = state.winner || "";
  TournamentApp.tournamentStarted = state.tournamentStarted || false;
  TournamentApp.tournamentCompleted = state.tournamentCompleted || false;
  TournamentApp.eliminationHistory = state.eliminationHistory || [];
  TournamentApp.previousWinners = state.previousWinners || [];

  // Reconstruit le tableau imbriqué à partir de l'objet matches
  if (state.matches && typeof state.matches === 'object' && !Array.isArray(state.matches)) {
    TournamentApp.matches = [];
    for (let i = 0; i < 4; i++) {
      TournamentApp.matches[i] = state.matches['round' + i] || [];
    }
  } else {
    TournamentApp.matches = state.matches || [];
  }

  // Correction de la structure des matches si besoin
  if (!Array.isArray(TournamentApp.matches) || TournamentApp.matches.length !== 4) {
    TournamentApp.matches = [];
    for (let i = 0; i < 4; i++) {
      TournamentApp.matches[i] = [];
      for (let j = 0; j < Math.pow(2, 4 - i - 1); j++) {
        TournamentApp.matches[i][j] = { p1: "", p2: "", score1: "", score2: "" };
      }
    }
  }

  // Mets à jour l'interface utilisateur
  updatePlayersDisplay();
  updateWinnersDisplay();
  renderBracket();

  // Affichage du bracket si le tournoi est démarré
  if (TournamentApp.tournamentStarted) {
    document.getElementById("bracket").style.display = "flex";
    document.getElementById("launchDraw").style.display = "none";
    document.getElementById("resetButton").style.display = "block";
    document.getElementById("addPlayerContainer").style.display = "none";
    document.getElementById("randomSlotBtn").style.display = "none";
    // Masquer le message 'Slot ajoutés'
    const count = document.getElementById('count');
    if (count) count.style.display = 'none';
  } else {
    if (TournamentApp.players.length === 16) {
      document.getElementById("addPlayerContainer").style.display = "none";
      document.getElementById("randomSlotBtn").style.display = "none";
      document.getElementById("launchDraw").style.display = "block";
    }
    // Afficher le message 'Slot ajoutés'
    const count = document.getElementById('count');
    if (count) count.style.display = '';
  }
  
  // CORRECTION: Assurez-vous que les restrictions du mode spectateur sont toujours appliquées après une mise à jour.
  if (isSpectatorMode) {
    disableActionsIfSpectator();
  }
}

// === AJOUT : Gestion des tournois en cours et mode spectateur ===

// Variables globales pour le mode spectateur
let isSpectatorMode = false;

// Fonction pour charger les tournois actifs depuis Firestore
async function loadActiveTournaments() {
  try {
    const snapshot = await db.collection("tournois")
      .where("state.tournamentCompleted", "==", false)
      .get();
    const tournaments = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.state && !data.state.tournamentCompleted) {
        tournaments.push({
          id: doc.id,
          ...data.state
        });
      }
    });
    // Trier côté client par date de création (plus récent en premier)
    tournaments.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
      return dateB - dateA;
    });
    return tournaments;
  } catch (error) {
    console.error("Erreur lors du chargement des tournois actifs:", error);
    showToast("Erreur", "Impossible de charger les tournois actifs", "error");
    return [];
  }
}

// Fonction pour rejoindre un tournoi en mode spectateur
function joinTournamentAsSpectator(tournamentId) {
  isSpectatorMode = true;
  // Rediriger vers la page d'accueil avec le paramètre du tournoi
  window.location.href = `/?tournament=${tournamentId}`;
}

// Désactive les actions si spectateur
function disableActionsIfSpectator() {
  if (!isSpectatorMode) return;
  
  // Masquer tous les boutons d'action
  const ids = [
    'addPlayerContainer','randomSlotBtn','launchDraw','resetButton','clearDataBtn','showPreviousWinnersBtn'
  ];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.style) el.style.display = 'none';
  });
  
  // Désactiver tous les clics sur les matches
  const matches = document.querySelectorAll('.match');
  matches.forEach(match => {
    match.style.pointerEvents = 'none';
    match.style.opacity = '0.7';
  });
  
  // Désactiver tous les boutons de score
  const scoreButtons = document.querySelectorAll('.score-btn');
  scoreButtons.forEach(btn => {
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.5';
  });
  
  // Désactiver tous les boutons d'action dans le bracket
  const bracketButtons = document.querySelectorAll('.bracket button');
  bracketButtons.forEach(btn => {
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.5';
  });
  
  // Indicateur visuel très visible
  const sidebar = document.querySelector('.sidebar');
  if (sidebar && !document.getElementById('spectator-indicator')) {
    const div = document.createElement('div');
    div.id = 'spectator-indicator';
    div.innerHTML = `
      <div style="background: #ff6b6b; color: white; padding: 15px; margin: 10px 0; border-radius: 8px; text-align: center;">
        <div style="font-weight: bold; margin-bottom: 10px;">👁️ MODE SPECTATEUR - Lecture seule</div>
        <button onclick="exitSpectatorMode()" style="background: white; color: #ff6b6b; border: none; padding: 8px 16px; border-radius: 5px; font-weight: bold; cursor: pointer; transition: all 0.3s; margin-bottom: 8px;">
          🚪 Sortir du mode spectateur
        </button>
        <div style="font-size: 12px; opacity: 0.9;">💡 Appuyez sur Échap pour sortir rapidement</div>
      </div>
    `;
    sidebar.prepend(div);
  }
  
  // Ajouter un overlay semi-transparent sur tout le bracket
  const bracket = document.getElementById('bracket');
  if (bracket && !document.getElementById('spectator-overlay')) {
    const overlay = document.createElement('div');
    overlay.id = 'spectator-overlay';
    overlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.1);
      pointer-events: none;
      z-index: 1000;
    `;
    bracket.style.position = 'relative';
    bracket.appendChild(overlay);
  }
}

// Fonction pour charger un tournoi spécifique depuis Firestore
async function loadSpecificTournament(tournamentId) {
  try {
    const doc = await db.collection("tournois").doc(tournamentId).get();
    if (doc.exists) {
      const state = doc.data().state;
      updateTournamentUI(state);
      disableActionsIfSpectator();
      showToast("Mode spectateur", "Vous regardez ce tournoi en mode spectateur", "info");
    } else {
      showToast("Erreur", "Tournoi non trouvé", "error");
    }
  } catch (error) {
    console.error("Erreur lors du chargement du tournoi:", error);
    showToast("Erreur", "Impossible de charger le tournoi", "error");
  }
}

// Fonction pour obtenir le paramètre tournament de l'URL
function getTournamentFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('tournament');
}

// Réactive les actions si pas spectateur
function enableActionsIfNotSpectator() {
  if (isSpectatorMode) return;
  
  // Afficher tous les boutons d'action
  const ids = [
    'addPlayerContainer','randomSlotBtn','launchDraw','resetButton','clearDataBtn','showPreviousWinnersBtn'
  ];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = ''; // Ne pas utiliser style.display = '' car cela peut être surchargé par d'autres classes
  });
  
  // Réactiver tous les clics sur les matches
  const matches = document.querySelectorAll('.match');
  matches.forEach(match => {
    match.style.pointerEvents = '';
    match.style.opacity = '';
  });
  
  // Réactiver tous les boutons de score
  const scoreButtons = document.querySelectorAll('.score-btn');
  scoreButtons.forEach(btn => {
    btn.style.pointerEvents = '';
    btn.style.opacity = '';
  });
  
  // Réactiver tous les boutons d'action dans le bracket
  const bracketButtons = document.querySelectorAll('.bracket button');
  bracketButtons.forEach(btn => {
    btn.style.pointerEvents = '';
    btn.style.opacity = '';
  });
  
  // Supprimer l'indicateur spectateur
  const indicator = document.getElementById('spectator-indicator');
  if (indicator) indicator.remove();
  
  // Supprimer l'overlay spectateur
  const overlay = document.getElementById('spectator-overlay');
  if (overlay) overlay.remove();
}

// ... existing code ...

// Bascule le mode spectateur
function toggleSpectatorMode() {
  isSpectatorMode = !isSpectatorMode;
  localStorage.setItem('spectatorMode', isSpectatorMode);
  
  if (isSpectatorMode) {
    disableActionsIfSpectator();
  } else {
    enableActionsIfNotSpectator();
  }
}

// Initialise le mode spectateur (détecte seulement, n'applique pas les restrictions)
function initializeSpectatorMode() {
  const savedMode = localStorage.getItem('spectatorMode');
  isSpectatorMode = savedMode === 'true';
  // Note: Les restrictions seront appliquées plus tard dans le flux d'initialisation
}

// Fonction pour sortir du mode spectateur
function exitSpectatorMode() {
  // Demander confirmation
  if (confirm("Voulez-vous vraiment sortir du mode spectateur ? Vous perdrez la vue en temps réel de ce tournoi.")) {
    // Réinitialiser le mode spectateur
    isSpectatorMode = false;
    localStorage.removeItem('spectatorMode');
    
    // Nettoyer l'URL des paramètres
    const url = new URL(window.location);
    url.searchParams.delete('tournament');
    window.history.replaceState({}, '', url);
    
    // Réactiver toutes les actions
    enableActionsIfNotSpectator();
    
    // Recharger la page pour repartir de zéro
    window.location.reload();
  }
}
