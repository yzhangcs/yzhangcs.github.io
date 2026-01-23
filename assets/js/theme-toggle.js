(function() {
  'use strict';

  const STORAGE_KEY = 'theme-preference';

  const getColorPreference = () => {
    if (localStorage.getItem(STORAGE_KEY)) {
      return localStorage.getItem(STORAGE_KEY);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const setPreference = (theme) => {
    localStorage.setItem(STORAGE_KEY, theme);
    reflectPreference(theme);
  };

  const reflectPreference = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);

    const button = document.querySelector('#theme-toggle');
    if (button) {
      button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');

      const icon = button.querySelector('i');
      if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }
    }
  };

  // Set initial theme
  const theme = getColorPreference();
  reflectPreference(theme);

  // Toggle on button click
  window.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('#theme-toggle');
    if (button) {
      button.addEventListener('click', () => {
        const currentTheme = localStorage.getItem(STORAGE_KEY) ||
          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setPreference(newTheme);
      });
    }
  });

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({matches: isDark}) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setPreference(isDark ? 'dark' : 'light');
    }
  });
})();
