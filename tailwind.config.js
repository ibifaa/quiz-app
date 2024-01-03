/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["views/**/*.ejs"],
  theme: {
    extend: {
      
        fontFamily: {
          iA: ["Inknut Antiqua", "Inter" , "sans-serif"],
          inter: ['Inter', 'sans-serif']
        },
    },
  },
  plugins: [],
}

