/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#FE2C55",
        secondary: "#25F4EE",
        "background-light": "#F8F9FA",
        "background-dark": "#0F0F0F",
        "surface-light": "#FFFFFF",
        "surface-dark": "#1E1E1E",
      },
    },
  },
  plugins: [],
};
export default config;
