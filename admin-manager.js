// Admin Manager - Tournament management, purge, and history
class AdminManager {
  constructor() {
    this.tournaments = [];
    this.adminHistory = [];
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.loadAdminHistory();
  }

  // Initialize Firebase connection
  async init() {
    await this.loadAllTournaments();
  }

  // Load all tournaments from Firestore
  async loadAllTournaments() {
    try {
      const snapshot = await db.collection('tournois').get();
      this.tournaments = [];
      
      snapshot.forEach(doc => {
        const data = doc.data();
        this.tournaments.push({
          id: doc.id,
          name: data.state?.name || 'Sans nom',
          createdAt: data.state?.createdAt ? new Date(data.state.createdAt) : new Date(),
          creator: data.state?.creator || 'Inconnu',
          status: this.getTournamentStatus(data.state),
          playersCount: data.state?.players?.length || 0,
          matchesCount: this.countMatches(data.state),
          winner: data.state?.winner || null,
          state: data.state
        });
      });

      // Sort by creation date (newest first)
      this.tournaments.sort((a, b) => b.createdAt - a.createdAt);
    } catch (error) {
      console.error('Error loading tournaments:', error);
      showAdminToast('Erreur', 'Impossible de charger les tournois', 'error');
    }
  }

  // Get tournament status
  getTournamentStatus(state) {
    if (state?.winner) return 'Terminé';
    if (state?.tournamentStarted) return 'En cours';
    return 'En attente';
  }

  // Count total matches
  countMatches(state) {
    let count = 0;
    if (state?.matches) {
      for (let key in state.matches) {
        if (Array.isArray(state.matches[key])) {
          count += state.matches[key].length;
        }
      }
    }
    return count;
  }

