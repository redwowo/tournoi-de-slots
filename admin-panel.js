// Admin Panel Logic

let currentDetailTournament = null;
let currentEditTournament = null;

// Check authentication on page load
document.addEventListener('DOMContentLoaded', async () => {
  // Verify admin is authenticated
  if (!adminAuthManager.isAdminAuthenticated()) {
    window.location.href = '/';
    return;
  }

  // Initialize admin manager
  await adminManager.init();

  // Setup navigation
  setupNavigation();

  // Setup theme toggle
  setupThemeToggle();

  // Display initial dashboard
  showDashboard();

  // Update session timer
  updateSessionTimer();
  setInterval(updateSessionTimer, 10000); // Update every 10 seconds
});

// Navigation setup
function setupNavigation() {
  const navItems = document.querySelectorAll('.admin-nav-item');
  
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      const page = item.getAttribute('data-page');
      showPage(page);
    });
  });
}

// Show page
function showPage(page) {
  const pages = document.querySelectorAll('.admin-page');
  pages.forEach(p => p.style.display = 'none');

  const pageTitle = {
    'dashboard': 'Dashboard',
    'tournaments': 'Tous les Tournois',
    'purge': 'Purge en Masse',
    'history': 'Historique des Actions'
  };

  document.getElementById('pageTitle').textContent = pageTitle[page];

  switch(page) {
    case 'dashboard':
      showDashboard();
      break;
    case 'tournaments':
      showTournaments();
      break;
    case 'purge':
      showPurge();
      break;
    case 'history':
      showHistory();
      break;
  }
}

// Show Dashboard
function showDashboard() {
  const stats = adminManager.getDashboardStats();
  
  document.getElementById('statTotalTournaments').textContent = stats.totalTournaments;
  document.getElementById('statTotalPlayers').textContent = stats.totalPlayers;
  document.getElementById('statTotalMatches').textContent = stats.totalMatches;
  document.getElementById('statCompletedTournaments').textContent = stats.completedTournaments;
  document.getElementById('statActiveTournaments').textContent = stats.activeTournaments;
  document.getElementById('statPendingTournaments').textContent = stats.pendingTournaments;

  document.getElementById('dashboardPage').style.display = 'block';
}

// Show Tournaments
function showTournaments() {
  document.getElementById('tournamentsPage').style.display = 'block';
  renderTournaments(1);

  // Setup search and filter
  const searchInput = document.getElementById('tournamentSearch');
  const statusFilter = document.getElementById('statusFilter');

  searchInput.addEventListener('input', () => renderTournaments(1));
  statusFilter.addEventListener('change', () => renderTournaments(1));
}

