/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: {
            DEFAULT: '#1B3766',
            dark: '#122544',
            darker: '#0B172B',
            light: '#284C85',
            subtle: '#EBF2FA',
          },
          accent: {
            DEFAULT: '#FD8127',
            hover: '#E06A14',
            active: '#C4570B',
            subtle: '#FFF4EC',
          },
        },
        surface: {
          base: 'var(--color-bg-base)',
          alt: 'var(--color-bg-alt)',
          card: 'var(--color-bg-surface)',
          elevated: 'var(--color-bg-surface-elevated)',
          sunken: 'var(--color-bg-surface-sunken)',
        },
        status: {
          success: {
            DEFAULT: '#10B981',
            text: '#15803D',
            bg: '#F0FDF4',
            border: '#BBF7D0',
          },
          warning: {
            DEFAULT: '#F59E0B',
            text: '#D97706',
            bg: '#FFFBEB',
            border: '#FDE68A',
          },
          error: {
            DEFAULT: '#EF4444',
            text: '#DC2626',
            bg: '#FEF2F2',
            border: '#FECACA',
          },
          info: {
            DEFAULT: '#0EA5E9',
            text: '#0284C7',
            bg: '#F0F9FF',
            border: '#BAE6FD',
          },
        },
      },
      fontFamily: {
        heading: ['Outfit', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card-subtle': '0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)',
        'card-elevated': '0 4px 8px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -1px rgba(15, 23, 42, 0.05)',
        'card-floating': '0 12px 24px rgba(0, 0, 0, 0.15)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      borderRadius: {
        'button': '12px',
        'pill': '9999px',
        'card': '16px',
      },
    },
  },
  plugins: [],
};
