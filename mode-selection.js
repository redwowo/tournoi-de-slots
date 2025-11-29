// Gestion du menu de sélection du mode
class ModeSelection {
    constructor() {
        this.currentMode = null;
        this.storageKey = 'selectedMode';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeTheme();
        this.checkStoredMode();
    }

    setupEventListeners() {
        // Écouteurs pour les cartes de mode
        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', () => {
                const mode = card.dataset.mode;
                this.selectMode(mode);
            });
        });

        // Écouteur pour le logo de retour
        const logoHome = document.getElementById('logoHome');
        if (logoHome) {
            logoHome.addEventListener('click', () => {
                this.showModeSelection();
            });
        }
    }

    checkStoredMode() {
        const storedMode = localStorage.getItem(this.storageKey);
        if (storedMode && ['tournament', 'bonus-hunt'].includes(storedMode)) {
            this.currentMode = storedMode;
            this.showModeContent(storedMode);
        } else {
            this.showModeSelection();
        }
    }

    selectMode(mode) {
        this.currentMode = mode;
        localStorage.setItem(this.storageKey, mode);
        this.showModeContent(mode);
    }

    showModeContent(mode) {
        const modeSelectionScreen = document.getElementById('modeSelectionScreen');
        const tournamentContent = document.getElementById('tournamentContent');
        const bonusHuntContent = document.getElementById('bonusHuntContent');
        const logoHome = document.getElementById('logoHome');

        // Cacher l'écran de sélection
        modeSelectionScreen.style.display = 'none';

        // Afficher le logo de retour
        logoHome.style.display = 'block';

        switch (mode) {
            case 'tournament':
                tournamentContent.style.display = 'block';
                bonusHuntContent.style.display = 'none';
                
                // Initialiser l'application de tournoi si nécessaire
                if (typeof window.initializeTournamentApp === 'function') {
                    window.initializeTournamentApp();
                }
                break;
                
            case 'bonus-hunt':
                tournamentContent.style.display = 'none';
                bonusHuntContent.style.display = 'block';
                break;
                
            default:
                this.showModeSelection();
                break;
        }
    }

    showModeSelection() {
        const modeSelectionScreen = document.getElementById('modeSelectionScreen');
        const tournamentContent = document.getElementById('tournamentContent');
        const bonusHuntContent = document.getElementById('bonusHuntContent');
        const logoHome = document.getElementById('logoHome');

        // Afficher l'écran de sélection
        modeSelectionScreen.style.display = 'flex';
        
        // Cacher les contenus
        tournamentContent.style.display = 'none';
        bonusHuntContent.style.display = 'none';
        
        // Cacher le logo de retour
        logoHome.style.display = 'none';

        // Supprimer le mode stocké
        localStorage.removeItem(this.storageKey);
        this.currentMode = null;
    }

    getCurrentMode() {
        return this.currentMode;
    }

    resetMode() {
        this.showModeSelection();
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

// Initialiser le gestionnaire de mode quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    window.modeSelection = new ModeSelection();
});

// Fonctions globales pour la compatibilité
window.showModeSelection = () => {
    if (window.modeSelection) {
        window.modeSelection.showModeSelection();
    }
};

window.selectMode = (mode) => {
    if (window.modeSelection) {
        window.modeSelection.selectMode(mode);
    }
};

window.getCurrentMode = () => {
    return window.modeSelection ? window.modeSelection.getCurrentMode() : null;
};