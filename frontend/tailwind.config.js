/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF711F',
          orangeHover: '#e86214',
          orangeLight: '#FFF2E8',
          warmBg: '#FFF8EC',
          warmCard: '#FFFFFF',
          deepBlue: '#214B9D',
          deepBlueHover: '#183b7f',
          deepBlueLight: '#EEF4FF',
          lightBlue: '#629BEA',
          lightBlueBg: '#F0F6FE',
          darkText: '#172033',
          mutedText: '#667085',
          border: '#E7E1D7',
          success: '#2E8B67',
          successLight: '#EBF7F1',
          warning: '#D97706',
          warningLight: '#FEF3C7',
          danger: '#DC2626',
          dangerLight: '#FEE2E2',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(23, 32, 51, 0.05), 0 1px 2px -1px rgba(23, 32, 51, 0.05)',
        'card': '0 2px 6px -1px rgba(23, 32, 51, 0.06), 0 1px 4px -1px rgba(23, 32, 51, 0.04)',
      },
    },
  },
  plugins: [],
};
