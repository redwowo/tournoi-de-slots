// Centralized Theme Manager - Fixed to permanent Dark Mode
class ThemeManager {
    constructor() {
        this.storageKey = 'theme';
        this.defaultTheme = 'dark';
        this.init();
    }

    init() {
        document.documentElement.className = 'dark';
        try {
            localStorage.setItem(this.storageKey, 'dark');
        } catch (e) {}
    }
}

window.themeManager = new ThemeManager();