// Render tournaments table
function renderTournaments(page = 1) {
  const search = document.getElementById('tournamentSearch').value;
  const status = document.getElementById('statusFilter').value;

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
    tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 40px;">Aucun tournoi trouvé</td></tr>';
    document.getElementById('tournamentsPagination').innerHTML = '';
    adminManager.updateBulkActionsUI();
    return;
  }

  paginated.forEach(tournament => {
    const row = document.createElement('tr');
    const statusColor = tournament.status === 'Terminé' ? '#10b981' : 
                       tournament.status === 'En cours' ? '#3b82f6' : '#a0a0a0';
    
    const isSelected = adminManager.selectedTournaments.has(tournament.id);
    if (isSelected) {
      row.classList.add('selected');
    }

    row.innerHTML = `
      <td>
        <input type="checkbox" 
               class="admin-checkbox" 
               ${isSelected ? 'checked' : ''} 
               onchange="toggleTournamentSelection('${tournament.id}')">
      </td>
      <td><strong>${escapeHtml(tournament.name)}</strong></td>
      <td>${escapeHtml(tournament.creator)}</td>
      <td>${tournament.createdAt.toLocaleDateString('fr-FR')}</td>
      <td>
        <span style="
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          background: ${statusColor}20;
          color: ${statusColor};
          font-size: 0.85rem;
          font-weight: 500;
        ">${tournament.status}</span>
      </td>
      <td>${tournament.playersCount}</td>
      <td>${tournament.matchesCount}</td>
      <td>
        <div class="admin-btn-group">
          <button class="admin-btn admin-btn-secondary" onclick="viewTournamentDetail('${tournament.id}')">
            👁️ Voir
          </button>
          <button class="admin-btn admin-btn-secondary" onclick="editTournament('${tournament.id}')">
            ✏️ Éditer
          </button>
          <button class="admin-btn admin-btn-danger" onclick="confirmDeleteTournament('${tournament.id}')">
            🗑️ Supprimer
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });

  // Pagination
  renderPagination('tournamentsPagination', filtered.length, page, (p) => renderTournaments(p));
  
  // Mettre à jour l'UI des actions en masse
  adminManager.updateBulkActionsUI();
}

// View tournament detail
function viewTournamentDetail(tournamentId) {
  const tournament = adminManager.tournaments.find(t => t.id === tournamentId);
  if (!tournament) return;

  currentDetailTournament = tournament;

  const modal = document.getElementById('tournamentDetailModal');
  const body = document.getElementById('detailModalBody');

  const statusColor = tournament.status === 'Terminé' ? '#10b981' : 
                     tournament.status === 'En cours' ? '#3b82f6' : '#a0a0a0';

  let playersHTML = '<em style="color: var(--text-secondary);">Pas de joueurs</em>';
  if (tournament.state?.players && tournament.state.players.length > 0) {
    playersHTML = tournament.state.players
      .map(p => `<li>${escapeHtml(p.name || p)}</li>`)
      .join('');
    playersHTML = `<ol style="margin: 0; padding-left: 20px;">${playersHTML}</ol>`;
  }

  let winnerHTML = '<em style="color: var(--text-secondary);">Pas de gagnant</em>';
  if (tournament.winner) {
    winnerHTML = `<strong style="color: #10b981;">${escapeHtml(tournament.winner)} 🏆</strong>`;
  }

  body.innerHTML = `
    <div style="margin-bottom: 20px;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
        <div>
          <label style="color: var(--text-secondary); font-size: 0.85rem; text-transform: uppercase;">ID</label>
          <p style="margin: 4px 0; font-family: monospace; color: var(--text-color);">${escapeHtml(tournament.id)}</p>
        </div>
        <div>
          <label style="color: var(--text-secondary); font-size: 0.85rem; text-transform: uppercase;">Statut</label>
          <p style="margin: 4px 0;">
            <span style="
              display: inline-block;
              padding: 4px 8px;
              border-radius: 4px;
              background: ${statusColor}20;
              color: ${statusColor};
              font-size: 0.85rem;
              font-weight: 500;
            ">${tournament.status}</span>
          </p>
        </div>
      </div>

      <div>
        <label style="color: var(--text-secondary); font-size: 0.85rem; text-transform: uppercase;">Créateur</label>
        <p style="margin: 4px 0; color: var(--text-color);">${escapeHtml(tournament.creator)}</p>
      </div>

      <div style="margin-top: 16px;">
        <label style="color: var(--text-secondary); font-size: 0.85rem; text-transform: uppercase;">Gagnant</label>
        <p style="margin: 4px 0;">${winnerHTML}</p>
      </div>

      <div style="margin-top: 16px;">
        <label style="color: var(--text-secondary); font-size: 0.85rem; text-transform: uppercase;">Date de Création</label>
        <p style="margin: 4px 0; color: var(--text-color);">${tournament.createdAt.toLocaleString('fr-FR')}</p>
      </div>

      <div style="margin-top: 16px;">
        <label style="color: var(--text-secondary); font-size: 0.85rem; text-transform: uppercase;">Joueurs (${tournament.playersCount})</label>
        <div style="margin-top: 8px; max-height: 200px; overflow-y: auto; padding: 12px; background: var(--hover-bg); border-radius: 6px;">
          ${playersHTML}
        </div>
      </div>
    </div>
  `;

  document.getElementById('detailModalTitle').textContent = `Détails: ${tournament.name}`;
  modal.classList.add('show');
}

// Close tournament detail
function closeTournamentDetail() {
  document.getElementById('tournamentDetailModal').classList.remove('show');
  currentDetailTournament = null;
}

// Edit tournament
function editTournament(tournamentId) {
  const tournament = adminManager.tournaments.find(t => t.id === tournamentId);
  if (!tournament) return;

  currentEditTournament = tournament;

  document.getElementById('editTournamentName').value = tournament.name;
  document.getElementById('editTournamentDescription').value = tournament.state?.description || '';

  document.getElementById('editTournamentModal').classList.add('show');
}

// Close edit tournament
function closeEditTournament() {
  document.getElementById('editTournamentModal').classList.remove('show');
  currentEditTournament = null;
}

// Save edited tournament
async function saveEditedTournament() {
  if (!currentEditTournament) return;

  const name = document.getElementById('editTournamentName').value.trim();
  const description = document.getElementById('editTournamentDescription').value.trim();

  if (!name) {
    showAdminToast('Erreur', 'Le nom du tournoi est requis', 'error');
    return;
  }

  const updated = await adminManager.updateTournament(currentEditTournament.id, {
    name: name,
    description: description
  });

  if (updated) {
    closeEditTournament();
    renderTournaments(1);
  }
}

// Delete tournament from detail view
async function deleteTournamentFromDetail() {
  if (!currentDetailTournament) return;

  if (confirm(`Êtes-vous sûr de vouloir supprimer le tournoi "${currentDetailTournament.name}" ? Cette action est irréversible.`)) {
    const deleted = await adminManager.deleteTournament(currentDetailTournament.id);
    if (deleted) {
      closeTournamentDetail();
      renderTournaments(1);
    }
  }
}

// Confirm delete tournament
function confirmDeleteTournament(tournamentId) {
  const tournament = adminManager.tournaments.find(t => t.id === tournamentId);
  if (!tournament) return;

  if (confirm(`Êtes-vous sûr de vouloir supprimer le tournoi "${tournament.name}" ? Cette action est irréversible.`)) {
    adminManager.deleteTournament(tournamentId).then(() => {
      renderTournaments(1);
    });
  }
}

// Show Purge
function showPurge() {
  document.getElementById('purgePage').style.display = 'block';
  
  // Set default date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('purgeDate').value = today;

  document.getElementById('purgeDate').addEventListener('change', () => {
    previewPurge();
  });
}

// Preview purge
function previewPurge() {
  const dateStr = document.getElementById('purgeDate').value;
  if (!dateStr) {
    showAdminToast('Erreur', 'Veuillez sélectionner une date', 'error');
    return;
  }

  const purgeDate = new Date(dateStr);
  const toBePurged = adminManager.tournaments.filter(t => t.createdAt < purgeDate);

  if (toBePurged.length === 0) {
    showAdminToast('Info', 'Aucun tournoi avant cette date', 'info');
    hidePurgePreview();
    return;
  }

  const spaceSaved = adminManager.calculateApproximateSize(toBePurged);

  document.getElementById('purgeTournamentCount').textContent = toBePurged.length;
  document.getElementById('purgeSpaceEstimate').textContent = `${spaceSaved} KB`;
  document.getElementById('purgePreview').style.display = 'block';
  document.getElementById('purgeNotPreview').style.display = 'none';
}

// Hide purge preview
function hidePurgePreview() {
  document.getElementById('purgePreview').style.display = 'none';
  document.getElementById('purgeNotPreview').style.display = 'block';
}

// Confirm purge
async function confirmPurge() {
  const dateStr = document.getElementById('purgeDate').value;
  const purgeDate = new Date(dateStr);

  if (confirm(`Êtes-vous absolument sûr ? ${document.getElementById('purgeTournamentCount').textContent} tournoi(s) seront supprimés définitivement.`)) {
    await adminManager.purgeTournamentsBefore(purgeDate);
    hidePurgePreview();
  }
}

// Show History
function showHistory() {
  document.getElementById('historyPage').style.display = 'block';
  renderHistory(1);
}

// Render history table
function renderHistory(page = 1) {
  const paginatedHistory = adminManager.getPaginatedHistory(page);
  const tbody = document.getElementById('historyTableBody');
  tbody.innerHTML = '';

  if (paginatedHistory.items.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 40px;">Aucun historique</td></tr>';
    document.getElementById('historyPagination').innerHTML = '';
    return;
  }

  paginatedHistory.items.forEach(entry => {
    const date = new Date(entry.timestamp);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${date.toLocaleDateString('fr-FR')}</td>
      <td>${date.toLocaleTimeString('fr-FR')}</td>
      <td>
        <span style="
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          background: var(--primary-color)20;
          color: var(--primary-color);
          font-size: 0.85rem;
          font-weight: 500;
        ">${adminManager.getActionTypeLabel(entry.type)}</span>
      </td>
      <td style="max-width: 300px; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(entry.details)}</td>
      <td>${entry.tournamentName ? escapeHtml(entry.tournamentName) : '-'}</td>
    `;
    tbody.appendChild(row);
  });

  // Pagination
  renderPagination('historyPagination', paginatedHistory.total, page, (p) => renderHistory(p));
}

