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
        console.log('🏷️ TournamentNavigation: Initializing theme...');
        
        // Initialiser le thème depuis localStorage
        const savedTheme = localStorage.getItem('theme') || 'light';
        console.log('🏷️ TournamentNavigation: Saved theme:', savedTheme);
        document.documentElement.className = savedTheme;

        // Mettre à jour le bouton toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            console.log('🏷️ TournamentNavigation: Theme toggle button found');
            this.updateThemeToggleIcon(themeToggle, savedTheme);
            
            // Remove existing listeners to avoid duplicates
            const newThemeToggle = themeToggle.cloneNode(true);
            themeToggle.parentNode.replaceChild(newThemeToggle, themeToggle);
            
            newThemeToggle.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                console.log('🏷️ TournamentNavigation: Theme toggle clicked');
                
                const currentTheme = document.documentElement.className;
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                console.log('🏷️ TournamentNavigation: Switching theme from', currentTheme, 'to', newTheme);
                
                document.documentElement.className = newTheme;
                localStorage.setItem('theme', newTheme);
                this.updateThemeToggleIcon(newThemeToggle, newTheme);
                
                // Trigger a custom event to notify other components
                window.dispatchEvent(new CustomEvent('themeChanged', { 
                    detail: { theme: newTheme } 
                }));
            });
        } else {
            console.error('🏷️ TournamentNavigation: Theme toggle button not found!');
        }
    }

    updateThemeToggleIcon(toggle, theme) {
        if (!toggle) return;
        console.log('🏷️ TournamentNavigation: Updating theme icon for theme:', theme);
        
        // En mode dark : afficher soleil.png (pour passer au light)
        // En mode light : afficher lune.png (pour passer au dark)
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