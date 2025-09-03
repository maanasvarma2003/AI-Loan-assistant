/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        rural: {
          green: '#10b981',
          orange: '#f59e0b',
          brown: '#92400e',
          earth: '#78716c'
        },

      },
      fontFamily: {
        'hindi': ['Noto Sans Devanagari', 'Arial', 'sans-serif'],
        'regional': ['Noto Sans', 'Arial', 'sans-serif']
      },
      fontSize: {
        'xl-mobile': ['1.5rem', { lineHeight: '2rem' }],
        '2xl-mobile': ['2rem', { lineHeight: '2.5rem' }]
      },
      spacing: {
        'safe': 'env(safe-area-inset-bottom)'
      }
    },
  },
  plugins: [],
}
