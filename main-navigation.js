// Navigation principale pour la page d'accueil
class MainNavigation {
    constructor() {
        this.storageKey = 'lastVisitedMode';
        this.init();
    }

    init() {
        this.initializeTheme();
        this.checkStoredMode();
    }

    checkStoredMode() {
        const storedMode = localStorage.getItem(this.storageKey);
        if (storedMode && ['tournament', 'bonus-hunt'].includes(storedMode)) {
            // Optionnel: redirection automatique vers le dernier mode visité après 2 secondes
            console.log(`Dernier mode visité: ${storedMode}`);
            
            // Ajouter une notification pour informer l'utilisateur
            const toastContainer = document.getElementById('toastContainer');
            if (toastContainer) {
                const toast = document.createElement('div');
                toast.className = 'toast toast-info';
                toast.innerHTML = `
                    <div class="toast-content">
                        <span class="toast-icon">ℹ️</span>
                        <span class="toast-message">Redirection vers ${storedMode === 'tournament' ? 'Tournoi' : 'Bonus-Hunt'} dans 2 secondes...</span>
                        <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
                    </div>
                `;
                toastContainer.appendChild(toast);
                
                // Auto-remove after 3 seconds
                setTimeout(() => {
                    if (toast.parentElement) {
                        toast.remove();
                    }
                }, 3000);
            }
            
            // Rediriger après 2 secondes
            setTimeout(() => {
                window.location.href = `/${storedMode}`;
            }, 2000);
        }
    }

    initializeTheme() {
        // Initialiser le thème depuis localStorage
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.className = savedTheme;
        
        // Mettre à jour le bouton toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌓';
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.className;
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                document.documentElement.className = newTheme;
                localStorage.setItem('theme', newTheme);
                themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌓';
            });
        }
    }
}

// Initialiser la navigation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    window.mainNavigation = new MainNavigation();
});