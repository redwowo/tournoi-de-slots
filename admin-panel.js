
// ============ PANEL INITIALIZATION ============

function debounce(fn, delay = 150) {
  let timer;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => fn(...args), delay);
  };
}

function getNormalizedSearchValue(inputId) {
  return (document.getElementById(inputId)?.value || '').trim().toLowerCase();
}

function isAdminPageVisible(pageName) {
  const pageElement = document.getElementById(`${pageName}Page`);
  return !!pageElement && pageElement.style.display !== 'none';
}

function refreshSlotAdminViews() {
  if (isAdminPageVisible('players')) {
    renderPlayers(1);
  }
  if (isAdminPageVisible('categories')) {
    renderCategories();
  }
}

const ADMIN_SLOTS_SORT_STORAGE_KEY = 'adminSlotsSort';
const DEFAULT_ADMIN_SLOTS_SORT = 'name_asc';
const slotNameCollator = new Intl.Collator('fr', { sensitivity: 'base', numeric: true });

let slotPopularityCache = {
  key: null,
  map: new Map()
};

function normalizeSlotName(value) {
  return (value || '').trim().toLowerCase();
}

function getAdminSlotsSortOrder() {
  const stored = localStorage.getItem(ADMIN_SLOTS_SORT_STORAGE_KEY);
  if (stored) return stored;

  const selectValue = document.getElementById('playersSort')?.value
    || document.getElementById('categoriesSort')?.value;

  return selectValue || DEFAULT_ADMIN_SLOTS_SORT;
}

function setAdminSlotsSortOrder(sortOrder) {
  const nextValue = sortOrder || DEFAULT_ADMIN_SLOTS_SORT;
  localStorage.setItem(ADMIN_SLOTS_SORT_STORAGE_KEY, nextValue);

  ['playersSort', 'categoriesSort'].forEach(selectId => {
    const select = document.getElementById(selectId);
    if (select && select.value !== nextValue) {
      select.value = nextValue;
    }
  });
}

function getSlotPopularityMap() {
  const tournaments = adminManager?.tournaments || [];
  const cacheKey = Array.isArray(tournaments) ? tournaments.length : 0;

  if (slotPopularityCache.key === cacheKey) {
    return slotPopularityCache.map;
  }

  const map = new Map();

  tournaments.forEach(tournament => {
    const players = tournament?.state?.players;
    if (!Array.isArray(players)) return;

    players.forEach(entry => {
      const name = typeof entry === 'string' ? entry : entry?.name;
      const key = normalizeSlotName(name);
      if (!key) return;
      map.set(key, (map.get(key) || 0) + 1);
    });
  });

  slotPopularityCache = { key: cacheKey, map };
  return map;
}

function compareSlotEntries(a, b, sortOrder, popularityMap) {
  const nameA = normalizeSlotName(a?.name);
  const nameB = normalizeSlotName(b?.name);
  const idA = Number.isFinite(Number(a?.id)) ? Number(a.id) : 0;
  const idB = Number.isFinite(Number(b?.id)) ? Number(b.id) : 0;

  const nameCompare = slotNameCollator.compare(nameA, nameB);

  switch (sortOrder) {
    case 'name_desc':
      return -nameCompare;
    case 'id_asc': {
      const diff = idA - idB;
      return diff !== 0 ? diff : nameCompare;
    }
    case 'id_desc': {
      const diff = idB - idA;
      return diff !== 0 ? diff : nameCompare;
    }
    case 'popularity_desc': {
      const countA = popularityMap?.get(nameA) || 0;
      const countB = popularityMap?.get(nameB) || 0;
      if (countA !== countB) {
        return countB - countA;
      }
      if (idA !== idB) {
        return idA - idB;
      }
      return nameCompare;
    }
    case 'name_asc':
    default:
      return nameCompare;
  }
}

function sortSlotPlayers(players, sortOrder) {
  const list = Array.isArray(players) ? [...players] : [];
  if (list.length <= 1) return list;

  const order = sortOrder || DEFAULT_ADMIN_SLOTS_SORT;
  const popularityMap = order === 'popularity_desc' ? getSlotPopularityMap() : null;

  return list.sort((a, b) => compareSlotEntries(a, b, order, popularityMap));
}

let slotSearchControlsInitialized = false;

function ensureSlotSearchControlsInitialized() {
  if (slotSearchControlsInitialized) return;
  slotSearchControlsInitialized = true;

  const playersSearch = document.getElementById('playersSearch');
  if (playersSearch) {
    playersSearch.addEventListener('input', debounce(() => renderPlayers(1), 120));
  }

  const sortSelectIds = ['playersSort', 'categoriesSort'];
  const storedSort = localStorage.getItem(ADMIN_SLOTS_SORT_STORAGE_KEY) || '';

  const referenceSelect = document.getElementById('playersSort') || document.getElementById('categoriesSort');
  let initialSort = storedSort || referenceSelect?.value || DEFAULT_ADMIN_SLOTS_SORT;

  if (referenceSelect && !Array.from(referenceSelect.options).some(option => option.value === initialSort)) {
    initialSort = DEFAULT_ADMIN_SLOTS_SORT;
  }

  setAdminSlotsSortOrder(initialSort);

  sortSelectIds.forEach(selectId => {
    const select = document.getElementById(selectId);
    if (!select) return;

    if (select.value !== initialSort) {
      select.value = initialSort;
    }

    select.addEventListener('change', () => {
      setAdminSlotsSortOrder(select.value);
      refreshSlotAdminViews();
    });
  });

  const categoriesSearch = document.getElementById('categoriesSearch');
  if (categoriesSearch) {
    categoriesSearch.addEventListener('input', debounce(() => renderCategories(), 120));
  }

  window.addEventListener('storage', (event) => {
    if (event.key === 'adminPlayersLastUpdate') {
      if (isAdminPageVisible('players')) {
        renderPlayers(1);
      }
      return;
    }

    if (event.key === ADMIN_SLOTS_SORT_STORAGE_KEY) {
      setAdminSlotsSortOrder(event.newValue);
      refreshSlotAdminViews();
    }
  });

  window.addEventListener('adminPlayersUpdated', () => {
    if (isAdminPageVisible('players')) {
      renderPlayers(1);
    }
  });
}

