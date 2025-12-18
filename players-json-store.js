const fs = require('fs');
const path = require('path');

const CATEGORY_DEFAULTS = {
  'Hacksaw Gaming': { color: '#101820', imagePath: '/hacksawlogo.png' },
  'Nolimit City': { color: '#ffd100', imagePath: '/nolimitcitylogo.png' },
  'Pragmatic Play': { color: '#ff6f00', imagePath: '/pragmaticplaylogo.png' }
};

function getDefaultColor(categoryName) {
  return CATEGORY_DEFAULTS[categoryName]?.color || '#4b5563';
}

function getDefaultImagePath(categoryName) {
  return CATEGORY_DEFAULTS[categoryName]?.imagePath || '';
}

function sanitizePlayers(players) {
  if (!Array.isArray(players)) return [];

  return players
    .map(player => {
      if (typeof player === 'string') {
        return { id: 0, name: player.trim() };
      }

      if (!player || typeof player !== 'object') {
        return null;
      }

      const id = Number(player.id);
      const name = String(player.name || '').trim();

      return {
        id: Number.isFinite(id) ? id : 0,
        name
      };
    })
    .filter(Boolean)
    .filter(player => player.name.length > 0);
}

function normalizeCategories(rawCategories) {
  const normalized = {};

  if (!rawCategories || typeof rawCategories !== 'object') {
    return normalized;
  }

  Object.entries(rawCategories).forEach(([name, value]) => {
    if (Array.isArray(value)) {
      normalized[name] = {
        color: getDefaultColor(name),
        imagePath: getDefaultImagePath(name),
        players: sanitizePlayers(value)
      };
      return;
    }

    if (value && typeof value === 'object') {
      normalized[name] = {
        color: value.color || getDefaultColor(name),
        imagePath: value.imagePath || getDefaultImagePath(name),
        players: sanitizePlayers(value.players)
      };
      return;
    }

    normalized[name] = {
      color: getDefaultColor(name),
      imagePath: getDefaultImagePath(name),
      players: []
    };
  });

  return normalized;
}

function getGlobalMaxPlayerId(categories) {
  let maxId = 0;
  if (!categories || typeof categories !== 'object') return maxId;

  Object.values(categories).forEach(category => {
    if (!category || !Array.isArray(category.players)) return;
    category.players.forEach(player => {
      const id = Number(player?.id);
      if (Number.isFinite(id) && id > maxId) {
        maxId = id;
      }
    });
  });

  return maxId;
}

function readPlayersJson(filePath) {
  console.log('[readPlayersJson] Reading from:', filePath);
  try {
    const exists = fs.existsSync(filePath);
    console.log('[readPlayersJson] File exists:', exists);
    if (!exists) {
      console.error('[readPlayersJson] ERROR: File does not exist!');
      throw new Error(`File not found: ${filePath}`);
    }
    const content = fs.readFileSync(filePath, 'utf8');
    console.log('[readPlayersJson] File size:', content.length, 'characters');
    const parsed = JSON.parse(content);
    console.log('[readPlayersJson] Parsed categories:', Object.keys(parsed));
    return normalizeCategories(parsed);
  } catch (error) {
    console.error('[readPlayersJson] ERROR:', error.message);
    throw error;
  }
}

function writePlayersJson(filePath, categories) {
  console.log('[writePlayersJson] Writing to:', filePath);
  console.log('[writePlayersJson] Categories to write:', Object.keys(categories || {}));
  try {
    const normalized = normalizeCategories(categories);
    console.log('[writePlayersJson] Normalized categories:', Object.keys(normalized));
    
    const dir = path.dirname(filePath);
    console.log('[writePlayersJson] Directory:', dir);
    
    const tempPath = path.join(dir, `${path.basename(filePath)}.tmp`);
    console.log('[writePlayersJson] Temp path:', tempPath);

    const jsonString = JSON.stringify(normalized, null, 2);
    console.log('[writePlayersJson] JSON size:', jsonString.length, 'characters');
    
    fs.writeFileSync(tempPath, `${jsonString}\n`, 'utf8');
    console.log('[writePlayersJson] Temp file written');
    
    fs.renameSync(tempPath, filePath);
    console.log('[writePlayersJson] ✓ File renamed to final path');

    return normalized;
  } catch (error) {
    console.error('[writePlayersJson] ERROR:', error.message);
    console.error('[writePlayersJson] Stack:', error.stack);
    throw error;
  }
}

function saveCategories(filePath, categories) {
  return writePlayersJson(filePath, categories);
}

