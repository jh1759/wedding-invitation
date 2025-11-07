import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#D4B5A7', // 웜톤 베이지핑크
          secondary: '#F6F2ED', // 아이보리 크림
          accent: '#A9CBB7', // 세이지 그린 포인트
          ink: '#4B3B36', // 부드러운 딥 브라운
        },
        pastel: {
          pink: '#FFE5E5', // 피치핑크
          cream: '#FFF9F6', // 크림화이트
          sage: '#A9CBB7', // 세이지그린
          beige: '#F6F2ED', // 베이지
        }
      },
      fontFamily: {
        sans: [
          '"Noto Sans KR"',
          '"Pretendard Variable"',
          '"Apple SD Gothic Neo"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        display: [
          '"Playfair Display"',
          '"Cormorant Garamond"',
          '"SUIT"',
          '"Pretendard Variable"',
          'serif',
        ],
        script: [
          '"Great Vibes"',
          'cursive',
        ],
        body: [
          '"Noto Sans KR"',
          '"Pretendard Variable"',
          'sans-serif',
        ],
      },
      fontSize: {
        'h1': ['clamp(2rem, 5vw, 3rem)', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
        'h2': ['clamp(1.75rem, 4vw, 2.5rem)', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        'h3': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        'body': ['clamp(1rem, 2vw, 1.125rem)', { lineHeight: '1.75' }],
        'body-lg': ['clamp(1.125rem, 2.5vw, 1.25rem)', { lineHeight: '1.75' }],
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '1.75rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 30px rgba(0, 0, 0, 0.05)',
        'gentle': '0 2px 20px rgba(212, 181, 167, 0.15)',
        'elegant': '0 10px 40px rgba(212, 181, 167, 0.15)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.08)',
      },
      spacing: {
        'section': '5rem',
        'section-lg': '6rem',
      },
      letterSpacing: {
        'wide': '0.05em',
        'wider': '0.1em',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          md: '1.5rem',
        },
        screens: {
          DEFAULT: '100%',
          md: '768px',
        },
      },
    },
  },
  plugins: [],
} satisfies Config

