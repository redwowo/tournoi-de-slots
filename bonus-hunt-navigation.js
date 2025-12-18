// Navigation pour la page bonus-hunt
class BonusHuntNavigation {
    constructor() {
        this.storageKey = 'lastVisitedMode';
        this.init();
    }

    init() {
        this.initializeTheme();
        this.storeCurrentMode();
    }

    storeCurrentMode() {
        localStorage.setItem(this.storageKey, 'bonus-hunt');
    }

    initializeTheme() {
        // Initialiser le thème depuis localStorage
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.className = savedTheme;
        
        // Mettre à jour le bouton toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            this.updateThemeToggleIcon(themeToggle, savedTheme);
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.className;
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                document.documentElement.className = newTheme;
                localStorage.setItem('theme', newTheme);
                this.updateThemeToggleIcon(themeToggle, newTheme);
            });
        }
    }

    updateThemeToggleIcon(toggle, theme) {
        if (!toggle) return;
        // En mode light : afficher lune.png (pour passer au dark)
        // En mode dark : afficher soleil.png (pour passer au light)
        if (theme === 'dark') {
            toggle.innerHTML = '<img src="/soleil.png" alt="Soleil" class="theme-icon">';
            toggle.setAttribute('aria-label', 'Passer au thème clair');
        } else {
            toggle.innerHTML = '<img src="/lune.png" alt="Lune" class="theme-icon">';
            toggle.setAttribute('aria-label', 'Passer au thème sombre');
        }
    }
}

// Initialiser la navigation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    window.bonusHuntNavigation = new BonusHuntNavigation();
});