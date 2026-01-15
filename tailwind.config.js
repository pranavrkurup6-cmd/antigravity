/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#727D71', // Olive Green
          hover: '#5F695E',
          light: '#AAB3AB',
        },
        secondary: '#D0C8B8', // Beige/Sand secondary
        accent: '#D4A373', // Warm accent
        nature: {
          50: '#FAF9F6', // Off-white/Cream
          100: '#F0EFEB',
          200: '#E6E4DC',
          800: '#4A5043', // Dark Olive
          900: '#2C3329',
        },
        dark: {
          bg: '#1C1C1E',
          card: '#2C2C2E',
          text: '#F2F2F7',
        },
        light: {
          bg: '#FAF9F6', // Cream background default
          card: '#FFFFFF',
          text: '#2C3329',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0,0,0,0.06)',
      },
      animation: {
        'bounce-subtle': 'bounce-subtle 0.25s ease-in-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        'bounce-subtle': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
