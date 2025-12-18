// Centralized Theme Manager for all pages
class ThemeManager {
    constructor() {
        this.storageKey = 'theme';
        this.defaultTheme = 'light';
        this.themeToggle = null;
        this.init();
    }

    init() {
        // Try to find and attach to existing button
        this.attachToButton();

        // If button not found immediately, use MutationObserver as fallback
        if (!this.themeToggle) {
            this.observeForButton();
        }
    }

    attachToButton() {
        this.themeToggle = document.getElementById('themeToggle');
        
        if (this.themeToggle) {
            // Get current theme
            const currentTheme = document.documentElement.className || this.defaultTheme;
            
            // Update the icon
            this.updateThemeToggleIcon(currentTheme);
            
            // Attach click handler
            this.themeToggle.addEventListener('click', (e) => this.handleToggleClick(e));
            
            console.log('✅ ThemeManager: Successfully attached to themeToggle button');
            return true;
        }
        
        return false;
    }

    observeForButton() {
        // Use MutationObserver as a fallback for dynamic DOM
        const observer = new MutationObserver(() => {
            if (!this.themeToggle && this.attachToButton()) {
                // Button found, stop observing
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    handleToggleClick(event) {
        event.preventDefault();
        event.stopPropagation();

        const currentTheme = document.documentElement.className;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Apply new theme
        document.documentElement.className = newTheme;
        localStorage.setItem(this.storageKey, newTheme);
        
        // Update icon
        this.updateThemeToggleIcon(newTheme);

        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: newTheme }
        }));

        console.log(`🎨 Theme switched from ${currentTheme} to ${newTheme}`);
    }

    updateThemeToggleIcon(theme) {
        if (!this.themeToggle) return;

        if (theme === 'dark') {
            this.themeToggle.innerHTML = '<img src="/soleil.png" alt="Soleil" class="theme-icon">';
            this.themeToggle.setAttribute('aria-label', 'Passer au thème clair');
        } else {
            this.themeToggle.innerHTML = '<img src="/lune.png" alt="Lune" class="theme-icon">';
            this.themeToggle.setAttribute('aria-label', 'Passer au thème sombre');
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.themeManager = new ThemeManager();
    });
} else {
    // DOM is already loaded (e.g., if this script is loaded later)
    window.themeManager = new ThemeManager();
}
