/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       colors: {
        'primary': '#7455F7',   
        'secondary': '#F8F6FF',  
        'background': '#FFFFFF',
        'textdark': '#262626',
      }
    },
  },
  plugins: [],
}