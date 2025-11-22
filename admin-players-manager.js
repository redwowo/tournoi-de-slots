// Admin Players Manager - Category and Player management
class AdminPlayersManager {
  constructor() {
    this.categories = {};
    this.nextPlayerId = 1;
    this.defaultCategoryColor = '#4b5563';
    this.defaultImagePath = '';
    this.categoryDefaults = {
      'Hacksaw Gaming': { color: '#101820', imagePath: '/hacksawlogo.png' },
      'Nolimit City': { color: '#ffd100', imagePath: '/nolimitcitylogo.png' },
      'Pragmatic Play': { color: '#ff6f00', imagePath: '/pragmaticplaylogo.png' }
    };

    this.loadPlayers();
  }

  getDefaultColor(categoryName) {
    return (this.categoryDefaults[categoryName]?.color) || this.defaultCategoryColor;
  }

  getDefaultImagePath(categoryName) {
    return (this.categoryDefaults[categoryName]?.imagePath) || this.defaultImagePath;
  }

  createCategoryEntry(categoryName, overrides = {}) {
    const players = Array.isArray(overrides.players) ? overrides.players : [];
    return {
      color: overrides.color || this.getDefaultColor(categoryName),
      imagePath: overrides.imagePath || this.getDefaultImagePath(categoryName),
      players: players
    };
  }

  sanitizePlayers(players) {
    if (!Array.isArray(players)) {
      return [];
    }

    return players
      .filter(player => player && typeof player.name === 'string')
      .map(player => {
        const parsedId = Number(player.id);
        const trimmedName = player.name.trim();
        return {
          id: Number.isFinite(parsedId) ? parsedId : 0,
          name: trimmedName
        };
      })
      .filter(player => player.name.length > 0);
  }

  normalizeCategories(rawCategories) {
    const normalized = {};
    let requiresResave = false;

    if (!rawCategories || typeof rawCategories !== 'object') {
      return { normalized, requiresResave };
    }

    Object.entries(rawCategories).forEach(([name, value]) => {
      if (Array.isArray(value)) {
        normalized[name] = {
          color: this.getDefaultColor(name),
          imagePath: this.getDefaultImagePath(name),
          players: this.sanitizePlayers(value)
        };
        requiresResave = true;
        return;
      }

      if (value && typeof value === 'object') {
        const players = this.sanitizePlayers(value.players || []);
        const color = value.color || this.getDefaultColor(name);
        const imagePath = value.imagePath || this.getDefaultImagePath(name);

        if (!value.color || !value.imagePath || !Array.isArray(value.players)) {
          requiresResave = true;
        }

        normalized[name] = { color, imagePath, players };
        return;
      }

      normalized[name] = {
        color: this.getDefaultColor(name),
        imagePath: this.getDefaultImagePath(name),
        players: []
      };
      requiresResave = true;
    });

    return { normalized, requiresResave };
  }

  applyNormalizedData(rawData, options = {}) {
    const { normalized, requiresResave } = this.normalizeCategories(rawData);
    this.categories = normalized;
    this.updateNextPlayerId();

    if (options.resave && requiresResave) {
      localStorage.setItem('adminPlayers', JSON.stringify(this.categories));
      if (options.markModified) {
        localStorage.setItem('adminPlayersModified', 'true');
      }
    }
  }

  loadFromLocalStorageFallback() {
    const stored = localStorage.getItem('adminPlayers');
    if (stored) {
      try {
        this.applyNormalizedData(JSON.parse(stored), { resave: true, markModified: true });
        return;
      } catch (error) {
        console.error('Erreur lors de la lecture des données locales:', error);
      }
    }

    this.categories = {};
    this.nextPlayerId = 1;
  }

  // Load players from localStorage or file
  async loadPlayers() {
    try {
      const response = await fetch('/players.json');
      if (response.ok) {
        const baseData = await response.json();

        const stored = localStorage.getItem('adminPlayers');
        const hasModifications = localStorage.getItem('adminPlayersModified') === 'true';

        if (stored && hasModifications) {
          const parsedStored = JSON.parse(stored);
          this.applyNormalizedData(parsedStored, { resave: true });
        } else {
          this.applyNormalizedData(baseData);
          localStorage.removeItem('adminPlayers');
          localStorage.removeItem('adminPlayersModified');
        }
      } else {
        this.loadFromLocalStorageFallback();
      }
    } catch (error) {
      console.error('Error loading players:', error);
      this.loadFromLocalStorageFallback();
    }
  }

  // Update next player ID based on existing players
  updateNextPlayerId() {
    let maxId = 0;
    for (const category of Object.values(this.categories)) {
      if (!category || !Array.isArray(category.players)) {
        continue;
      }
      for (const player of category.players) {
        if (typeof player.id === 'number' && player.id > maxId) {
          maxId = player.id;
        }
      }
    }
    this.nextPlayerId = maxId + 1;
  }

  // Save players to localStorage
  savePlayers() {
    localStorage.setItem('adminPlayers', JSON.stringify(this.categories));
    // Mark that user has made modifications
    localStorage.setItem('adminPlayersModified', 'true');
    // Broadcast change to other tabs/windows
    this.broadcastUpdate();
  }

  // Broadcast update to tournament-app instances
  broadcastUpdate() {
    const timestamp = Date.now();
    localStorage.setItem('adminPlayersLastUpdate', timestamp.toString());
    // Dispatch custom event for same-window listeners
    window.dispatchEvent(new CustomEvent('adminPlayersUpdated', { detail: { timestamp } }));
  }

