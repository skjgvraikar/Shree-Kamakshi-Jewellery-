/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "var(--gold)",
          light: "var(--gold-light)",
          dark: "var(--gold-dark)",
          pale: "var(--gold-pale)",
        },
        deep: "var(--deep)",
        cream: "var(--cream)",
        silver: {
          DEFAULT: "var(--silver)",
          light: "var(--silver-light)",
          dark: "var(--silver-dark)",
        },
        ruby: "var(--red)",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Noto Sans Kannada"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        kannada: ['"Noto Sans Kannada"', '"Plus Jakarta Sans"', 'sans-serif'],
        cinzel: ['Cinzel', 'Georgia', 'serif'],
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(201, 168, 76, 0.28)',
        'gold-glow-lg': '0 0 45px rgba(201, 168, 76, 0.4)',
        'gold-inner': 'inset 0 0 15px rgba(201, 168, 76, 0.2)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #c9a84c 0%, #f0d080 50%, #8b6914 100%)',
        'gold-gradient-hover': 'linear-gradient(135deg, #f0d080 0%, #c9a84c 50%, #fdf3d0 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(30, 20, 5, 0.85) 0%, rgba(10, 6, 2, 0.95) 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(201, 168, 76, 0.1) 0%, rgba(15, 10, 2, 0.7) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      }
    },
  },
  plugins: [],
}
