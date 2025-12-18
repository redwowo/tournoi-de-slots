// Theme Initialization Script - Must run BEFORE page renders
(function() {
  const savedTheme = localStorage.getItem('theme');
  let theme = 'light'; // Default theme

  // If theme is saved, use it
  if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
    theme = savedTheme;
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Check system preference
    theme = 'dark';
  }

  // Apply theme immediately before page renders
  document.documentElement.className = theme;
  localStorage.setItem('theme', theme);
})();
