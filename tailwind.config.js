/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './{gatsby-*.js,gatsby-*.tsx,rootWrapper.tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#fafafa',
        ink: '#141414',
        muted: '#666666',
        line: '#dedede',
        brand: '#141414',
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
