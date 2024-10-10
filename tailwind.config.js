/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'brandprimary': '#1E71F2',
        'brandplaceholder': '#BDBDBD',
        'error': '#ff4949',
        'sidebaricon': '#8E8E93',
        'navbaraction': '#646464',
      }
    },
    
    screens: {
      'sm': {'min': '320px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      // 'sm2': {'min':'600px', 'max': '767px'},
      'nsm': {'min': '640px'},

      'md': {'min': '768px'},
      // // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '1024px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': {'min': '1280px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      // 'xxl': {'min': '1920px', 'max': '2560px'},
        //insert styles here...
    
      '2xl': {'min': '1536px'},
      // => @media (min-width: 1536px) { ... }
    }
    
  },
  plugins: [],
};