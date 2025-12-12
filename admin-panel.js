
// ============ BONUS HUNTS MANAGEMENT ============

function showBonusHunts() {
  document.getElementById('bonusHuntsPage').style.display = 'block';
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
