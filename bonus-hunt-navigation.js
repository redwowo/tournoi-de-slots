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
        const savedTheme = localStorage.getItem('theme') || 'dark';
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
        const icon = theme === 'dark' ? 'sun' : 'moon';
        toggle.innerHTML = `<i data-lucide="${icon}"></i>`;
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

// Initialiser la navigation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    window.bonusHuntNavigation = new BonusHuntNavigation();
});