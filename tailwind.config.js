/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './{gatsby-*.js,gatsby-*.tsx,rootWrapper.tsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--paper) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        brand: 'rgb(var(--brand) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['Source Serif 4 Variable', 'Iowan Old Style', 'Baskerville', 'Georgia', 'serif'],
        condensed: ['IBM Plex Sans Condensed', 'Arial Narrow', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.12em',
      },
    },
  },
  plugins: [],
}