// Render pagination
function renderPagination(containerId, total, currentPage, callback) {
  const container = document.getElementById(containerId);
  const pages = Math.ceil(total / adminManager.itemsPerPage);

  if (pages <= 1) {
    container.innerHTML = '';
    return;
  }

  let html = '';
  
  // Previous button
  if (currentPage > 1) {
    html += `<button class="admin-pagination-btn" onclick="adminPaginationClick(${currentPage - 1}, arguments[0])">← Précédent</button>`;
  }

  // Page numbers
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(pages, currentPage + 2);

  if (startPage > 1) {
    html += `<button class="admin-pagination-btn" onclick="adminPaginationClick(1, arguments[0])">1</button>`;
    if (startPage > 2) html += `<span style="padding: 0 8px;">...</span>`;
  }

  for (let i = startPage; i <= endPage; i++) {
    const activeClass = i === currentPage ? 'active' : '';
    html += `<button class="admin-pagination-btn ${activeClass}" onclick="adminPaginationClick(${i}, arguments[0])">${i}</button>`;
  }

  if (endPage < pages) {
    if (endPage < pages - 1) html += `<span style="padding: 0 8px;">...</span>`;
    html += `<button class="admin-pagination-btn" onclick="adminPaginationClick(${pages}, arguments[0])">${pages}</button>`;
  }

  // Next button
  if (currentPage < pages) {
    html += `<button class="admin-pagination-btn" onclick="adminPaginationClick(${currentPage + 1}, arguments[0])">Suivant →</button>`;
  }

  container.innerHTML = html;
}

