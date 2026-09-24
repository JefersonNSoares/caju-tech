/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1B5E20",
          light: "#4CAF50",
          dark: "#0E3A13",
        },
        caju: {
          yellow: "#FBC02D",
          orange: "#F57C00",
          red: "#D32F2F",
        },
        earth: {
          brown: "#5D4037",
          light: "#F5F0E6",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          card: "#FFFFFF",
        },
        feedback: {
          success: "#2E7D32",
          warning: "#EF6C00",
          error: "#C62828",
          offline: "#616161",
        },
      },
      minHeight: {
        touch: "48px",
      },
      minWidth: {
        touch: "48px",
      },
    },
  },
  plugins: [],
};
