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

    this.loadPromise = this.loadPlayers();
  }

  async init() {
    if (!this.loadPromise) {
      this.loadPromise = this.loadPlayers();
    }
    await this.loadPromise;
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
        const sanitized = {
          id: Number.isFinite(parsedId) ? parsedId : 0,
          name: trimmedName
        };
        // Preserve firestoreId if it exists
        if (player.firestoreId) {
          sanitized.firestoreId = player.firestoreId;
        }
        return sanitized;
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

  // Load categories from Firestore categories collection
  async loadCategoriesFromFirestore() {
    try {
      if (!window.db) {
        console.warn('Firestore not initialized');
        return {};
      }

      const snapshot = await window.db.collection('categories').get();
      const categories = {};
      
      snapshot.forEach(doc => {
        const data = doc.data();
        const categoryName = data.name || doc.id;
        categories[categoryName] = {
          color: data.color || this.getDefaultColor(categoryName),
          imagePath: data.imagePath || this.getDefaultImagePath(categoryName),
          players: [],
          firestoreId: doc.id
        };
      });

      console.log('✅ Loaded categories from Firestore:', Object.keys(categories).length);
      return categories;
    } catch (error) {
      console.error('❌ Error loading categories from Firestore:', error);
      return {};
    }
  }

  // Load players from Firestore players collection
  async loadPlayersFromFirestore() {
    try {
      if (!window.db) {
        console.warn('Firestore not initialized');
        return [];
      }

      const snapshot = await window.db.collection('players').get();
      const players = [];
      
      snapshot.forEach(doc => {
        const data = doc.data();
        // Ensure id is a number
        const playerId = typeof data.id === 'number' ? data.id : parseInt(data.id, 10) || 0;
        players.push({
          id: playerId,
          name: data.name,
          category: data.category,
          firestoreId: doc.id
        });
      });

      console.log('✅ Loaded players from Firestore:', players.length);
      return players;
    } catch (error) {
      console.error('❌ Error loading players from Firestore:', error);
      return [];
    }
  }

  // Load all data from Firestore
  async loadFromFirestore() {
    try {
      if (!window.db) {
        console.warn('⚠️ Firestore not initialized - window.db is undefined');
        return null;
      }

      console.log('🔄 Loading data from Firestore...');

      // Load categories
      const categories = await this.loadCategoriesFromFirestore();
      
      // Load players
      const players = await this.loadPlayersFromFirestore();
      
      // Organize players by category
      players.forEach(player => {
        if (categories[player.category]) {
          categories[player.category].players.push({
            id: player.id,
            name: player.name,
            firestoreId: player.firestoreId
          });
        } else {
          console.warn(`⚠️ Player "${player.name}" references non-existent category "${player.category}"`);
        }
      });

      console.log('✅ Loaded complete data from Firestore:', {
        categories: Object.keys(categories).length,
        totalPlayers: players.length
      });
      return categories;
    } catch (error) {
      console.error('❌ Error loading from Firestore:', error);
      return null;
    }
  }

  // Save a category to Firestore
  async saveCategoryToFirestore(categoryName, categoryData) {
    try {
      if (!window.db) {
        console.warn('Firestore not initialized');
        return false;
      }

      const docData = {
        name: categoryName,
        color: categoryData.color,
        imagePath: categoryData.imagePath,
        lastUpdated: new Date()
      };

      // If we have a firestoreId, update existing document
      if (categoryData.firestoreId) {
        await window.db.collection('categories').doc(categoryData.firestoreId).update(docData);
        console.log('✅ Category updated in Firestore:', categoryName);
      } else {
        // Create new document
        const docRef = await window.db.collection('categories').add(docData);
        categoryData.firestoreId = docRef.id;
        console.log('✅ Category saved to Firestore:', categoryName, 'ID:', docRef.id);
      }

      return true;
    } catch (error) {
      console.error('❌ Error saving category to Firestore:', error);
      return false;
    }
  }

  // Save a player to Firestore
  async savePlayerToFirestore(categoryName, player) {
    try {
      if (!window.db) {
        console.warn('Firestore not initialized');
        return false;
      }

      const docData = {
        id: player.id,
        name: player.name,
        category: categoryName,
        lastUpdated: new Date()
      };

      // If we have a firestoreId, update existing document
      if (player.firestoreId) {
        await window.db.collection('players').doc(player.firestoreId).update(docData);
        console.log('✅ Player updated in Firestore:', player.name);
      } else {
        // Create new document
        const docRef = await window.db.collection('players').add(docData);
        player.firestoreId = docRef.id;
        console.log('✅ Player saved to Firestore:', player.name, 'ID:', docRef.id);
      }

      return true;
    } catch (error) {
      console.error('❌ Error saving player to Firestore:', error);
      return false;
    }
  }

  // Delete a category from Firestore
  async deleteCategoryFromFirestore(categoryOrId) {
    try {
      const firestoreId = typeof categoryOrId === 'string'
        ? categoryOrId
        : categoryOrId?.firestoreId;

      if (!window.db || !firestoreId) {
        return false;
      }

      await window.db.collection('categories').doc(firestoreId).delete();
      console.log('✅ Category deleted from Firestore');
      return true;
    } catch (error) {
      console.error('❌ Error deleting category from Firestore:', error);
      return false;
    }
  }

  // Delete a player from Firestore
  async deletePlayerFromFirestore(playerOrId) {
    try {
      const firestoreId = typeof playerOrId === 'string'
        ? playerOrId
        : playerOrId?.firestoreId;

      if (!window.db || !firestoreId) {
        return false;
      }

      await window.db.collection('players').doc(firestoreId).delete();
      console.log('✅ Player deleted from Firestore');
      return true;
    } catch (error) {
      console.error('❌ Error deleting player from Firestore:', error);
      return false;
    }
  }

  async deleteFirestoreDocs(docRefs = [], batchSize = 450) {
    try {
      if (!window.db) {
        return false;
      }

      const refs = Array.isArray(docRefs) ? docRefs.filter(Boolean) : [];
      if (refs.length === 0) {
        return true;
      }

      for (let i = 0; i < refs.length; i += batchSize) {
        const batch = window.db.batch();
        refs.slice(i, i + batchSize).forEach(ref => batch.delete(ref));
        await batch.commit();
      }

      return true;
    } catch (error) {
      console.error('❌ Error deleting docs from Firestore:', error);
      return false;
    }
  }

  // Deprecated: kept for backward compatibility
  async saveToFirestore() {
    console.warn('saveToFirestore() is deprecated. Data is now saved per-entity.');
    return true;
  }

  // Load players from localStorage or file
  async loadPlayers() {
    try {
      console.log('🔄 AdminPlayersManager: Starting data load...');
      
      // Try to load from Firebase first
      let firebaseData = null;
      if (window.db) {
        console.log('✅ window.db is available, loading from Firestore...');
        firebaseData = await this.loadFromFirestore();
      } else {
        console.warn('⚠️ window.db is NOT available yet, skipping Firestore');
      }

      // If we have Firebase data, use it
      if (firebaseData) {
        console.log('✅ Using Firestore data as source of truth');
        this.applyNormalizedData(firebaseData);
        return;
      }

      console.log('⚠️ No Firestore data found, falling back to players.json');

      // Fall back to players.json
      const response = await fetch('/players.json');
      if (response.ok) {
        const baseData = await response.json();

        const stored = localStorage.getItem('adminPlayers');
        const hasModifications = localStorage.getItem('adminPlayersModified') === 'true';

        if (stored && hasModifications) {
          console.log('📦 Using modified localStorage data');
          const parsedStored = JSON.parse(stored);
          this.applyNormalizedData(parsedStored, { resave: true });
          // Sync the local modifications to Firebase
          await this.saveToFirestore();
        } else {
          console.log('📄 Using base players.json data');
          this.applyNormalizedData(baseData);
          localStorage.removeItem('adminPlayers');
          localStorage.removeItem('adminPlayersModified');
        }
      } else {
        console.warn('⚠️ players.json not found, using localStorage fallback');
        this.loadFromLocalStorageFallback();
      }
    } catch (error) {
      console.error('❌ Error loading players:', error);
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

  // Save players to localStorage (for caching)
  savePlayers() {
    localStorage.setItem('adminPlayers', JSON.stringify(this.categories));
    // Mark that user has made modifications
    localStorage.setItem('adminPlayersModified', 'true');
    // Broadcast change to other tabs/windows
    this.broadcastUpdate();
    // Note: Individual entities are saved to Firestore via specific methods
  }

  async postPlayersApi(endpoint, payload) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload || {})
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        return {
          success: false,
          error: data?.error || data?.message || `HTTP ${response.status}`
        };
      }

      return data;
    } catch (error) {
      console.error(`Error calling ${endpoint}:`, error);
      return { success: false, error: error.message || 'Erreur réseau' };
    }
  }

  // Persist the entire dataset to players.json via API (used for edits)
  async saveCategoriesToServer(categories = this.categories) {
    return this.postPlayersApi('/api/save-categories', { categories });
  }

  async addCategoryToServer(categoryName, metadata = {}) {
    return this.postPlayersApi('/api/add-category', {
      categoryName,
      color: metadata.color,
      imagePath: metadata.imagePath
    });
  }

  async deleteCategoryFromServer(categoryName) {
    return this.postPlayersApi('/api/delete-category', { categoryName });
  }

  async addPlayerToServer(categoryName, playerName) {
    return this.postPlayersApi('/api/add-player', { category: categoryName, playerName });
  }

  async deletePlayerFromServer(categoryName, playerName) {
    return this.postPlayersApi('/api/delete-player', { category: categoryName, playerName });
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
  async addCategory(categoryName, metadata = {}) {
    const trimmed = categoryName.trim();

    if (!trimmed) {
      return { success: false, error: 'Le nom de la catégorie ne peut pas être vide' };
    }

    if (this.categories.hasOwnProperty(trimmed)) {
      return { success: false, error: 'Cette catégorie existe déjà' };
    }

    const overrides = {
      color: metadata.color || undefined,
      imagePath: metadata.imagePath || undefined,
      players: []
    };

    this.categories[trimmed] = this.createCategoryEntry(trimmed, overrides);
    
    // Save to Firestore
    await this.saveCategoryToFirestore(trimmed, this.categories[trimmed]);
    
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
  async deleteCategory(categoryName) {
    if (!this.categories.hasOwnProperty(categoryName)) {
      return { success: false, error: 'Catégorie non trouvée' };
    }

    const category = this.categories[categoryName];

    try {
      let deletedPlayersCount = Array.isArray(category.players) ? category.players.length : 0;

      if (window.db) {
        const deleteRefs = [];

        const playersSnapshot = await window.db
          .collection('players')
          .where('category', '==', categoryName)
          .get();

        deletedPlayersCount = playersSnapshot.size;
        playersSnapshot.forEach(docSnap => deleteRefs.push(docSnap.ref));

        if (category.firestoreId) {
          deleteRefs.push(window.db.collection('categories').doc(category.firestoreId));
        } else {
          const categorySnapshot = await window.db
            .collection('categories')
            .where('name', '==', categoryName)
            .get();
          categorySnapshot.forEach(docSnap => deleteRefs.push(docSnap.ref));
        }

        const deleted = await this.deleteFirestoreDocs(deleteRefs);
        if (!deleted) {
          return { success: false, error: 'Erreur lors de la suppression dans Firestore' };
        }
      }

      delete this.categories[categoryName];
      this.savePlayers();

      adminManager.logAction({
        type: 'delete_category',
        details: `Catégorie "${categoryName}" supprimée (${deletedPlayersCount} joueur(s))`,
        categoryName: categoryName,
        playerCount: deletedPlayersCount
      });

      return { success: true, playerCount: deletedPlayersCount };
    } catch (error) {
      console.error('❌ Error deleting category:', error);
      return { success: false, error: error.message || 'Erreur lors de la suppression de la catégorie' };
    }
  }

  // Get players in a category
  getPlayersInCategory(categoryName) {
    if (!this.categories.hasOwnProperty(categoryName)) {
      return [];
    }
    return [...this.categories[categoryName].players];
  }

  // Add a player to a category
  async addPlayer(categoryName, playerName, options = {}) {
    const trimmed = playerName.trim();
    const forcedId = Number(options?.forcedId);

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

    const id = Number.isFinite(forcedId) && forcedId > 0 ? forcedId : this.nextPlayerId;
    const newPlayer = {
      id,
      name: trimmed
    };

    if (!(Number.isFinite(forcedId) && forcedId > 0)) {
      this.nextPlayerId += 1;
    } else if (forcedId >= this.nextPlayerId) {
      this.nextPlayerId = forcedId + 1;
    }

    category.players.push(newPlayer);
    
    // Save to Firestore
    await this.savePlayerToFirestore(categoryName, newPlayer);
    
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
  async editPlayer(categoryName, playerId, newName) {
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
    
    // Update in Firestore
    await this.savePlayerToFirestore(categoryName, player);
    
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
  async deletePlayer(categoryName, playerIdOrFirestoreId) {
    if (!this.categories.hasOwnProperty(categoryName)) {
      return { success: false, error: 'Catégorie non trouvée' };
    }

    const category = this.categories[categoryName];
    const isFirestoreId = typeof playerIdOrFirestoreId === 'string';

    const playerIndex = isFirestoreId
      ? category.players.findIndex(p => p.firestoreId === playerIdOrFirestoreId)
      : category.players.findIndex(p => p.id === playerIdOrFirestoreId);

    if (playerIndex === -1) {
      if (isFirestoreId && window.db) {
        const deleted = await this.deletePlayerFromFirestore(playerIdOrFirestoreId);
        if (!deleted) {
          return { success: false, error: 'Erreur lors de la suppression dans Firestore' };
        }
        return { success: true };
      }

      return { success: false, error: 'Joueur non trouvé' };
    }

    const player = category.players[playerIndex];
    const firestoreId = isFirestoreId ? playerIdOrFirestoreId : player.firestoreId;

    if (window.db) {
      if (firestoreId) {
        const deleted = await this.deletePlayerFromFirestore(firestoreId);
        if (!deleted) {
          return { success: false, error: 'Erreur lors de la suppression dans Firestore' };
        }
      } else if (Number.isFinite(Number(player.id))) {
        const snapshot = await window.db
          .collection('players')
          .where('id', '==', player.id)
          .get();

        const deleteRefs = [];
        snapshot.forEach(docSnap => deleteRefs.push(docSnap.ref));

        const deleted = await this.deleteFirestoreDocs(deleteRefs);
        if (!deleted) {
          return { success: false, error: 'Erreur lors de la suppression dans Firestore' };
        }
      } else {
        console.warn('⚠️ Unable to delete player from Firestore: missing firestoreId and numeric id');
      }
    }

    category.players.splice(playerIndex, 1);
    this.savePlayers();

    adminManager.logAction({
      type: 'delete_player',
      details: `Joueur "${player.name}" supprimé de la catégorie "${categoryName}"`,
      categoryName: categoryName,
      playerName: player.name,
      playerId: player.id
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

  // Update category metadata (color, imagePath)
  async updateCategoryMetadata(categoryName, updates) {
    if (!this.categories.hasOwnProperty(categoryName)) {
      return { success: false, error: 'Catégorie non trouvée' };
    }

    const category = this.categories[categoryName];
    const oldMetadata = {
      color: category.color,
      imagePath: category.imagePath
    };

    if (updates.color !== undefined) {
      category.color = updates.color;
    }

    if (updates.imagePath !== undefined) {
      category.imagePath = updates.imagePath;
    }

    // Update in Firestore
    await this.saveCategoryToFirestore(categoryName, category);
    
    this.savePlayers();

    // Log action
    const changes = [];
    if (updates.color && updates.color !== oldMetadata.color) {
      changes.push(`couleur: ${oldMetadata.color} → ${updates.color}`);
    }
    if (updates.imagePath && updates.imagePath !== oldMetadata.imagePath) {
      changes.push('image mise à jour');
    }

    if (changes.length > 0) {
      adminManager.logAction({
        type: 'edit_category',
        details: `Catégorie "${categoryName}" modifiée (${changes.join(', ')})`,
        categoryName: categoryName
      });
    }

    return { success: true, categoryName: categoryName };
  }
}

// Global instance
const adminPlayersManager = new AdminPlayersManager();