  // Reset to base data from players.json (clear all modifications)
  async resetToBaseData() {
    try {
      localStorage.removeItem('adminPlayers');
      localStorage.removeItem('adminPlayersModified');
      await this.loadPlayers();
      return { success: true };
    } catch (error) {
      console.error('Error resetting to base data:', error);
      return { success: false, error: 'Erreur lors de la réinitialisation' };
    }
  }

  // Get all categories
  getCategories() {
    return Object.keys(this.categories).sort();
  }

  // Add a new category
  addCategory(categoryName) {
    const trimmed = categoryName.trim();

    if (!trimmed) {
      return { success: false, error: 'Le nom de la catégorie ne peut pas être vide' };
    }

    if (this.categories.hasOwnProperty(trimmed)) {
      return { success: false, error: 'Cette catégorie existe déjà' };
    }

    this.categories[trimmed] = this.createCategoryEntry(trimmed);
    this.savePlayers();

    // Log action
    adminManager.logAction({
      type: 'add_category',
      details: `Catégorie "${trimmed}" ajoutée`,
      categoryName: trimmed
    });

    return { success: true, categoryName: trimmed };
  }

  // Delete a category
  deleteCategory(categoryName) {
    if (!this.categories.hasOwnProperty(categoryName)) {
      return { success: false, error: 'Catégorie non trouvée' };
    }

    const playerCount = this.categories[categoryName].players.length;
    delete this.categories[categoryName];
    this.savePlayers();

    // Log action
    adminManager.logAction({
      type: 'delete_category',
      details: `Catégorie "${categoryName}" supprimée (${playerCount} joueur(s))`,
      categoryName: categoryName,
      playerCount: playerCount
    });

    return { success: true, playerCount: playerCount };
  }

  // Get players in a category
  getPlayersInCategory(categoryName) {
    if (!this.categories.hasOwnProperty(categoryName)) {
      return [];
    }
    return [...this.categories[categoryName].players];
  }

  // Add a player to a category
  addPlayer(categoryName, playerName) {
    const trimmed = playerName.trim();

    if (!this.categories.hasOwnProperty(categoryName)) {
      return { success: false, error: 'Catégorie non trouvée' };
    }

    if (!trimmed) {
      return { success: false, error: 'Le nom du joueur ne peut pas être vide' };
    }

    const category = this.categories[categoryName];

    // Check if player name already exists in this category
    if (category.players.some(p => p.name.toLowerCase() === trimmed.toLowerCase())) {
      return { success: false, error: 'Ce joueur existe déjà dans cette catégorie' };
    }

    const newPlayer = {
      id: this.nextPlayerId++,
      name: trimmed
    };

    category.players.push(newPlayer);
    this.savePlayers();

    // Log action
    adminManager.logAction({
      type: 'add_player',
      details: `Joueur "${trimmed}" ajouté à la catégorie "${categoryName}"`,
      categoryName: categoryName,
      playerName: trimmed,
      playerId: newPlayer.id
    });

    return { success: true, player: newPlayer };
  }

  // Edit a player
  editPlayer(categoryName, playerId, newName) {
    const trimmed = newName.trim();

    if (!this.categories.hasOwnProperty(categoryName)) {
      return { success: false, error: 'Catégorie non trouvée' };
    }

    if (!trimmed) {
      return { success: false, error: 'Le nom du joueur ne peut pas être vide' };
    }

    const category = this.categories[categoryName];
    const player = category.players.find(p => p.id === playerId);
    if (!player) {
      return { success: false, error: 'Joueur non trouvé' };
    }

    // Check if new name already exists (excluding current player)
    if (category.players.some(p => p.id !== playerId && p.name.toLowerCase() === trimmed.toLowerCase())) {
      return { success: false, error: 'Ce nom de joueur existe déjà dans cette catégorie' };
    }

    const oldName = player.name;
    player.name = trimmed;
    this.savePlayers();

    // Log action
    adminManager.logAction({
      type: 'edit_player',
      details: `Joueur "${oldName}" renommé en "${trimmed}" dans la catégorie "${categoryName}"`,
      categoryName: categoryName,
      playerName: trimmed,
      playerId: playerId
    });

    return { success: true, player: player };
  }

  // Delete a player
  deletePlayer(categoryName, playerId) {
    if (!this.categories.hasOwnProperty(categoryName)) {
      return { success: false, error: 'Catégorie non trouvée' };
    }

    const category = this.categories[categoryName];
    const playerIndex = category.players.findIndex(p => p.id === playerId);
    if (playerIndex === -1) {
      return { success: false, error: 'Joueur non trouvé' };
    }

    const player = category.players[playerIndex];
    category.players.splice(playerIndex, 1);
    this.savePlayers();

    // Log action
    adminManager.logAction({
      type: 'delete_player',
      details: `Joueur "${player.name}" supprimé de la catégorie "${categoryName}"`,
      categoryName: categoryName,
      playerName: player.name,
      playerId: playerId
    });

    return { success: true, playerName: player.name };
  }

  // Get dashboard stats
  getPlayerStats() {
    const categories = this.getCategories();
    let totalPlayers = 0;
    for (const category of Object.values(this.categories)) {
      totalPlayers += Array.isArray(category.players) ? category.players.length : 0;
    }

    return {
      totalCategories: categories.length,
      totalPlayers: totalPlayers
    };
  }

  // Get metadata for a category
  getCategoryMetadata(categoryName) {
    const defaults = {
      color: this.getDefaultColor(categoryName),
      imagePath: this.getDefaultImagePath(categoryName)
    };

    if (!this.categories.hasOwnProperty(categoryName)) {
      return defaults;
    }

    const category = this.categories[categoryName];
    return {
      color: category.color || defaults.color,
      imagePath: category.imagePath || defaults.imagePath
    };
  }
}

// Global instance
const adminPlayersManager = new AdminPlayersManager();

