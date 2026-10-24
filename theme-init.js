// Always force 100% Dark Theme across the entire site
(function() {
  document.documentElement.className = 'dark';
  try {
    localStorage.setItem('theme', 'dark');
  } catch (e) {}
})();
