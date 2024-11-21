import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        orangeSite: "#E77A00",
        yellowSite: "#FFB703",
        lightBlueSite: "#8ECAE6",
        darkBlueSite: "#023047",
        blueSite: "#219EBC",
        darkGraySite: "#333333",
        lightGraySite: "#F7F7F7",
        graySite: "#9da3ae",
      },
      boxShadow: {
        'right-only': "10px 0 15px -3px rgba(0,0,0,0.1), 4px 0 6px -4px rgba(0,0,0,0.1)",
        'left-only' : "-10px 0 15px -3px rgba(0, 0, 0, 0.1), -4px 0 6px -2px rgba(0, 0, 0, 0.1)"
      },
      backgroundImage:{
        'back-image' : "url('/src/assets/full-car-parking-lot-mall.jpg')"
      }
    },
  },
  plugins: [],
} satisfies Config;