// Pagination click helper
function adminPaginationClick(page, event) {
  event.preventDefault();
  const activeNav = document.querySelector('.admin-nav-item.active');
  const currentPage = activeNav.getAttribute('data-page');
  
  if (currentPage === 'tournaments') {
    renderTournaments(page);
  } else if (currentPage === 'history') {
    renderHistory(page);
  }
}

// Update session timer
function updateSessionTimer() {
  const remaining = adminAuthManager.getSessionRemainingTime();
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  
  document.getElementById('sessionTimer').textContent = `Session: ${minutes}m ${seconds}s`;
  
  if (remaining < 60) {
    document.getElementById('sessionTimer').style.color = '#ef4444';
  }
}

// Setup theme toggle
function setupThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  const html = document.documentElement;
  const isDark = html.classList.contains('dark');

  toggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    html.classList.toggle('light');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
  });

  // Restore theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    html.classList.remove('dark', 'light');
    html.classList.add(savedTheme);
  }
}

// Escape HTML
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Fonctions pour la sélection multiple
function toggleTournamentSelection(tournamentId) {
  adminManager.toggleTournamentSelection(tournamentId);
  renderTournaments(1); // Re-render pour mettre à jour les classes CSS
}

function toggleSelectAll() {
  const selectAllCheckbox = document.getElementById('selectAllCheckbox');
  // Si le checkbox est indeterminate et qu'on clique, on considère qu'on veut tout sélectionner
  const shouldSelectAll = selectAllCheckbox.indeterminate ? true : selectAllCheckbox.checked;
  adminManager.selectAllTournaments(shouldSelectAll);
  renderTournaments(1); // Re-render pour mettre à jour les classes CSS
}

function confirmDeleteSelected() {
  adminManager.deleteSelectedTournaments().then(() => {
    renderTournaments(1);
  });
}

function exportSelectedTournaments() {
  adminManager.exportSelectedTournaments();
}
