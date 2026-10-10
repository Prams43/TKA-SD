/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        theme: {
          bg: 'var(--bg-main)',
          surface: 'var(--bg-surface)',
          subtle: 'var(--bg-subtle)',
          text: 'var(--text-main)',
          muted: 'var(--text-muted)',
          accent: 'var(--accent-main)',
          'accent-hover': 'var(--accent-main-hover)',
          'accent-tint': 'var(--accent-main-tint)',
          sec: 'var(--accent-sec)',
          'sec-hover': 'var(--accent-sec-hover)',
          'sec-tint': 'var(--accent-sec-tint)',
          border: 'var(--border-color)',
        },
        primary: {
          50: '#FAECE6',
          100: '#F5D7CC',
          200: '#EAB29E',
          300: '#DF8D70',
          400: '#D56D49',
          500: '#C25E38',
          600: '#C25E38',
          700: '#A94D2B',
          800: '#8A3C20',
          900: '#261C14',
        },
      },
    },
  },
  plugins: [],
}
