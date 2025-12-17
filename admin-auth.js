// Admin Authentication Module
class AdminAuth {
  constructor() {
    this.isAuthenticated = false;
    this.sessionTimeout = 30 * 60 * 1000; // 30 minutes
    this.inactivityTimeout = null;
    this.sessionExpiresAt = null;
    this.sessionVerifyPromise = null;

    this.sessionVerifyPromise = this.verifySession();
  }

  init() {
    this.createAdminButton();
    this.setupEventListeners();
  }

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

  setupEventListeners() {
    const adminBtn = document.getElementById('adminModeBtn');
    if (adminBtn) {
      adminBtn.addEventListener('click', () => {
        this.handleAdminButtonClick();
      });
    }

    const activityHandler = () => {
      if (this.isAuthenticated) {
        this.resetInactivityTimer();
      }
    };

    document.addEventListener('keydown', activityHandler);
    document.addEventListener('click', activityHandler);
  }

  async handleAdminButtonClick() {
    const authed = await this.ensureAuthenticated();
    if (authed) {
      window.location.href = '/admin-panel.html';
      return;
    }

    this.showAuthModal();
  }

  async ensureAuthenticated() {
    if (this.sessionVerifyPromise) {
      await this.sessionVerifyPromise;
      this.sessionVerifyPromise = null;
    }

    if (this.isAuthenticated && this.sessionExpiresAt && Date.now() < this.sessionExpiresAt) {
      return true;
    }

    await this.verifySession();
    return Boolean(this.isAuthenticated && this.sessionExpiresAt && Date.now() < this.sessionExpiresAt);
  }

  async verifySession() {
    try {
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({})
      });

      if (!response.ok) {
        this.isAuthenticated = false;
        this.sessionExpiresAt = null;
        return false;
      }

      const data = await response.json().catch(() => null);
      if (!data?.valid || !data?.expiresAt) {
        this.isAuthenticated = false;
        this.sessionExpiresAt = null;
        return false;
      }

      this.isAuthenticated = true;
      this.sessionExpiresAt = Number(data.expiresAt);
      this.resetInactivityTimer();
      return true;
    } catch (error) {
      this.isAuthenticated = false;
      this.sessionExpiresAt = null;
      return false;
    }
  }

  showAuthModal() {
    const existingModal = document.getElementById('adminAuthModal');
    if (existingModal) return;

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
    if (input) {
      input.focus();
      input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          this.authenticate();
        }
      });
    }

    const overlay = modal.querySelector('.admin-auth-overlay');
    overlay?.addEventListener('click', () => {
      modal.remove();
    });
  }

  async authenticate() {
    const input = document.getElementById('adminCodeInput');
    const errorDiv = document.getElementById('adminAuthError');

    if (!input || !errorDiv) return;

    const code = String(input.value || '').trim();
    errorDiv.textContent = '';

    if (!code) {
      errorDiv.textContent = 'Veuillez entrer le code.';
      input.focus();
      return;
    }

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ code })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        errorDiv.textContent = data?.error || 'Code incorrect. Veuillez réessayer.';
        input.value = '';
        input.focus();
        return;
      }

      const data = await response.json().catch(() => ({}));
      this.isAuthenticated = true;
      this.sessionExpiresAt = Number(data?.expiresAt) || null;
      this.resetInactivityTimer();

      const modal = document.getElementById('adminAuthModal');
      modal?.remove();

      window.location.href = '/admin-panel.html';
    } catch (error) {
      errorDiv.textContent = "Impossible de vérifier le code. Réessayez.";
    }
  }

  resetInactivityTimer() {
    if (this.inactivityTimeout) {
      clearTimeout(this.inactivityTimeout);
    }

    this.inactivityTimeout = setTimeout(() => {
      this.logout('Votre session a expiré due à une inactivité prolongée.');
    }, this.sessionTimeout);
  }

  async logout(message = 'Vous avez été déconnecté.') {
    this.isAuthenticated = false;
    this.sessionExpiresAt = null;

    if (this.inactivityTimeout) {
      clearTimeout(this.inactivityTimeout);
      this.inactivityTimeout = null;
    }

    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({})
      });
    } catch (error) {
      // Best effort
    }

    const toast = document.createElement('div');
    toast.className = 'admin-logout-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 4000);

    if (window.location.pathname.includes('admin-panel')) {
      setTimeout(() => {
        window.location.href = '/';
      }, 800);
    }
  }

  isAdminAuthenticated() {
    return this.isAuthenticated;
  }

  getSessionRemainingTime() {
    if (!this.isAuthenticated || !this.sessionExpiresAt) return 0;
    const remaining = Math.max(0, this.sessionExpiresAt - Date.now());
    return Math.ceil(remaining / 1000);
  }
}

const adminAuthManager = new AdminAuth();

document.addEventListener('DOMContentLoaded', () => {
  adminAuthManager.init();
});