function createSlotAccordionElement({ categoryName, categoryColor, player, showCategoryInSummary = false } = {}) {
  const slotDetails = document.createElement('details');
  slotDetails.className = 'admin-accordion admin-slot-accordion';

  const summary = document.createElement('summary');

  const left = document.createElement('div');
  left.className = 'admin-accordion-title-group';

  const title = document.createElement('div');
  title.className = 'admin-accordion-title';
  title.textContent = player?.name || '';
  left.appendChild(title);

  if (showCategoryInSummary) {
    const categoryBadge = document.createElement('span');
    categoryBadge.className = 'admin-accordion-badge';
    categoryBadge.textContent = categoryName;
    if (categoryColor) {
      categoryBadge.style.backgroundColor = `${categoryColor}20`;
      categoryBadge.style.color = categoryColor;
    }
    left.appendChild(categoryBadge);
  }

  const chevron = document.createElement('span');
  chevron.className = 'admin-accordion-chevron';
  chevron.textContent = '▸';

  summary.appendChild(left);
  summary.appendChild(chevron);
  slotDetails.appendChild(summary);

  const content = document.createElement('div');
  content.className = 'admin-accordion-content';

  const layout = document.createElement('div');
  layout.style.display = 'flex';
  layout.style.justifyContent = 'space-between';
  layout.style.alignItems = 'flex-start';
  layout.style.gap = '12px';
  layout.style.flexWrap = 'wrap';

  const info = document.createElement('div');
  info.style.display = 'flex';
  info.style.flexDirection = 'column';
  info.style.gap = '6px';

  const categoryLine = document.createElement('div');
  const categoryLabel = document.createElement('span');
  categoryLabel.style.color = 'var(--text-secondary)';
  categoryLabel.textContent = 'Catégorie: ';
  const categoryValue = document.createElement('strong');
  categoryValue.textContent = categoryName;
  categoryLine.appendChild(categoryLabel);
  categoryLine.appendChild(categoryValue);

  const idLine = document.createElement('div');
  const idLabel = document.createElement('span');
  idLabel.style.color = 'var(--text-secondary)';
  idLabel.textContent = 'ID: ';
  const idValue = document.createElement('code');
  idValue.textContent = String(player?.id ?? '');
  idValue.style.fontFamily = 'monospace';
  idValue.style.padding = '2px 6px';
  idValue.style.background = 'var(--hover-bg)';
  idValue.style.borderRadius = '4px';
  idLine.appendChild(idLabel);
  idLine.appendChild(idValue);

  info.appendChild(categoryLine);
  info.appendChild(idLine);

  const actions = document.createElement('div');
  actions.className = 'admin-btn-group';

  const editBtn = document.createElement('button');
  editBtn.className = 'admin-btn admin-btn-secondary admin-btn-sm';
  editBtn.textContent = '✏️ Éditer';
  editBtn.addEventListener('click', () => showEditPlayerModal(categoryName, player));

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'admin-btn admin-btn-danger admin-btn-sm';
  deleteBtn.textContent = '🗑️ Supprimer';
  deleteBtn.addEventListener('click', () => confirmDeletePlayer(categoryName, player.firestoreId || player.id, player.name));

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  layout.appendChild(info);
  layout.appendChild(actions);

  content.appendChild(layout);
  slotDetails.appendChild(content);

  return slotDetails;
}

function initializeAdminPanel() {
  ensureSlotSearchControlsInitialized();

  // Attach event listeners to navigation items
  const navItems = document.querySelectorAll('.admin-nav-item');
  
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const page = item.getAttribute('data-page');
      navigateToPage(page);
    });
  });

  // Initialize first page (dashboard)
  navigateToPage('dashboard');
  
  // Initialize managers
  if (adminManager && adminManager.init) {
    adminManager.init()
      .then(() => {
        slotPopularityCache.key = null;

        updateDashboard();

        if (getAdminSlotsSortOrder() === 'popularity_desc') {
          refreshSlotAdminViews();
        }
      })
      .catch(err => console.error('Error initializing admin manager:', err));
  }
  if (adminBonusHuntManager && adminBonusHuntManager.init) {
    adminBonusHuntManager.init().catch(err => console.error('Error initializing bonus hunt manager:', err));
  }
  if (adminPlayersManager && adminPlayersManager.init) {
    adminPlayersManager.init().catch(err => console.error('Error initializing players manager:', err));
  }
  
  // Update dashboard on initialization
  updateDashboard();
  
  // Setup session timer
  setupSessionTimer();
}

function navigateToPage(pageName) {
  // Hide all pages
  const pages = document.querySelectorAll('.admin-page');
  pages.forEach(page => {
    page.style.display = 'none';
  });
  
  // Remove active class from all nav items
  const navItems = document.querySelectorAll('.admin-nav-item');
  navItems.forEach(item => {
    item.classList.remove('active');
  });
  
  // Show selected page
  const pageElement = document.getElementById(pageName + 'Page');
  if (pageElement) {
    pageElement.style.display = 'block';
  }
  
  // Add active class to clicked nav item
  const activeNavItem = document.querySelector(`[data-page="${pageName}"]`);
  if (activeNavItem) {
    activeNavItem.classList.add('active');
  }
  
  // Update page title
  const titles = {
    'dashboard': 'Dashboard',
    'tournaments': 'Tous les Tournois',
    'bonusHunts': 'Bonus Hunts',
    'categories': 'Catégories',
    'players': 'Joueurs',
    'purge': 'Purge',
    'history': 'Historique'
  };
  
  const pageTitle = document.getElementById('pageTitle');
  if (pageTitle) {
    pageTitle.textContent = titles[pageName] || 'Dashboard';
  }
  
  // Call page-specific initialization
  switch(pageName) {
    case 'tournaments':
      showTournaments();
      break;
    case 'bonusHunts':
      showBonusHunts();
      break;
    case 'categories':
      showCategories();
      break;
    case 'players':
      showPlayers();
      break;
    case 'purge':
      showPurge();
      break;
    case 'history':
      showHistory();
      break;
    case 'dashboard':
    default:
      showDashboard();
      break;
  }
}

function updateDashboard() {
  // Update stats
  const totalTournaments = adminManager.tournaments.length;
  document.getElementById('statTotalTournaments').textContent = totalTournaments;
  
  const totalPlayers = adminManager.tournaments.reduce((sum, t) => sum + t.playersCount, 0);
  document.getElementById('statTotalPlayers').textContent = totalPlayers;
  
  const totalMatches = adminManager.tournaments.reduce((sum, t) => sum + t.matchesCount, 0);
  document.getElementById('statTotalMatches').textContent = totalMatches;
  
  const completedTournaments = adminManager.tournaments.filter(t => t.status === 'Terminé').length;
  document.getElementById('statCompletedTournaments').textContent = completedTournaments;
  
  const activeTournaments = adminManager.tournaments.filter(t => t.status === 'En cours').length;
  document.getElementById('statActiveTournaments').textContent = activeTournaments;
  
  const pendingTournaments = adminManager.tournaments.filter(t => t.status === 'En attente').length;
  document.getElementById('statPendingTournaments').textContent = pendingTournaments;
}

function setupSessionTimer() {
  const timerElement = document.getElementById('sessionTimer');
  
  setInterval(() => {
    const remaining = adminAuthManager.getSessionRemainingTime();
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    
    if (timerElement) {
      if (remaining > 0) {
        timerElement.textContent = `Session: ${minutes}m ${seconds}s`;
        timerElement.style.color = 'var(--text-primary)';
      } else {
        timerElement.textContent = 'Session expirée';
        timerElement.style.color = 'var(--error-color)';
      }
    }
  }, 1000);
}

// ============ PAGE DISPLAY FUNCTIONS ============

function showDashboard() {
  updateDashboard();
}

function showTournaments() {
  // This will be implemented by admin-manager.js
  if (window.renderTournaments) {
    renderTournaments(1);
  }
}

function showCategories() {
  // This will be implemented by admin-manager.js
  if (window.renderCategories) {
    renderCategories();
  }
}

function showPlayers() {
  // This will be implemented by admin-players-manager.js
  if (window.renderPlayers) {
    renderPlayers(1);
  }
}

function showPurge() {
  // This will be implemented by admin-manager.js
  if (window.renderPurgeInfo) {
    renderPurgeInfo();
  }
}

function showHistory() {
  // This will be implemented by admin-manager.js
  if (window.renderHistory) {
    renderHistory(1);
  }
}

// ============ TOURNAMENTS MANAGEMENT ============

function toggleSelectAll() {
  const checkbox = document.getElementById('selectAllCheckbox');
  adminManager.selectAllTournaments(checkbox.checked);
  renderTournaments(1);
}