  // Filter tournaments
  filterTournaments(filters = {}) {
    let filtered = [...this.tournaments];

    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(search) ||
        t.creator.toLowerCase().includes(search)
      );
    }

    if (filters.status) {
      filtered = filtered.filter(t => t.status === filters.status);
    }

    if (filters.dateFrom) {
      const from = new Date(filters.dateFrom);
      filtered = filtered.filter(t => t.createdAt >= from);
    }

    if (filters.dateTo) {
      const to = new Date(filters.dateTo);
      to.setHours(23, 59, 59, 999);
      filtered = filtered.filter(t => t.createdAt <= to);
    }

    return filtered;
  }

  // Delete tournament
  async deleteTournament(tournamentId) {
    try {
      const tournament = this.tournaments.find(t => t.id === tournamentId);
      if (!tournament) throw new Error('Tournoi non trouvé');

      // Export data before deletion
      const exportData = this.exportTournament(tournament);
      this.saveExportedData(exportData);

      // Delete from Firestore
      await db.collection('tournois').doc(tournamentId).delete();

      // Remove from local array
      this.tournaments = this.tournaments.filter(t => t.id !== tournamentId);

      // Log action
      this.logAction({
        type: 'delete',
        tournamentId: tournamentId,
        tournamentName: tournament.name,
        details: `Tournoi "${tournament.name}" supprimé`
      });

      showAdminToast('Succès', `Tournoi "${tournament.name}" supprimé avec succès`, 'success');
      return true;
    } catch (error) {
      console.error('Error deleting tournament:', error);
      showAdminToast('Erreur', 'Impossible de supprimer le tournoi', 'error');
      return false;
    }
  }

  // Update tournament
  async updateTournament(tournamentId, updates) {
    try {
      const tournament = this.tournaments.find(t => t.id === tournamentId);
      if (!tournament) throw new Error('Tournoi non trouvé');

      const oldName = tournament.name;
      const updatedState = { ...tournament.state, ...updates };

      await db.collection('tournois').doc(tournamentId).update({
        state: updatedState
      });

      // Update local array
      tournament.state = updatedState;
      tournament.name = updates.name || tournament.name;

      // Log action
      this.logAction({
        type: 'update',
        tournamentId: tournamentId,
        tournamentName: tournament.name,
        details: `Tournoi "${oldName}" renommé en "${tournament.name}"`
      });

      showAdminToast('Succès', 'Tournoi mis à jour avec succès', 'success');
      return true;
    } catch (error) {
      console.error('Error updating tournament:', error);
      showAdminToast('Erreur', 'Impossible de mettre à jour le tournoi', 'error');
      return false;
    }
  }

  // Export tournament as JSON
  exportTournament(tournament) {
    return {
      id: tournament.id,
      name: tournament.name,
      createdAt: tournament.createdAt,
      creator: tournament.creator,
      status: tournament.status,
      state: tournament.state,
      exportedAt: new Date().toISOString()
    };
  }

  // Save exported data to localStorage
  saveExportedData(data) {
    const exports = JSON.parse(localStorage.getItem('adminExports') || '[]');
    exports.push({
      ...data,
      exportedAt: new Date().toISOString()
    });
    localStorage.setItem('adminExports', JSON.stringify(exports));
  }

  // Mass purge tournaments before date
  async purgeTournamentsBefore(beforeDate) {
    try {
      const purgeDate = new Date(beforeDate);
      const toBePurged = this.tournaments.filter(t => t.createdAt < purgeDate);

      if (toBePurged.length === 0) {
        showAdminToast('Info', 'Aucun tournoi à supprimer avant cette date', 'info');
        return false;
      }

      let deleted = 0;
      let failed = 0;

      for (const tournament of toBePurged) {
        try {
          // Export before deletion
          const exportData = this.exportTournament(tournament);
          this.saveExportedData(exportData);

          // Delete from Firestore
          await db.collection('tournois').doc(tournament.id).delete();
          deleted++;
        } catch (error) {
          console.error(`Error deleting tournament ${tournament.id}:`, error);
          failed++;
        }
      }

      // Remove from local array
      this.tournaments = this.tournaments.filter(t => t.createdAt >= purgeDate);

      // Log action
      const spaceSaved = this.calculateApproximateSize(toBePurged);
      this.logAction({
        type: 'purge',
        details: `Purge de ${deleted} tournoi(s) antérieurs au ${purgeDate.toLocaleDateString()}. Espace économisé: ~${spaceSaved} KB`,
        count: deleted,
        failed: failed,
        purgeDate: purgeDate.toISOString()
      });

      const message = `${deleted} tournoi(s) supprimé(s) avec succès${failed > 0 ? ` (${failed} erreur(s))` : ''}`;
      showAdminToast('Succès', message, 'success');
      return true;
    } catch (error) {
      console.error('Error during purge:', error);
      showAdminToast('Erreur', 'Erreur lors de la purge', 'error');
      return false;
    }
  }

  // Calculate approximate size
  calculateApproximateSize(tournaments) {
    let totalSize = 0;
    tournaments.forEach(t => {
      const json = JSON.stringify(t.state);
      totalSize += new Blob([json]).size;
    });
    return Math.ceil(totalSize / 1024); // Convert to KB
  }

  // Admin action logging
  logAction(action) {
    const logEntry = {
      id: Math.random().toString(36).substring(2, 10),
      timestamp: new Date().toISOString(),
      type: action.type,
      details: action.details || '',
      tournamentId: action.tournamentId || null,
      tournamentName: action.tournamentName || null,
      count: action.count || null,
      failed: action.failed || null,
      purgeDate: action.purgeDate || null
    };

    this.adminHistory.unshift(logEntry);

    // Keep only last 500 entries
    if (this.adminHistory.length > 500) {
      this.adminHistory = this.adminHistory.slice(0, 500);
    }

    this.saveAdminHistory();
  }

  // Save history to localStorage
  saveAdminHistory() {
    localStorage.setItem('adminHistory', JSON.stringify(this.adminHistory));
  }

  // Load history from localStorage
  loadAdminHistory() {
    try {
      const saved = localStorage.getItem('adminHistory');
      if (saved) {
        this.adminHistory = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  }

  // Get paginated history
  getPaginatedHistory(page = 1) {
    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return {
      items: this.adminHistory.slice(start, end),
      total: this.adminHistory.length,
      pages: Math.ceil(this.adminHistory.length / this.itemsPerPage),
      currentPage: page
    };
  }

  // Export history as CSV
  exportHistoryAsCSV() {
    const headers = ['Date', 'Heure', 'Type', 'Détails', 'Tournoi'];
    const rows = this.adminHistory.map(entry => {
      const date = new Date(entry.timestamp);
      return [
        date.toLocaleDateString('fr-FR'),
        date.toLocaleTimeString('fr-FR'),
        this.getActionTypeLabel(entry.type),
        entry.details,
        entry.tournamentName || '-'
      ];
    });

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `admin-history-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();

    this.logAction({
      type: 'export',
      details: 'Historique exporté en CSV'
    });
  }

  // Get action type label
  getActionTypeLabel(type) {
    const labels = {
      'delete': 'Suppression',
      'update': 'Modification',
      'purge': 'Purge',
      'export': 'Export'
    };
    return labels[type] || type;
  }

  // Get dashboard stats
  getDashboardStats() {
    return {
      totalTournaments: this.tournaments.length,
      totalPlayers: this.tournaments.reduce((sum, t) => sum + t.playersCount, 0),
      totalMatches: this.tournaments.reduce((sum, t) => sum + t.matchesCount, 0),
      completedTournaments: this.tournaments.filter(t => t.status === 'Terminé').length,
      activeTournaments: this.tournaments.filter(t => t.status === 'En cours').length,
      pendingTournaments: this.tournaments.filter(t => t.status === 'En attente').length
    };
  }
}

// Toast notification for admin
function showAdminToast(title, message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `admin-toast admin-toast-${type}`;
  toast.innerHTML = `
    <div class="admin-toast-content">
      <strong>${title}</strong>
      <p>${message}</p>
    </div>
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Global instance
const adminManager = new AdminManager();

// Add styles for toast
const toastStyles = `
.admin-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 16px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 2000;
  max-width: 400px;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-left: 4px solid var(--primary-color);
}

.admin-toast.show {
  opacity: 1;
}

.admin-toast-error {
  border-left-color: #ef4444;
}

.admin-toast-success {
  border-left-color: #10b981;
}

.admin-toast-info {
  border-left-color: #3b82f6;
}

.admin-toast-content {
  margin: 0;
}

.admin-toast strong {
  display: block;
  margin-bottom: 4px;
  color: var(--text-color);
}

.admin-toast p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = toastStyles;
document.head.appendChild(styleSheet);
