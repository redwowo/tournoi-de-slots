
// ============ PANEL INITIALIZATION ============

function initializeAdminPanel() {
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
    adminManager.init().catch(err => console.error('Error initializing admin manager:', err));
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

function renderCategories() {
  const categoriesContainer = document.getElementById('categoriesListContainer');
  if (!categoriesContainer) return;

  // Placeholder for categories - to be implemented with actual categories management
  categoriesContainer.innerHTML = '<p>Gestion des catégories à implémenter</p>';
}

function showAddCategoryModal() {
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

function saveNewCategory() {
  showAdminToast('Info', 'Ajout de catégorie à implémenter', 'info');
}

function closeEditCategoryModal() {
  const modal = document.getElementById('editCategoryModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function saveEditedCategory() {
  showAdminToast('Info', 'Édition de catégorie à implémenter', 'info');
}

function clearCategoryImage() {
  const input = document.getElementById('categoryImageInput');
  if (input) input.value = '';
  const preview = document.getElementById('categoryImagePreview');
  if (preview) preview.innerHTML = '';
}

function clearEditCategoryImage() {
  const input = document.getElementById('editCategoryImageInput');
  if (input) input.value = '';
  const preview = document.getElementById('editCategoryImagePreview');
  if (preview) preview.innerHTML = '';
}

// ============ PLAYERS MANAGEMENT ============

function renderPlayers(page = 1) {
  // Placeholder - to be implemented
  if (window.renderPlayersGrid) {
    renderPlayersGrid();
  }
}

function showAddPlayerModal() {
  const modal = document.getElementById('addPlayerModal');
  if (modal) {
    modal.style.display = 'flex';
  }
}

function closeAddPlayerModal() {
  const modal = document.getElementById('addPlayerModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function saveNewPlayer() {
  showAdminToast('Info', 'Ajout de joueur à implémenter', 'info');
}

function closeEditPlayerModal() {
  const modal = document.getElementById('editPlayerModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

function saveEditedPlayer() {
  showAdminToast('Info', 'Édition de joueur à implémenter', 'info');
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
