/**  @type {import('tailwindcss').Config}  */
export default {
  content: [
    "./index.html",              // 👈 pulls classes from the root HTML
    "./src/**/*.{js,jsx,ts,tsx}",// 👈 grabs everything you might write in /src
  ],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          "0%":   { backgroundPosition: "0% 50%"   },
          "50%":  { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%"   },
        },
      },
      animation: {
        gradient: "gradient 3s ease infinite",
      },
    },
  },
  plugins: [],
};
