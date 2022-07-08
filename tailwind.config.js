/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,jsx}"],
  darkMode: "class",
  theme: {
    colors: {
      white: "#ffffff",
      transparent: "transparent",
      "primary-green": {
        200: "#E0F2EB",
        400: "#CFF1E5",
        600: "#BAEDDA",
        800: "#9DE3CD",
        type: "#73C7AD",
      },
      "primary-orange": {
        200: "#FCDBC9",
        800: "#FAB793",
        type: "#FF9E72",
      },
      neutral: {
        0: "#ffffff",
        100: "#303944",
        200: "#F2F2F2",
        400: "#E5E5E5",
        600: "#B5B5B5",
        800: "#666666",
        900: "#414042",
        1000: "#000000",
      },
      "secondary-red": {
        200: "#FFE5E2",
        400: "#FFD1C9",
        600: "#FFB7AA",
        800: "#F4897C",
        900: "#EE4D4D",
      },
      "secondary-yellow": {
        400: "#FFD786",
        600: "#FFC45E",
      },
      "secondary-blue": {
        200: "#D4F0F7",
        400: "#99D6E8",
        600: "#3BA1BD",
        800: "#16808F",
        890: "#202A36",
        900: "#19232F",
      },
      "secondary-purple": {
        400: "#BABFDD",
        600: "#A0A0C8",
        800: "#7A79A3",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
