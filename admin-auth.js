// Admin Authentication Module
class AdminAuth {
  constructor() {
    this.isAuthenticated = false;
    this.adminCode = 'golopodie';
    this.sessionTimeout = 30 * 60 * 1000; // 30 minutes
    this.inactivityTimeout = null;
    this.sessionStartTime = null;
    this.restoreSession();
  }

  // Initialize authentication
  init() {
    this.createAdminButton();
    this.setupEventListeners();
    if (this.isAuthenticated) {
      this.resetInactivityTimer();
    }
  }

  // Create the discrete admin button
  createAdminButton() {
    const existingBtn = document.getElementById('adminModeBtn');
    if (existingBtn) return;

    const adminBtn = document.createElement('button');
    adminBtn.id = 'adminModeBtn';
    adminBtn.className = 'admin-button';
    adminBtn.innerHTML = '⚙️';
    adminBtn.title = 'Mode Admin';
    
    document.body.appendChild(adminBtn);
  }

  // Setup event listeners
  setupEventListeners() {
    const adminBtn = document.getElementById('adminModeBtn');
    if (adminBtn) {
      adminBtn.addEventListener('click', () => this.showAuthModal());
    }

    document.addEventListener('keydown', () => {
      if (this.isAuthenticated) {
        this.resetInactivityTimer();
      }
    });
    
    document.addEventListener('click', () => {
      if (this.isAuthenticated) {
        this.resetInactivityTimer();
      }
    });
  }

  // Show authentication modal
  showAuthModal() {
    if (this.isAuthenticated) {
      // If already authenticated, open admin panel
      window.location.href = '/admin-panel.html';
      return;
    }

    const modal = document.createElement('div');
    modal.className = 'admin-auth-modal';
    modal.id = 'adminAuthModal';
    modal.innerHTML = `
      <div class="admin-auth-overlay"></div>
      <div class="admin-auth-container">
        <div class="admin-auth-header">
          <h2>Authentification Admin</h2>
          <button class="admin-auth-close" onclick="this.closest('.admin-auth-modal').remove()">✕</button>
        </div>
        <div class="admin-auth-body">
          <input 
            type="password" 
            id="adminCodeInput" 
            class="admin-code-input" 
            placeholder="Entrez le code d'accès"
            autocomplete="off"
          >
          <div class="admin-auth-error" id="adminAuthError"></div>
        </div>
        <div class="admin-auth-footer">
          <button class="btn-outline" onclick="this.closest('.admin-auth-modal').remove()">Annuler</button>
          <button class="btn-primary" onclick="adminAuthManager.authenticate()">Accéder</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    const input = document.getElementById('adminCodeInput');
    input.focus();

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.authenticate();
      }
    });

    // Close on overlay click
    const overlay = modal.querySelector('.admin-auth-overlay');
    overlay.addEventListener('click', () => {
      modal.remove();
    });
  }

  // Authenticate with code
  authenticate() {
    const input = document.getElementById('adminCodeInput');
    const code = input.value.trim();
    const errorDiv = document.getElementById('adminAuthError');

    if (code === this.adminCode) {
      this.isAuthenticated = true;
      this.sessionStartTime = Date.now();
      this.saveSession();
      this.resetInactivityTimer();
      
      const modal = document.getElementById('adminAuthModal');
      if (modal) modal.remove();
      
      window.location.href = '/admin-panel.html';
    } else {
      errorDiv.textContent = 'Code incorrect. Veuillez réessayer.';
      input.value = '';
      input.focus();
    }
  }

  // Reset inactivity timer
  resetInactivityTimer() {
    if (this.inactivityTimeout) {
      clearTimeout(this.inactivityTimeout);
    }

    this.inactivityTimeout = setTimeout(() => {
      this.logout('Votre session a expiré due à une inactivité prolongée.');
    }, this.sessionTimeout);
  }

  // Save session to localStorage
  saveSession() {
    localStorage.setItem('adminAuthenticated', 'true');
    localStorage.setItem('adminSessionStartTime', this.sessionStartTime);
  }

  // Restore session from localStorage
  restoreSession() {
    const isAuth = localStorage.getItem('adminAuthenticated');
    const startTime = localStorage.getItem('adminSessionStartTime');

    if (isAuth === 'true' && startTime) {
      const elapsed = Date.now() - parseInt(startTime);
      if (elapsed < this.sessionTimeout) {
        this.isAuthenticated = true;
        this.sessionStartTime = parseInt(startTime);
        this.resetInactivityTimer();
      } else {
        this.logout();
      }
    }
  }

  // Logout
  logout(message = 'Vous avez été déconnecté.') {
    this.isAuthenticated = false;
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminSessionStartTime');
    
    if (this.inactivityTimeout) {
      clearTimeout(this.inactivityTimeout);
    }

    // Show notification
    const toast = document.createElement('div');
    toast.className = 'admin-logout-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 4000);

    // Redirect if on admin panel
    if (window.location.pathname.includes('admin-panel')) {
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    }
  }

  // Check if authenticated
  isAdminAuthenticated() {
    return this.isAuthenticated;
  }

  // Get session remaining time in seconds
  getSessionRemainingTime() {
    if (!this.isAuthenticated || !this.sessionStartTime) return 0;
    const elapsed = Date.now() - this.sessionStartTime;
    const remaining = Math.max(0, this.sessionTimeout - elapsed);
    return Math.ceil(remaining / 1000);
  }
}

// Global instance
const adminAuthManager = new AdminAuth();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  adminAuthManager.init();
});
