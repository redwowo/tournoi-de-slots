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
            console.log(`Dernier mode visité: ${storedMode}`);
            // Plus de redirection automatique - l'utilisateur choisira manuellement
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