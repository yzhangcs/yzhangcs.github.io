(function() {
  'use strict';

  const STORAGE_KEY = 'theme-preference';

  const getColorPreference = () => {
    if (localStorage.getItem(STORAGE_KEY)) {
      return localStorage.getItem(STORAGE_KEY);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const reflectPreference = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;

    const button = document.querySelector('#theme-toggle');
    if (button) {
      button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');

      const icon = button.querySelector('i');
      if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }
    }
  };

  const setPreference = (theme) => {
    localStorage.setItem(STORAGE_KEY, theme);
    reflectPreference(theme);
  };

  reflectPreference(getColorPreference());

  const syncButtonWhenAvailable = () => {
    if (document.querySelector('#theme-toggle')) {
      reflectPreference(document.documentElement.getAttribute('data-theme') || getColorPreference());
    } else {
      window.setTimeout(syncButtonWhenAvailable, 25);
    }
  };

  syncButtonWhenAvailable();

  document.addEventListener('click', (event) => {
    const button = event.target.closest && event.target.closest('#theme-toggle');
    if (!button) return;

    const currentTheme = document.documentElement.getAttribute('data-theme') || getColorPreference();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setPreference(newTheme);
  });

  // Listen for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleSystemThemeChange = ({matches: isDark}) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      reflectPreference(isDark ? 'dark' : 'light');
    }
  };

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleSystemThemeChange);
  } else if (mediaQuery.addListener) {
    mediaQuery.addListener(handleSystemThemeChange);
  }
})();
