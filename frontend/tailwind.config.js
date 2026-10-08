/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',
        navy: '#0d1b2a',
        steel: '#5f6c7b',
        accent: '#d9692b',
        'accent-soft': '#f4d9c9',
        warm: '#f5f5f4',
        slate: '#1f2937',
      },
      boxShadow: {
        industrial: '0 24px 58px rgba(15, 23, 42, 0.12)',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

