const STORAGE_KEY = 'jdc_theme';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

export function initThemeSwitcher() {
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const initialTheme = savedTheme === THEME_LIGHT ? THEME_LIGHT : THEME_DARK;

  applyTheme(initialTheme);

  const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || THEME_DARK;
      const nextTheme = currentTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
      
      // 1. Trigger radiant celestial ripple
      btn.classList.remove('is-transitioning');
      void btn.offsetWidth; // Force reflow to re-trigger animation
      btn.classList.add('is-transitioning');
      setTimeout(() => btn.classList.remove('is-transitioning'), 550);

      // 2. Micro-haptic tactile spring depression via native WAAPI
      btn.animate(
        [{ transform: 'scale(0.86)' }, { transform: 'scale(1)' }],
        { duration: 350, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }
      );

      // 3. Apply theme and persist
      applyTheme(nextTheme);
      localStorage.setItem(STORAGE_KEY, nextTheme);
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);

  const isDark = theme === THEME_DARK;
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';

  const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
  toggleButtons.forEach(btn => {
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
  });
}
