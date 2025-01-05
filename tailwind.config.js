const konstaConfig = require('konsta/config'); 

module.exports = konstaConfig({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        customPink: '#FFC1C1',
      },
    },
  },
  plugins: [],
});
