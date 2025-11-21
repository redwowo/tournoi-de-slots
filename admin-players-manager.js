// Admin Players Manager - Category and Player management
class AdminPlayersManager {
  constructor() {
    this.categories = {};
    this.nextPlayerId = 1;
    this.loadPlayers();
  }

  // Load players from localStorage or file
  async loadPlayers() {
    try {
      // Always load from players.json first as the base data
      const response = await fetch('/players.json');
      if (response.ok) {
        const baseData = await response.json();
        
        // Check if localStorage has user modifications
        const stored = localStorage.getItem('adminPlayers');
        const hasModifications = localStorage.getItem('adminPlayersModified') === 'true';
        
        if (stored && hasModifications) {
          // User has made modifications, use localStorage data
          this.categories = JSON.parse(stored);
        } else {
          // No modifications or old data, use players.json
          this.categories = baseData;
          // Clear any old localStorage data
          localStorage.removeItem('adminPlayers');
          localStorage.removeItem('adminPlayersModified');
        }
        
        this.updateNextPlayerId();
      } else {
        // Fallback to localStorage if players.json can't be loaded
        const stored = localStorage.getItem('adminPlayers');
        if (stored) {
          this.categories = JSON.parse(stored);
          this.updateNextPlayerId();
        } else {
          this.categories = {};
        }
      }
    } catch (error) {
      console.error('Error loading players:', error);
      // Fallback to localStorage on error
      const stored = localStorage.getItem('adminPlayers');
      if (stored) {
        this.categories = JSON.parse(stored);
        this.updateNextPlayerId();
      } else {
        this.categories = {};
      }
    }
  }

  // Update next player ID based on existing players
  updateNextPlayerId() {
    let maxId = 0;
    for (const categoryPlayers of Object.values(this.categories)) {
      for (const player of categoryPlayers) {
        if (player.id > maxId) {
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

    this.categories[trimmed] = [];
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

    const playerCount = this.categories[categoryName].length;
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
    return [...this.categories[categoryName]];
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

    // Check if player name already exists in this category
    if (this.categories[categoryName].some(p => p.name.toLowerCase() === trimmed.toLowerCase())) {
      return { success: false, error: 'Ce joueur existe déjà dans cette catégorie' };
    }

    const newPlayer = {
      id: this.nextPlayerId++,
      name: trimmed
    };

    this.categories[categoryName].push(newPlayer);
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

    const player = this.categories[categoryName].find(p => p.id === playerId);
    if (!player) {
      return { success: false, error: 'Joueur non trouvé' };
    }

    // Check if new name already exists (excluding current player)
    if (this.categories[categoryName].some(p => p.id !== playerId && p.name.toLowerCase() === trimmed.toLowerCase())) {
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

    const playerIndex = this.categories[categoryName].findIndex(p => p.id === playerId);
    if (playerIndex === -1) {
      return { success: false, error: 'Joueur non trouvé' };
    }

    const player = this.categories[categoryName][playerIndex];
    this.categories[categoryName].splice(playerIndex, 1);
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
    for (const players of Object.values(this.categories)) {
      totalPlayers += players.length;
    }

    return {
      totalCategories: categories.length,
      totalPlayers: totalPlayers
    };
  }
}

// Global instance
const adminPlayersManager = new AdminPlayersManager();
