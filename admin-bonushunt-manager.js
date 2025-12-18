// Admin Bonus Hunt Manager - Bonus Hunt sessions management
class AdminBonusHuntManager {
  constructor() {
    this.sessions = [];
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.selectedSessions = new Set();
  }

  // Initialize
  async init() {
    await this.loadAllSessions();
  }

  // Load all sessions from Firestore
  async loadAllSessions() {
    try {
      const snapshot = await window.db.collection('bonus-hunts').get();
      this.sessions = [];
      
      snapshot.forEach(doc => {
        const data = doc.data();
        this.sessions.push({
          id: doc.id,
          name: data.data?.name || 'Sans nom',
          createdAt: data.createdAt ? (data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt)) : new Date(),
          status: data.status || 'unknown',
          bonusCount: data.data?.metadata?.bonusCount || data.data?.bonuses?.length || 0,
          totalInvested: data.data?.metadata?.totalInvested || 0,
          totalCollected: data.data?.metadata?.totalCollected || 0,
          netResult: data.data?.metadata?.netResult || 0,
          shareableCode: data.shareableCode || '-',
          userId: data.userId || 'unknown',
          originalData: data
        });
      });

      // Sort by creation date (newest first)
      this.sessions.sort((a, b) => b.createdAt - a.createdAt);
    } catch (error) {
      console.error('Error loading bonus hunts:', error);
      showAdminToast('Erreur', 'Impossible de charger les Bonus Hunts', 'error');
    }
  }

  // Filter sessions
  filterSessions(filters = {}) {
    let filtered = [...this.sessions];

    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(search) ||
        s.shareableCode.toLowerCase().includes(search) ||
        s.id.toLowerCase().includes(search)
      );
    }

    if (filters.status) {
      filtered = filtered.filter(s => s.status === filters.status);
    }

    return filtered;
  }

  // Delete session
  async deleteSession(sessionId) {
    try {
      const session = this.sessions.find(s => s.id === sessionId);
      if (!session) throw new Error('Session non trouvée');

      // Delete from Firestore
      await window.db.collection('bonus-hunts').doc(sessionId).delete();

      // Remove from local array
      this.sessions = this.sessions.filter(s => s.id !== sessionId);

      // Log action
      if (typeof adminManager !== 'undefined') {
        adminManager.logAction({
            type: 'delete_bonushunt',
            details: `Bonus Hunt "${session.name}" supprimé`,
            tournamentId: sessionId // abusing this field
        });
      }

      showAdminToast('Succès', `Session "${session.name}" supprimée avec succès`, 'success');
      return true;
    } catch (error) {
      console.error('Error deleting session:', error);
      showAdminToast('Erreur', 'Impossible de supprimer la session', 'error');
      return false;
    }
  }

  // Generate Test Data
  async generateTestSession() {
      try {
          const sessionId = 'bh_test_' + Date.now();
          const timestamp = new Date();
          const session = {
              sessionId: sessionId,
              shareableCode: 'TEST' + Math.floor(Math.random() * 100),
              userId: 'admin_test',
              status: 'creation',
              createdAt: timestamp,
              updatedAt: timestamp,
              data: {
                  name: 'Test Session Admin',
                  huntPrice: 1000,
                  bonuses: [
                      { id: 1, name: 'Test Slot 1', stake: 10, bonusPrice: 1000, bonusValue: 1000 },
                      { id: 2, name: 'Test Slot 2', stake: 20, bonusPrice: 2000, bonusValue: 2000 }
                  ],
                  results: [],
                  metadata: {
                      bonusCount: 2,
                      totalInvested: 30,
                      totalCollected: 0,
                      netResult: -1000
                  }
              }
          };

          await window.db.collection('bonus-hunts').doc(sessionId).set(session);
          showAdminToast('Succès', 'Session de test générée', 'success');
          await this.loadAllSessions();
          return true;
      } catch (error) {
          console.error('Error generating test session:', error);
          showAdminToast('Erreur', 'Erreur création session test', 'error');
          return false;
      }
  }

  // Export Session
  exportSession(session) {
      return {
          ...session.originalData,
          exportedAt: new Date().toISOString()
      };
  }

  // Toggle selection
  toggleSessionSelection(sessionId) {
      if (this.selectedSessions.has(sessionId)) {
          this.selectedSessions.delete(sessionId);
      } else {
          this.selectedSessions.add(sessionId);
      }
      this.updateBulkActionsUI();
  }

  selectAllSessions(select = true) {
      if (select) {
          const search = document.getElementById('bonusHuntSearch')?.value || '';
          const status = document.getElementById('bonusHuntStatusFilter')?.value || '';
          const filtered = this.filterSessions({ search, status });
          filtered.forEach(s => this.selectedSessions.add(s.id));
      } else {
          this.selectedSessions.clear();
      }
      this.updateBulkActionsUI();
  }

  updateBulkActionsUI() {
      const count = this.selectedSessions.size;
      const container = document.getElementById('bonusHuntBulkActionsContainer');
      const countSpan = document.getElementById('bonusHuntSelectedCount');
      const deleteBtn = document.getElementById('bonusHuntDeleteSelectedBtn');
      const checkbox = document.getElementById('bonusHuntSelectAllCheckbox');

      if (countSpan) countSpan.textContent = count;
      
      if (container) {
          container.style.display = count > 0 ? 'flex' : 'none';
          if (deleteBtn) deleteBtn.disabled = count === 0;
      }

      if (checkbox) {
          const search = document.getElementById('bonusHuntSearch')?.value || '';
          const status = document.getElementById('bonusHuntStatusFilter')?.value || '';
          const filtered = this.filterSessions({ search, status });
          
          if (filtered.length === 0) {
              checkbox.checked = false;
              checkbox.indeterminate = false;
          } else if (this.selectedSessions.size === filtered.length) {
              checkbox.checked = true;
              checkbox.indeterminate = false;
          } else if (this.selectedSessions.size > 0) {
              checkbox.checked = false;
              checkbox.indeterminate = true;
          } else {
              checkbox.checked = false;
              checkbox.indeterminate = false;
          }
      }
  }

  async deleteSelectedSessions() {
      if (this.selectedSessions.size === 0) return;
      
      if (!confirm(`Supprimer ${this.selectedSessions.size} sessions ?`)) return;

      let deleted = 0;
      for (const id of this.selectedSessions) {
          if (await this.deleteSession(id)) deleted++;
      }

      this.selectedSessions.clear();
      this.updateBulkActionsUI();
      await this.loadAllSessions(); // Refresh list to be sure
  }
}

const adminBonusHuntManager = new AdminBonusHuntManager();