function savePlayers(filePath, playersByCategory) {
  const categories = readPlayersJson(filePath);
  const normalizedPlayers = playersByCategory && typeof playersByCategory === 'object' ? playersByCategory : {};

  let nextId = getGlobalMaxPlayerId(categories) + 1;

  Object.entries(normalizedPlayers).forEach(([categoryName, players]) => {
    const category = categories[categoryName] || {
      color: getDefaultColor(categoryName),
      imagePath: getDefaultImagePath(categoryName),
      players: []
    };

    const existingIdsByName = new Map(
      category.players
        .filter(p => p && typeof p.name === 'string')
        .map(p => [p.name.trim().toLowerCase(), Number(p.id)])
    );

    const sanitized = sanitizePlayers(players);

    category.players = sanitized.map(player => {
      const normalizedName = player.name.trim().toLowerCase();
      const existingId = existingIdsByName.get(normalizedName);

      if (Number.isFinite(existingId) && existingId > 0) {
        return { id: existingId, name: player.name };
      }

      const assignedId = nextId++;
      return { id: assignedId, name: player.name };
    });

    categories[categoryName] = category;
  });

  return writePlayersJson(filePath, categories);
}

function addCategory(filePath, { categoryName, color, imagePath } = {}) {
  console.log('[addCategory] Starting...');
  console.log('[addCategory] filePath:', filePath);
  console.log('[addCategory] categoryName:', categoryName);
  console.log('[addCategory] color:', color);
  console.log('[addCategory] imagePath:', imagePath);
  
  const categories = readPlayersJson(filePath);
  console.log('[addCategory] Current categories:', Object.keys(categories));
  
  const trimmed = String(categoryName || '').trim();
  console.log('[addCategory] Trimmed name:', trimmed);

  if (!trimmed) {
    console.error('[addCategory] ERROR: Category name is empty');
    const error = new Error('Le nom de la catégorie est requis');
    error.statusCode = 400;
    throw error;
  }

  if (Object.prototype.hasOwnProperty.call(categories, trimmed)) {
    console.error('[addCategory] ERROR: Category already exists');
    const error = new Error('Cette catégorie existe déjà');
    error.statusCode = 400;
    throw error;
  }

  categories[trimmed] = {
    color: color || getDefaultColor(trimmed),
    imagePath: imagePath || getDefaultImagePath(trimmed),
    players: []
  };
  console.log('[addCategory] Category created:', trimmed);

  writePlayersJson(filePath, categories);
  console.log('[addCategory] ✓ Category saved');
  return { categoryName: trimmed };
}

function addPlayer(filePath, { category, playerName } = {}) {
  const categories = readPlayersJson(filePath);
  const categoryName = String(category || '').trim();
  const trimmedPlayer = String(playerName || '').trim();

  if (!categoryName) {
    const error = new Error('Catégorie requise');
    error.statusCode = 400;
    throw error;
  }

  if (!trimmedPlayer) {
    const error = new Error('Le nom du joueur est requis');
    error.statusCode = 400;
    throw error;
  }

  if (!categories[categoryName]) {
    const error = new Error('Catégorie non trouvée');
    error.statusCode = 404;
    throw error;
  }

  const entry = categories[categoryName];
  const exists = entry.players.some(p => String(p.name || '').trim().toLowerCase() === trimmedPlayer.toLowerCase());
  if (exists) {
    const error = new Error('Ce joueur existe déjà dans cette catégorie');
    error.statusCode = 400;
    throw error;
  }

  const nextId = getGlobalMaxPlayerId(categories) + 1;
  const newPlayer = { id: nextId, name: trimmedPlayer };
  entry.players.push(newPlayer);

  writePlayersJson(filePath, categories);
  return { category: categoryName, player: newPlayer };
}

function deleteCategory(filePath, { categoryName } = {}) {
  const categories = readPlayersJson(filePath);
  const trimmed = String(categoryName || '').trim();

  if (!trimmed) {
    const error = new Error('Le nom de la catégorie est requis');
    error.statusCode = 400;
    throw error;
  }

  if (!Object.prototype.hasOwnProperty.call(categories, trimmed)) {
    const error = new Error('Catégorie non trouvée');
    error.statusCode = 404;
    throw error;
  }

  delete categories[trimmed];
  writePlayersJson(filePath, categories);
  return { categoryName: trimmed };
}

function deletePlayer(filePath, { category, playerName } = {}) {
  const categories = readPlayersJson(filePath);
  const categoryName = String(category || '').trim();
  const trimmedPlayer = String(playerName || '').trim();

  if (!categoryName) {
    const error = new Error('Catégorie requise');
    error.statusCode = 400;
    throw error;
  }

  if (!trimmedPlayer) {
    const error = new Error('Le nom du joueur est requis');
    error.statusCode = 400;
    throw error;
  }

  const entry = categories[categoryName];
  if (!entry) {
    const error = new Error('Catégorie non trouvée');
    error.statusCode = 404;
    throw error;
  }

  const index = entry.players.findIndex(p => String(p.name || '').trim().toLowerCase() === trimmedPlayer.toLowerCase());

  if (index === -1) {
    const error = new Error('Joueur non trouvé');
    error.statusCode = 404;
    throw error;
  }

  const removed = entry.players.splice(index, 1)[0];
  writePlayersJson(filePath, categories);
  return { category: categoryName, playerName: removed.name };
}

module.exports = {
  normalizeCategories,
  readPlayersJson,
  writePlayersJson,
  saveCategories,
  savePlayers,
  addCategory,
  addPlayer,
  deleteCategory,
  deletePlayer
};
