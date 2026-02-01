/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a192f',
        secondary: '#64ffda',
        dark: '#020c1b',
        light: '#ccd6f6',
        slate: '#8892b0',
      },
      fontFamily: {
        sans: ['Roboto Mono', 'monospace'],
        mono: ['Fira Code', 'monospace'],
        chinese: ['Noto Sans SC', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 5px #64ffda, 0 0 10px #64ffda' },
          '100%': { textShadow: '0 0 20px #64ffda, 0 0 30px #64ffda' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}