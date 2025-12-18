// Navigation principale pour la page d'accueil
class MainNavigation {
    constructor() {
        this.storageKey = 'lastVisitedMode';
        this.init();
    }

    init() {
        this.checkLegacyTournamentLinks();
        this.initializeTheme();
        this.checkStoredMode();
    }

    checkLegacyTournamentLinks() {
        // Check for legacy tournament links and redirect to proper tournament page
        const urlParams = new URLSearchParams(window.location.search);
        const tournamentId = urlParams.get('tournament');
        
        if (tournamentId) {
            // Set spectator mode in localStorage
            localStorage.setItem('spectatorMode', 'true');
            
            // Redirect to tournament page with same parameter
            window.location.href = `/tournoi?tournament=${tournamentId}`;
            return;
        }
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
    window.mainNavigation = new MainNavigation();
});