function renderTournaments(page = 1) {
  const search = document.getElementById('tournamentSearch')?.value || '';
  const status = document.getElementById('statusFilter')?.value || '';

  const filtered = adminManager.filterTournaments({
    search: search,
    status: status || undefined
  });

  const start = (page - 1) * adminManager.itemsPerPage;
  const end = start + adminManager.itemsPerPage;
  const paginated = filtered.slice(start, end);

  const tbody = document.getElementById('tournamentsTableBody');
  tbody.innerHTML = '';

  if (paginated.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 40px;">Aucun tournoi trouvé</td></tr>';
    document.getElementById('tournamentsPagination').innerHTML = '';
    adminManager.updateBulkActionsUI();
    return;
  }

  paginated.forEach(tournament => {
    const row = document.createElement('tr');
    const isSelected = adminManager.selectedTournaments.has(tournament.id);
    if (isSelected) {
      row.classList.add('selected');
    }

    row.innerHTML = `
      <td>
        <input type="checkbox" 
               class="admin-checkbox" 
               ${isSelected ? 'checked' : ''} 
               onchange="toggleTournamentSelection('${tournament.id}'); renderTournaments(${page})">
      </td>
      <td><strong>${escapeHtml(tournament.name)}</strong></td>
      <td>${tournament.creator}</td>
      <td>${tournament.createdAt.toLocaleDateString('fr-FR')}</td>
      <td>
        <span style="
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          background: ${getStatusColor(tournament.status)}20;
          color: ${getStatusColor(tournament.status)};
          font-size: 0.85rem;
          font-weight: 500;
        ">${tournament.status}</span>
      </td>
      <td>${tournament.playersCount}</td>
      <td>
        <div class="admin-btn-group">
          <button class="admin-btn admin-btn-secondary" onclick="viewTournamentDetail('${tournament.id}')">
            👁️ Voir
          </button>
          <button class="admin-btn admin-btn-primary" onclick="editTournament('${tournament.id}')">
            ✏️ Éditer
          </button>
          <button class="admin-btn admin-btn-danger" onclick="confirmDeleteTournament('${tournament.id}', '${escapeHtml(tournament.name)}')">
            🗑️
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });

  renderPagination('tournamentsPagination', filtered.length, page, (p) => renderTournaments(p));
  adminManager.updateBulkActionsUI();
}

function toggleTournamentSelection(tournamentId) {
  adminManager.toggleTournamentSelection(tournamentId);
}

function viewTournamentDetail(tournamentId) {
  const tournament = adminManager.tournaments.find(t => t.id === tournamentId);
  if (!tournament) return;

  const modal = document.getElementById('tournamentDetailModal');
  if (!modal) return;

  const detailBody = document.getElementById('detailModalBody');
  if (detailBody) {
    detailBody.innerHTML = `
      <div class="admin-form-group">
        <label class="admin-form-label">Nom du Tournoi</label>
        <p style="margin: 0; font-weight: 500;">${escapeHtml(tournament.name)}</p>
      </div>
      <div class="admin-form-group">
        <label class="admin-form-label">Créateur</label>
        <p style="margin: 0; font-weight: 500;">${escapeHtml(tournament.creator)}</p>
      </div>
      <div class="admin-form-group">
        <label class="admin-form-label">Date de création</label>
        <p style="margin: 0; font-weight: 500;">${tournament.createdAt.toLocaleDateString('fr-FR')}</p>
      </div>
      <div class="admin-form-group">
        <label class="admin-form-label">Statut</label>
        <p style="margin: 0; font-weight: 500;">${escapeHtml(tournament.status)}</p>
      </div>
      <div class="admin-form-group">
        <label class="admin-form-label">Nombre de Joueurs</label>
        <p style="margin: 0; font-weight: 500;">${tournament.playersCount}</p>
      </div>
      <div class="admin-form-group">
        <label class="admin-form-label">Nombre de Matchs</label>
        <p style="margin: 0; font-weight: 500;">${tournament.matchesCount}</p>
      </div>
    `;
  }

  modal.style.display = 'flex';
  window.currentTournamentId = tournamentId;
}

function closeTournamentDetail() {
  const modal = document.getElementById('tournamentDetailModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function editTournament(tournamentId) {
  const tournament = adminManager.tournaments.find(t => t.id === tournamentId);
  if (!tournament) return;

  const modal = document.getElementById('editTournamentModal');
  if (!modal) return;

  document.getElementById('editTournamentName').value = tournament.name;
  modal.style.display = 'flex';
  window.currentTournamentId = tournamentId;
}

function closeEditTournament() {
  const modal = document.getElementById('editTournamentModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function saveEditedTournament() {
  const newName = document.getElementById('editTournamentName')?.value || '';
  if (!newName.trim()) {
    showAdminToast('Erreur', 'Le nom du tournoi ne peut pas être vide', 'error');
    return;
  }

  const tournamentId = window.currentTournamentId;
  const tournament = adminManager.tournaments.find(t => t.id === tournamentId);
  if (!tournament) return;

  tournament.name = newName;
  adminManager.updateTournament(tournamentId, { 'state.name': newName })
    .then(() => {
      closeEditTournament();
      renderTournaments(1);
      showAdminToast('Succès', 'Tournoi modifié avec succès', 'success');
    })
    .catch(err => {
      console.error('Error updating tournament:', err);
      showAdminToast('Erreur', 'Impossible de modifier le tournoi', 'error');
    });
}

function deleteTournamentFromDetail() {
  const tournamentId = window.currentTournamentId;
  const tournament = adminManager.tournaments.find(t => t.id === tournamentId);
  if (!tournament) return;

  if (confirm(`Êtes-vous sûr de vouloir supprimer le tournoi "${tournament.name}" ?`)) {
    confirmDeleteTournament(tournamentId, tournament.name);
  }
}

function confirmDeleteTournament(tournamentId, tournamentName) {
  if (confirm(`Supprimer le tournoi "${tournamentName}" ?`)) {
    adminManager.deleteTournament(tournamentId)
      .then(() => {
        closeTournamentDetail();
        renderTournaments(1);
        showAdminToast('Succès', 'Tournoi supprimé avec succès', 'success');
      })
      .catch(err => {
        console.error('Error deleting tournament:', err);
        showAdminToast('Erreur', 'Impossible de supprimer le tournoi', 'error');
      });
  }
}

function confirmDeleteSelected() {
  if (adminManager.selectedTournaments.size === 0) {
    showAdminToast('Erreur', 'Aucun tournoi sélectionné', 'error');
    return;
  }

  const count = adminManager.selectedTournaments.size;
  if (confirm(`Êtes-vous sûr de vouloir supprimer ${count} tournoi(s) ?`)) {
    adminManager.deleteSelectedTournaments()
      .then(() => {
        renderTournaments(1);
        showAdminToast('Succès', `${count} tournoi(s) supprimé(s)`, 'success');
      })
      .catch(err => {
        console.error('Error deleting tournaments:', err);
        showAdminToast('Erreur', 'Erreur lors de la suppression', 'error');
      });
  }
}

function getStatusColor(status) {
  const colors = {
    'En attente': '#a0a0a0',
    'En cours': '#3b82f6',
    'Terminé': '#10b981'
  };
  return colors[status] || '#a0a0a0';
}

// ============ CATEGORIES MANAGEMENT ============

let categoryControlsInitialized = false;
let pendingAddCategoryImageFile = null;
let pendingEditCategoryImageFile = null;
let pendingEditCategoryImageClear = false;
let currentEditingCategoryName = null;

function getCategoryInitials(categoryName) {
  return categoryName
    .split(' ')
    .filter(Boolean)
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function setCategoryImagePreview(previewEl, { imagePath, file, color, categoryName } = {}) {
  if (!previewEl) return;

  const effectiveColor = color || '#4b5563';
  previewEl.innerHTML = '';

  if (file) {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.alt = categoryName || 'category image';
    previewEl.appendChild(img);
    previewEl.classList.add('has-image');
    return;
  }

  if (imagePath) {
    const img = document.createElement('img');
    img.src = imagePath;
    img.alt = categoryName || 'category image';
    previewEl.appendChild(img);
    previewEl.classList.add('has-image');
    return;
  }

  previewEl.classList.remove('has-image');
  const placeholder = document.createElement('div');
  placeholder.className = 'admin-image-placeholder';

  if (categoryName) {
    const initials = document.createElement('span');
    initials.className = 'admin-placeholder-text';
    initials.textContent = getCategoryInitials(categoryName);
    initials.style.color = effectiveColor;
    placeholder.appendChild(initials);
  } else {
    const icon = document.createElement('span');
    icon.className = 'admin-placeholder-text';
    icon.textContent = '📸';
    placeholder.appendChild(icon);
  }

  previewEl.appendChild(placeholder);
}

function ensureCategoryControlsInitialized() {
  if (categoryControlsInitialized) return;
  categoryControlsInitialized = true;

  const addColorInput = document.getElementById('categoryColorInput');
  const addColorLabel = document.getElementById('categoryColorLabel');
  if (addColorInput && addColorLabel) {
    addColorLabel.textContent = addColorInput.value;
    addColorInput.addEventListener('input', () => {
      addColorLabel.textContent = addColorInput.value;
    });
  }

  const editColorInput = document.getElementById('editCategoryColorInput');
  const editColorLabel = document.getElementById('editCategoryColorLabel');
  if (editColorInput && editColorLabel) {
    editColorLabel.textContent = editColorInput.value;
    editColorInput.addEventListener('input', () => {
      editColorLabel.textContent = editColorInput.value;
    });
  }

  const addImageInput = document.getElementById('categoryImageInput');
  if (addImageInput) {
    addImageInput.addEventListener('change', () => {
      const file = addImageInput.files?.[0] || null;
      pendingAddCategoryImageFile = file;

      const preview = document.getElementById('addCategoryImagePreview');
      const clearBtn = document.getElementById('addCategoryImageClearBtn');
      const status = document.getElementById('addCategoryUploadStatus');

      if (status) status.textContent = '';
      if (clearBtn) clearBtn.style.display = file ? 'inline-flex' : 'none';

      setCategoryImagePreview(preview, {
        file,
        color: document.getElementById('categoryColorInput')?.value,
        categoryName: document.getElementById('categoryNameInput')?.value || ''
      });
    });
  }

  const editImageInput = document.getElementById('editCategoryImageInput');
  if (editImageInput) {
    editImageInput.addEventListener('change', () => {
      const file = editImageInput.files?.[0] || null;
      pendingEditCategoryImageFile = file;
      pendingEditCategoryImageClear = false;

      const preview = document.getElementById('editCategoryImagePreview');
      const clearBtn = document.getElementById('editCategoryImageClearBtn');
      const status = document.getElementById('editCategoryUploadStatus');

      if (status) status.textContent = '';
      if (clearBtn) clearBtn.style.display = (file || preview?.classList.contains('has-image')) ? 'inline-flex' : 'none';

      setCategoryImagePreview(preview, {
        file,
        color: document.getElementById('editCategoryColorInput')?.value,
        categoryName: currentEditingCategoryName || ''
      });
    });
  }

  window.addEventListener('adminPlayersUpdated', () => {
    const categoriesPage = document.getElementById('categoriesPage');
    if (!categoriesPage) return;

    const isVisible = categoriesPage.style.display !== 'none';
    if (isVisible) {
      renderCategories();
    }
  });

  window.addEventListener('storage', (event) => {
    if (event.key === 'adminPlayersLastUpdate') {
      const categoriesPage = document.getElementById('categoriesPage');
      if (!categoriesPage) return;

      const isVisible = categoriesPage.style.display !== 'none';
      if (isVisible) {
        renderCategories();
      }
    }
  });
}

async function uploadCategoryImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch('/api/upload-category-image', {
    method: 'POST',
    body: formData
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.success) {
    throw new Error(data?.error || `Erreur upload (HTTP ${response.status})`);
  }

  return data.filepath;
}

async function deleteCategoryImage(filepath) {
  if (!filepath || !filepath.startsWith('/category-images/')) return;

  try {
    await fetch('/api/delete-category-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filepath })
    });
  } catch (error) {
    console.warn('Unable to delete category image:', error);
  }
}

async function renderCategories() {
  ensureCategoryControlsInitialized();

  const categoriesContainer = document.getElementById('categoriesListContainer');
  const resultsContainer = document.getElementById('categoriesSearchResults');
  if (!categoriesContainer) return;

  const searchQuery = getNormalizedSearchValue('categoriesSearch');
  const sortOrder = getAdminSlotsSortOrder();

  categoriesContainer.innerHTML = `
    <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
      Chargement des catégories...
    </div>
  `;

  if (resultsContainer) {
    resultsContainer.innerHTML = '';
    resultsContainer.style.display = searchQuery ? 'block' : 'none';

    if (searchQuery) {
      const loading = document.createElement('div');
      loading.className = 'admin-search-results-empty';
      loading.textContent = 'Recherche...';
      resultsContainer.appendChild(loading);
    }
  }

  try {
    if (adminPlayersManager?.init) {
      await adminPlayersManager.init();
    }

    const categoryNames = adminPlayersManager?.getCategories ? adminPlayersManager.getCategories() : [];

    if (!categoryNames || categoryNames.length === 0) {
      categoriesContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
          Aucune catégorie.
        </div>
      `;
      if (resultsContainer) {
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none';
      }
      return;
    }

    const matchingPlayersByCategory = new Map();

    if (searchQuery) {
      categoryNames.forEach(categoryName => {
        const players = adminPlayersManager.getPlayersInCategory(categoryName);
        const matches = players.filter(player => (player?.name || '').toLowerCase().includes(searchQuery));
        if (matches.length > 0) {
          matchingPlayersByCategory.set(categoryName, matches);
        }
      });

      if (resultsContainer) {
        resultsContainer.innerHTML = '';

        const title = document.createElement('h3');
        title.className = 'admin-search-results-title';

        const totalMatches = Array.from(matchingPlayersByCategory.values()).reduce((sum, players) => sum + players.length, 0);
        title.textContent = `Machines trouvées (${totalMatches})`;
        resultsContainer.appendChild(title);

        if (totalMatches === 0) {
          const empty = document.createElement('div');
          empty.className = 'admin-search-results-empty';
          empty.textContent = 'Aucune machine à sous trouvée.';
          resultsContainer.appendChild(empty);
        } else {
          const list = document.createElement('div');
          list.className = 'admin-accordion-list';

          const matchedSlots = [];

          categoryNames.forEach(categoryName => {
            const matches = matchingPlayersByCategory.get(categoryName);
            if (!matches || matches.length === 0) return;

            const metadata = adminPlayersManager.getCategoryMetadata(categoryName);
            const color = metadata.color || '#4b5563';

            matches.forEach(player => {
              matchedSlots.push({
                categoryName,
                categoryColor: color,
                player
              });
            });
          });

          const popularityMap = sortOrder === 'popularity_desc' ? getSlotPopularityMap() : null;
          matchedSlots.sort((a, b) => compareSlotEntries(a.player, b.player, sortOrder, popularityMap));

          matchedSlots.forEach(({ categoryName, categoryColor, player }) => {
            list.appendChild(createSlotAccordionElement({
              categoryName,
              categoryColor,
              player,
              showCategoryInSummary: true
            }));
          });

          resultsContainer.appendChild(list);
        }

        resultsContainer.style.display = 'block';
      }
    }

    const filteredCategoryNames = searchQuery
      ? categoryNames.filter(categoryName => {
          return categoryName.toLowerCase().includes(searchQuery) || matchingPlayersByCategory.has(categoryName);
        })
      : categoryNames;

    if (filteredCategoryNames.length === 0) {
      categoriesContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
          Aucune catégorie trouvée.
        </div>
      `;
      return;
    }

    const grid = document.createElement('div');
    grid.className = 'admin-categories-grid';

    filteredCategoryNames.forEach(categoryName => {
      const metadata = adminPlayersManager.getCategoryMetadata(categoryName);
      const playersCount = adminPlayersManager.getPlayersInCategory(categoryName).length;
      const color = metadata.color || '#4b5563';
      const imagePath = metadata.imagePath || '';

      const card = document.createElement('div');
      card.className = 'admin-category-card-with-branding';

      const stripe = document.createElement('div');
      stripe.className = 'admin-category-color-stripe';
      stripe.style.background = color;

      const imageContainer = document.createElement('div');
      imageContainer.className = 'admin-category-image-container';
      if (imagePath) {
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = categoryName;
        imageContainer.appendChild(img);
      } else {
        const initials = document.createElement('div');
        initials.className = 'admin-category-initials';
        initials.textContent = getCategoryInitials(categoryName);
        initials.style.color = color;
        imageContainer.appendChild(initials);
      }

      const content = document.createElement('div');
      content.className = 'admin-category-card-content';

      const header = document.createElement('div');
      header.className = 'admin-category-card-header-text';

      const title = document.createElement('h3');
      title.className = 'admin-category-card-title';
      title.textContent = categoryName;

      const badge = document.createElement('span');
      badge.className = 'admin-category-card-badge';
      badge.textContent = `${playersCount} slot(s)`;
      badge.style.background = `${color}20`;
      badge.style.color = color;

      header.appendChild(title);
      header.appendChild(badge);

      const actions = document.createElement('div');
      actions.className = 'admin-category-card-actions';

      const editBtn = document.createElement('button');
      editBtn.className = 'admin-btn admin-btn-secondary admin-btn-sm';
      editBtn.textContent = '✏️ Éditer';
      editBtn.addEventListener('click', () => showEditCategoryModal(categoryName));

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'admin-btn admin-btn-danger admin-btn-sm';
      deleteBtn.textContent = '🗑️ Supprimer';
      deleteBtn.addEventListener('click', () => confirmDeleteCategory(categoryName));

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      content.appendChild(header);
      content.appendChild(actions);

      card.appendChild(stripe);
      card.appendChild(imageContainer);
      card.appendChild(content);

      grid.appendChild(card);
    });

    categoriesContainer.innerHTML = '';
    categoriesContainer.appendChild(grid);
  } catch (error) {
    console.error('Error rendering categories:', error);
    categoriesContainer.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--error-color, #ef4444);">
        Impossible de charger les catégories.
      </div>
    `;
    if (resultsContainer) {
      resultsContainer.innerHTML = '';
      resultsContainer.style.display = 'none';
    }
  }
}

function showAddCategoryModal() {
  ensureCategoryControlsInitialized();

  pendingAddCategoryImageFile = null;

  const nameInput = document.getElementById('categoryNameInput');
  const colorInput = document.getElementById('categoryColorInput');
  const errorEl = document.getElementById('addCategoryError');
  const uploadStatus = document.getElementById('addCategoryUploadStatus');

  if (nameInput) nameInput.value = '';
  if (colorInput) {
    colorInput.value = '#667eea';
    const label = document.getElementById('categoryColorLabel');
    if (label) label.textContent = colorInput.value;
  }
  if (errorEl) errorEl.textContent = '';
  if (uploadStatus) uploadStatus.textContent = '';

  clearCategoryImage();

  const modal = document.getElementById('addCategoryModal');
  if (modal) {
    modal.style.display = 'flex';
  }
}

function closeAddCategoryModal() {
  const modal = document.getElementById('addCategoryModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

async function saveNewCategory() {
  ensureCategoryControlsInitialized();

  const submitBtn = document.getElementById('addCategorySubmitBtn');
  const nameInput = document.getElementById('categoryNameInput');
  const colorInput = document.getElementById('categoryColorInput');
  const errorEl = document.getElementById('addCategoryError');
  const uploadStatus = document.getElementById('addCategoryUploadStatus');

  const name = nameInput?.value?.trim() || '';
  const color = colorInput?.value || '#667eea';

  if (errorEl) errorEl.textContent = '';
  if (uploadStatus) uploadStatus.textContent = '';

  if (!name) {
    if (errorEl) errorEl.textContent = 'Le nom de la catégorie est requis.';
    return;
  }

  try {
    submitBtn && (submitBtn.disabled = true);

    if (adminPlayersManager?.init) {
      await adminPlayersManager.init();
    }

    let imagePath;
    if (pendingAddCategoryImageFile) {
      if (uploadStatus) {
        uploadStatus.textContent = 'Upload en cours...';
        uploadStatus.className = 'admin-upload-status loading';
      }
      imagePath = await uploadCategoryImage(pendingAddCategoryImageFile);
    }

    const apiResult = await adminPlayersManager.addCategoryToServer(name, { color, imagePath });

    if (!apiResult.success) {
      if (imagePath) {
        await deleteCategoryImage(imagePath);
      }
      if (errorEl) errorEl.textContent = apiResult.error || 'Erreur lors de la sauvegarde serveur.';
      return;
    }

    const result = await adminPlayersManager.addCategory(name, { color, imagePath });

    if (!result.success) {
      if (errorEl) errorEl.textContent = result.error || 'Erreur lors de la création.';
      return;
    }

    closeAddCategoryModal();
    renderCategories();
    showAdminToast('Succès', `Catégorie "${name}" ajoutée`, 'success');
  } catch (error) {
    console.error('Error saving new category:', error);
    if (errorEl) errorEl.textContent = error.message || 'Erreur lors de la création.';
  } finally {
    submitBtn && (submitBtn.disabled = false);
    if (uploadStatus) {
      uploadStatus.className = 'admin-upload-status';
    }
  }
}

function showEditCategoryModal(categoryName) {
  ensureCategoryControlsInitialized();

  currentEditingCategoryName = categoryName;
  pendingEditCategoryImageFile = null;
  pendingEditCategoryImageClear = false;

  const metadata = adminPlayersManager.getCategoryMetadata(categoryName);

  const nameDisplay = document.getElementById('editCategoryNameDisplay');
  if (nameDisplay) nameDisplay.textContent = categoryName;

  const colorInput = document.getElementById('editCategoryColorInput');
  const colorLabel = document.getElementById('editCategoryColorLabel');
  if (colorInput) colorInput.value = metadata.color || '#667eea';
  if (colorLabel) colorLabel.textContent = colorInput?.value || '#667eea';

  const preview = document.getElementById('editCategoryImagePreview');
  const clearBtn = document.getElementById('editCategoryImageClearBtn');
  const status = document.getElementById('editCategoryUploadStatus');

  if (status) status.textContent = '';

  setCategoryImagePreview(preview, {
    imagePath: metadata.imagePath,
    color: metadata.color,
    categoryName
  });

  if (clearBtn) {
    clearBtn.style.display = metadata.imagePath ? 'inline-flex' : 'none';
  }

  const input = document.getElementById('editCategoryImageInput');
  if (input) input.value = '';

  const modal = document.getElementById('editCategoryModal');
  if (modal) {
    modal.style.display = 'flex';
  }
}

function closeEditCategoryModal() {
  const modal = document.getElementById('editCategoryModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

async function saveEditedCategory() {
  ensureCategoryControlsInitialized();

  const categoryName = currentEditingCategoryName;
  if (!categoryName) return;

  const submitBtn = document.getElementById('editCategorySubmitBtn');
  const colorInput = document.getElementById('editCategoryColorInput');
  const uploadStatus = document.getElementById('editCategoryUploadStatus');

  const newColor = colorInput?.value || '#667eea';

  try {
    submitBtn && (submitBtn.disabled = true);

    const previousMetadata = adminPlayersManager.getCategoryMetadata(categoryName);
    const previousImagePath = previousMetadata.imagePath || '';
    const previousColor = previousMetadata.color || '#667eea';

    const updates = { color: newColor };

    if (pendingEditCategoryImageClear) {
      updates.imagePath = '';
    }

    if (pendingEditCategoryImageFile) {
      if (uploadStatus) {
        uploadStatus.textContent = 'Upload en cours...';
        uploadStatus.className = 'admin-upload-status loading';
      }
      updates.imagePath = await uploadCategoryImage(pendingEditCategoryImageFile);
    }

    const result = await adminPlayersManager.updateCategoryMetadata(categoryName, updates);

    if (!result.success) {
      if (uploadStatus) {
        uploadStatus.textContent = result.error || 'Erreur lors de la mise à jour.';
        uploadStatus.className = 'admin-upload-status error';
      }
      if (updates.imagePath && pendingEditCategoryImageFile) {
        await deleteCategoryImage(updates.imagePath);
      }
      return;
    }

    const apiResult = await adminPlayersManager.saveCategoriesToServer();

    if (!apiResult.success) {
      await adminPlayersManager.updateCategoryMetadata(categoryName, { color: previousColor, imagePath: previousImagePath });
      if (updates.imagePath && pendingEditCategoryImageFile) {
        await deleteCategoryImage(updates.imagePath);
      }
      if (uploadStatus) {
        uploadStatus.textContent = apiResult.error || 'Erreur lors de la sauvegarde serveur.';
        uploadStatus.className = 'admin-upload-status error';
      }
      return;
    }

    if ((pendingEditCategoryImageFile || pendingEditCategoryImageClear) && previousImagePath !== updates.imagePath) {
      await deleteCategoryImage(previousImagePath);
    }

    closeEditCategoryModal();
    renderCategories();
    showAdminToast('Succès', `Catégorie "${categoryName}" mise à jour`, 'success');
  } catch (error) {
    console.error('Error saving category edits:', error);
    if (uploadStatus) {
      uploadStatus.textContent = error.message || 'Erreur lors de la mise à jour.';
      uploadStatus.className = 'admin-upload-status error';
    }
  } finally {
    submitBtn && (submitBtn.disabled = false);
  }
}

async function confirmDeleteCategory(categoryName) {
  const playersCount = adminPlayersManager.getPlayersInCategory(categoryName).length;

  if (!confirm(`Supprimer la catégorie "${categoryName}" ? (${playersCount} slot(s) seront supprimé(s))`)) {
    return;
  }

  const previousImagePath = adminPlayersManager.getCategoryMetadata(categoryName).imagePath || '';

  const result = await adminPlayersManager.deleteCategory(categoryName);

  if (!result.success) {
    showAdminToast('Erreur', result.error || 'Impossible de supprimer la catégorie', 'error');
    return;
  }

  await deleteCategoryImage(previousImagePath);
  refreshSlotAdminViews();
  showAdminToast('Succès', `Catégorie "${categoryName}" supprimée`, 'success');
}

function clearCategoryImage() {
  pendingAddCategoryImageFile = null;

  const input = document.getElementById('categoryImageInput');
  if (input) input.value = '';

  const preview = document.getElementById('addCategoryImagePreview');
  setCategoryImagePreview(preview, {
    color: document.getElementById('categoryColorInput')?.value
  });

  const clearBtn = document.getElementById('addCategoryImageClearBtn');
  if (clearBtn) clearBtn.style.display = 'none';

  const status = document.getElementById('addCategoryUploadStatus');
  if (status) status.textContent = '';
}

function clearEditCategoryImage() {
  pendingEditCategoryImageFile = null;
  pendingEditCategoryImageClear = true;

  const input = document.getElementById('editCategoryImageInput');
  if (input) input.value = '';

  const preview = document.getElementById('editCategoryImagePreview');
  setCategoryImagePreview(preview, {
    color: document.getElementById('editCategoryColorInput')?.value,
    categoryName: currentEditingCategoryName || ''
  });

  const clearBtn = document.getElementById('editCategoryImageClearBtn');
  if (clearBtn) clearBtn.style.display = 'none';

  const status = document.getElementById('editCategoryUploadStatus');
  if (status) status.textContent = '';
}

// ============ PLAYERS MANAGEMENT ============

async function renderPlayers(page = 1) {
  const playersContainer = document.getElementById('playersListContainer');
  if (!playersContainer) return;

  const searchQuery = getNormalizedSearchValue('playersSearch');
  const sortOrder = getAdminSlotsSortOrder();

  playersContainer.innerHTML = `
    <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
      Chargement des joueurs...
    </div>
  `;

  try {
    if (adminPlayersManager?.init) {
      await adminPlayersManager.init();
    }

    const categoryNames = adminPlayersManager?.getCategories ? adminPlayersManager.getCategories() : [];

    if (!categoryNames || categoryNames.length === 0) {
      playersContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
          Aucune catégorie.
        </div>
      `;
      return;
    }

    const categoriesToRender = [];

    categoryNames.forEach(categoryName => {
      const metadata = adminPlayersManager.getCategoryMetadata(categoryName);
      const players = adminPlayersManager.getPlayersInCategory(categoryName);

      const filteredPlayers = searchQuery
        ? players.filter(player => (player?.name || '').toLowerCase().includes(searchQuery))
        : players;

      const sortedFilteredPlayers = sortSlotPlayers(filteredPlayers, sortOrder);

      if (searchQuery && sortedFilteredPlayers.length === 0) {
        return;
      }

      categoriesToRender.push({
        categoryName,
        players,
        filteredPlayers: sortedFilteredPlayers,
        color: metadata.color || '#4b5563'
      });
    });

    if (categoriesToRender.length === 0) {
      playersContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
          Aucune machine à sous trouvée.
        </div>
      `;
      return;
    }

    const container = document.createElement('div');
    container.className = 'admin-accordion-list';

    categoriesToRender.forEach(({ categoryName, players, filteredPlayers, color }) => {
      const categoryDetails = document.createElement('details');
      categoryDetails.className = 'admin-accordion admin-category-accordion';
      categoryDetails.open = !!searchQuery;

      const summary = document.createElement('summary');

      const left = document.createElement('div');
      left.className = 'admin-accordion-title-group';

      const colorDot = document.createElement('div');
      colorDot.style.width = '12px';
      colorDot.style.height = '12px';
      colorDot.style.borderRadius = '50%';
      colorDot.style.backgroundColor = color;

      const title = document.createElement('h3');
      title.className = 'admin-accordion-title';
      title.textContent = categoryName;

      const badge = document.createElement('span');
      badge.className = 'admin-accordion-badge';
      badge.style.backgroundColor = `${color}20`;
      badge.style.color = color;
      badge.textContent = searchQuery
        ? `${filteredPlayers.length}/${players.length} slot(s)`
        : `${players.length} slot(s)`;

      left.appendChild(colorDot);
      left.appendChild(title);
      left.appendChild(badge);

      const right = document.createElement('div');
      right.style.display = 'flex';
      right.style.alignItems = 'center';
      right.style.gap = '10px';

      const addBtn = document.createElement('button');
      addBtn.className = 'admin-btn admin-btn-primary admin-btn-sm';
      addBtn.textContent = '➕ Ajouter une machine';
      addBtn.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        showAddPlayerModal(categoryName);
      });

      const chevron = document.createElement('span');
      chevron.className = 'admin-accordion-chevron';
      chevron.textContent = '▸';

      right.appendChild(addBtn);
      right.appendChild(chevron);

      summary.appendChild(left);
      summary.appendChild(right);

      const content = document.createElement('div');
      content.className = 'admin-accordion-content';

      const populateContent = () => {
        content.innerHTML = '';

        if (filteredPlayers.length === 0) {
          const empty = document.createElement('div');
          empty.style.textAlign = 'center';
          empty.style.padding = '12px 0';
          empty.style.color = 'var(--text-secondary)';
          empty.textContent = 'Aucune machine dans cette catégorie.';
          content.appendChild(empty);
          return;
        }

        const list = document.createElement('div');
        list.className = 'admin-accordion-list';

        filteredPlayers.forEach(player => {
          list.appendChild(createSlotAccordionElement({ categoryName, player }));
        });

        content.appendChild(list);
      };

      categoryDetails.addEventListener('toggle', () => {
        if (categoryDetails.open) {
          populateContent();
        } else if (!searchQuery) {
          content.innerHTML = '';
        }
      });

      if (categoryDetails.open) {
        populateContent();
      } else {
        content.innerHTML = '';
      }

      categoryDetails.appendChild(summary);
      categoryDetails.appendChild(content);
      container.appendChild(categoryDetails);
    });

    playersContainer.innerHTML = '';
    playersContainer.appendChild(container);
  } catch (error) {
    console.error('Error rendering players:', error);
    playersContainer.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--error-color, #ef4444);">
        Impossible de charger les joueurs.
      </div>
    `;
  }
}

let currentAddPlayerCategory = null;
let currentEditingPlayer = null;
let currentEditPlayerCategory = null;

function showAddPlayerModal(categoryName) {
  currentAddPlayerCategory = categoryName;
  
  const modal = document.getElementById('addPlayerModal');
  const categoryDisplay = document.getElementById('addPlayerCategoryDisplay');
  const nameInput = document.getElementById('playerNameInput');
  const errorEl = document.getElementById('addPlayerError');
  
  if (categoryDisplay) categoryDisplay.textContent = categoryName;
  if (nameInput) nameInput.value = '';
  if (errorEl) errorEl.textContent = '';
  
  if (modal) {
    modal.style.display = 'flex';
  }
}

function closeAddPlayerModal() {
  const modal = document.getElementById('addPlayerModal');
  currentAddPlayerCategory = null;
  if (modal) {
    modal.style.display = 'none';
  }
}

async function saveNewPlayer() {
  const nameInput = document.getElementById('playerNameInput');
  const errorEl = document.getElementById('addPlayerError');

  const name = nameInput?.value?.trim() || '';

  if (errorEl) errorEl.textContent = '';

  if (!name) {
    if (errorEl) errorEl.textContent = 'Le nom du joueur est requis.';
    return;
  }

  if (!currentAddPlayerCategory) {
    if (errorEl) errorEl.textContent = 'Catégorie non sélectionnée.';
    return;
  }

  try {
    if (adminPlayersManager?.init) {
      await adminPlayersManager.init();
    }

    // Utiliser directement Firestore via addPlayer()
    const result = await adminPlayersManager.addPlayer(currentAddPlayerCategory, name);

    if (!result.success) {
      if (errorEl) errorEl.textContent = result.error || 'Erreur lors de l\'ajout.';
      return;
    }

    closeAddPlayerModal();
    refreshSlotAdminViews();
    showAdminToast('Succès', `Joueur "${name}" ajouté`, 'success');
  } catch (error) {
    console.error('Error saving new player:', error);
    if (errorEl) errorEl.textContent = error.message || 'Erreur lors de l\'ajout.';
  }
}

function showEditPlayerModal(categoryName, player) {
  currentEditPlayerCategory = categoryName;
  currentEditingPlayer = player;
  
  const modal = document.getElementById('editPlayerModal');
  const categoryDisplay = document.getElementById('editPlayerCategoryDisplay');
  const nameInput = document.getElementById('editPlayerNameInput');
  const errorEl = document.getElementById('editPlayerError');
  
  if (categoryDisplay) categoryDisplay.textContent = categoryName;
  if (nameInput) nameInput.value = player.name;
  if (errorEl) errorEl.textContent = '';
  
  if (modal) {
    modal.style.display = 'flex';
  }
}

function closeEditPlayerModal() {
  const modal = document.getElementById('editPlayerModal');
  currentEditingPlayer = null;
  currentEditPlayerCategory = null;
  if (modal) {
    modal.style.display = 'none';
  }
}

async function saveEditedPlayer() {
  const nameInput = document.getElementById('editPlayerNameInput');
  const errorEl = document.getElementById('editPlayerError');

  const name = nameInput?.value?.trim() || '';

  if (errorEl) errorEl.textContent = '';

  if (!name) {
    if (errorEl) errorEl.textContent = 'Le nom du joueur est requis.';
    return;
  }

  if (!currentEditPlayerCategory || !currentEditingPlayer) {
    if (errorEl) errorEl.textContent = 'Données manquantes.';
    return;
  }

  try {
    // Utiliser directement Firestore via editPlayer()
    const result = await adminPlayersManager.editPlayer(currentEditPlayerCategory, currentEditingPlayer.id, name);

    if (!result.success) {
      if (errorEl) errorEl.textContent = result.error || 'Erreur lors de la modification.';
      return;
    }

    closeEditPlayerModal();
    refreshSlotAdminViews();
    showAdminToast('Succès', 'Joueur modifié', 'success');
  } catch (error) {
    console.error('Error saving edited player:', error);
    if (errorEl) errorEl.textContent = error.message || 'Erreur lors de la modification.';
  }
}

async function confirmDeletePlayer(categoryName, playerFirestoreId, playerName) {
  if (!confirm(`Supprimer le joueur "${playerName}" ?`)) {
    return;
  }

  try {
    const result = await adminPlayersManager.deletePlayer(categoryName, playerFirestoreId);

    if (result.success) {
      refreshSlotAdminViews();
      showAdminToast('Succès', 'Joueur supprimé', 'success');
    } else {
      showAdminToast('Erreur', result.error || 'Erreur lors de la suppression', 'error');
    }
  } catch (error) {
    console.error('Error deleting player:', error);
    showAdminToast('Erreur', error.message || 'Erreur lors de la suppression', 'error');
  }
}

// ============ PURGE MANAGEMENT ============

function renderPurgeInfo() {
  // Placeholder - to be implemented
  const purgeContainer = document.getElementById('purgeContainer');
  if (purgeContainer) {
    purgeContainer.innerHTML = '<p>Gestion de la purge à implémenter</p>';
  }
}

function previewPurge() {
  showAdminToast('Info', 'Aperçu de la purge à implémenter', 'info');
}

function hidePurgePreview() {
  const modal = document.getElementById('purgePreviewModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function confirmPurge() {
  showAdminToast('Info', 'Purge à implémenter', 'info');
}

// ============ HISTORY MANAGEMENT ============

function renderHistory(page = 1) {
  const historyContainer = document.getElementById('historyTableBody');
  if (!historyContainer) return;

  const history = adminManager.adminHistory || [];
  historyContainer.innerHTML = '';

  if (history.length === 0) {
    historyContainer.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 40px;">Aucun historique</td></tr>';
    return;
  }

  const start = (page - 1) * 10;
  const end = start + 10;
  const paginated = history.slice(start, end);

  paginated.forEach(entry => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.timestamp?.toLocaleDateString ? entry.timestamp.toLocaleDateString('fr-FR') : 'N/A'}</td>
      <td>${escapeHtml(entry.type) || 'N/A'}</td>
      <td>${escapeHtml(entry.details) || 'N/A'}</td>
      <td>${escapeHtml(entry.user) || 'Admin'}</td>
    `;
    historyContainer.appendChild(row);
  });

  renderPagination('historyPagination', history.length, page, (p) => renderHistory(p));
}

// ============ PAGINATION AND HELPERS ============

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function renderPagination(containerId, totalItems, currentPage, onPageChange) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  let html = '<div style="display: flex; justify-content: center; align-items: center; gap: 8px; padding: 16px; flex-wrap: wrap;">';

  if (currentPage > 1) {
    html += `<button class="admin-btn admin-btn-secondary" style="padding: 8px 12px;">← Précédent</button>`;
  }

  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      html += `<span style="padding: 8px 12px; font-weight: bold; color: var(--primary-color);">${i}</span>`;
    } else if (i >= currentPage - 2 && i <= currentPage + 2) {
      html += `<button class="admin-btn admin-btn-secondary" data-page="${i}" style="padding: 8px 12px;">${i}</button>`;
    }
  }

  if (currentPage < totalPages) {
    html += `<button class="admin-btn admin-btn-secondary" style="padding: 8px 12px;">Suivant →</button>`;
  }

  html += '</div>';
  container.innerHTML = html;

  // Attach click handlers to pagination buttons
  const prevBtn = container.querySelector('button:first-child');
  if (prevBtn && currentPage > 1) {
    prevBtn.addEventListener('click', () => onPageChange(currentPage - 1));
  }

  const pageButtons = container.querySelectorAll('button[data-page]');
  pageButtons.forEach(btn => {
    const page = parseInt(btn.getAttribute('data-page'));
    btn.addEventListener('click', () => onPageChange(page));
  });

  const nextBtn = container.querySelector('button:last-child');
  if (nextBtn && currentPage < totalPages) {
    nextBtn.addEventListener('click', () => onPageChange(currentPage + 1));
  }
}

