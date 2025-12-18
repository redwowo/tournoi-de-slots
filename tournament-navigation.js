// Navigation pour la page de tournoi
class TournamentNavigation {
    constructor() {
        this.storageKey = 'lastVisitedMode';
        this.init();
    }

    init() {
        this.initializeTheme();
        this.storeCurrentMode();
        this.updateBackButtonForSpectator();
    }

    storeCurrentMode() {
        localStorage.setItem(this.storageKey, 'tournament');
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
        if (theme === 'dark') {
            toggle.innerHTML = '<img src="/soleil.png" alt="Soleil" class="theme-icon">';
            toggle.setAttribute('aria-label', 'Passer au thème clair');
        } else {
            toggle.innerHTML = '<img src="/lune.png" alt="Lune" class="theme-icon">';
            toggle.setAttribute('aria-label', 'Passer au thème sombre');
        }
    }

    updateBackButtonForSpectator() {
        // Vérifier si on est en mode spectateur
        const spectatorMode = localStorage.getItem('spectatorMode') === 'true';
        const backButton = document.getElementById('backButton');
        
        if (backButton) {
            if (spectatorMode) {
                // En mode spectateur, le bouton retour mène à /tournoi
                backButton.href = '/tournoi';
                backButton.title = 'Retour à la page des tournois';
            } else {
                // En mode normal, le bouton retour mène à / (menu principal)
                backButton.href = '/';
                backButton.title = 'Retour au menu principal';
            }
        }
    }
}

// Initialiser la navigation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    window.tournamentNavigation = new TournamentNavigation();
    
    // Initialiser l'application de tournoi si nécessaire
    if (typeof window.initializeTournamentApp === 'function') {
        window.initializeTournamentApp();
    }
});