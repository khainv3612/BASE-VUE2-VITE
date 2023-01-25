module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite'
      },
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
