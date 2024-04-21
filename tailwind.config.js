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
        'brandplaceholder': '#8B8B8B',
        'error': '#ff4949',
        'sidebaricon': '#8E8E93',
        'navbaraction': '#646464',
      }
    },
    
    screens: {
      'sm': {'min': '320px', 'max': '767px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': {'min': '768px', 'max': '1023px'},
      // // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '1024px', 'max': '1279px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': {'min': '1280px', 'max': '1535px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      'xxl': {'min': '1920px', 'max': '2560px'},
        //insert styles here...
    
      '2xl': {'min': '1536px'},
      // => @media (min-width: 1536px) { ... }
    }
    
  },
  plugins: [],
};