// ============ BONUS HUNTS MANAGEMENT ============

function showBonusHunts() {
  renderBonusHunts(1);

  // Setup search and filter
  const searchInput = document.getElementById('bonusHuntSearch');
  const statusFilter = document.getElementById('bonusHuntStatusFilter');
  
  // Remove existing listeners to avoid duplicates if any
  const newSearch = searchInput.cloneNode(true);
  searchInput.parentNode.replaceChild(newSearch, searchInput);
  
  const newFilter = statusFilter.cloneNode(true);
  statusFilter.parentNode.replaceChild(newFilter, statusFilter);

  newSearch.addEventListener('input', () => renderBonusHunts(1));
  newFilter.addEventListener('change', () => renderBonusHunts(1));
}

function renderBonusHunts(page = 1) {
  const search = document.getElementById('bonusHuntSearch').value;
  const status = document.getElementById('bonusHuntStatusFilter').value;

  const filtered = adminBonusHuntManager.filterSessions({
    search: search,
    status: status || undefined
  });

  const start = (page - 1) * adminBonusHuntManager.itemsPerPage;
  const end = start + adminBonusHuntManager.itemsPerPage;
  const paginated = filtered.slice(start, end);

  const tbody = document.getElementById('bonusHuntsTableBody');
  tbody.innerHTML = '';

  if (paginated.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 40px;">Aucun bonus hunt trouvé</td></tr>';
    document.getElementById('bonusHuntsPagination').innerHTML = '';
    adminBonusHuntManager.updateBulkActionsUI();
    return;
  }

  paginated.forEach(session => {
    const row = document.createElement('tr');
    
    // Status colors
    const statusColors = {
        'creation': '#a0a0a0',
        'collection': '#3b82f6',
        'opening': '#8b5cf6',
        'completed': '#10b981'
    };
    const statusColor = statusColors[session.status] || '#a0a0a0';
    
    const isSelected = adminBonusHuntManager.selectedSessions.has(session.id);
    if (isSelected) {
      row.classList.add('selected');
    }

    // Format net result
    const netResult = session.netResult;
    const netResultColor = netResult > 0 ? '#10b981' : (netResult < 0 ? '#ef4444' : '#a0a0a0');
    const netResultStr = netResult.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });

    row.innerHTML = `
      <td>
        <input type="checkbox" 
               class="admin-checkbox" 
               ${isSelected ? 'checked' : ''} 
               onchange="toggleBonusHuntSelection('${session.id}')">
      </td>
      <td><strong>${escapeHtml(session.name)}</strong></td>
      <td><span style="font-family: monospace;">${escapeHtml(session.shareableCode)}</span></td>
      <td>${session.createdAt.toLocaleDateString('fr-FR')}</td>
      <td>
        <span style="
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          background: ${statusColor}20;
          color: ${statusColor};
          font-size: 0.85rem;
          font-weight: 500;
        ">${session.status}</span>
      </td>
      <td>${session.bonusCount}</td>
      <td style="color: ${netResultColor}; font-weight: bold;">${netResultStr}</td>
      <td>
        <div class="admin-btn-group">
            <a href="/bonus-hunt/${session.shareableCode}" target="_blank" class="admin-btn admin-btn-secondary" style="text-decoration: none; display: inline-flex; align-items: center;">
             👁️ Voir
            </a>
            <button class="admin-btn admin-btn-danger" onclick="confirmDeleteBonusHunt('${session.id}', '${escapeHtml(session.name)}')">
             🗑️
            </button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });

  // Pagination
  renderPagination('bonusHuntsPagination', filtered.length, page, (p) => renderBonusHunts(p));
  
  // Bulk UI
  adminBonusHuntManager.updateBulkActionsUI();
}

function generateTestBonusHunt() {
    adminBonusHuntManager.generateTestSession().then(() => {
        renderBonusHunts(1);
    });
}

function toggleBonusHuntSelection(sessionId) {
    adminBonusHuntManager.toggleSessionSelection(sessionId);
    renderBonusHunts(1);
}

function toggleSelectAllBonusHunts() {
    const checkbox = document.getElementById('bonusHuntSelectAllCheckbox');
    const shouldSelect = checkbox.indeterminate ? true : checkbox.checked;
    adminBonusHuntManager.selectAllSessions(shouldSelect);
    renderBonusHunts(1);
}

function confirmDeleteSelectedBonusHunts() {
    adminBonusHuntManager.deleteSelectedSessions().then(() => {
        renderBonusHunts(1);
    });
}

function confirmDeleteBonusHunt(sessionId, sessionName) {
     if (confirm(`Supprimer la session "${sessionName}" ?`)) {
         adminBonusHuntManager.deleteSession(sessionId).then(() => {
             renderBonusHunts(1);
         });
     }
}

// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeAdminPanel();
});
