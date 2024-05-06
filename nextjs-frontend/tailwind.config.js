const { colors } = require("tailwindcss/defaultTheme");

const PRIMARY_COLOR = {
  light: colors.red[300],
  DEFAULT: colors.red[400],
  dark: colors.red[500],
};

module.exports = {
  mode: "jit",
  purge: ["src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: {
          light: "#333",
          DEFAULT: "#222",
          dark: "#111",
          pure: "#000",
        },
        primary: PRIMARY_COLOR,
        error: {
          light: colors.red[50],
          DEFAULT: colors.red[500],
        },
        success: {
          light: colors.green[50],
          DEFAULT: colors.green[800],
        },
      },
      fill: {
        primary: PRIMARY_COLOR,
      },
      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.29,-0.27, 0.81,-0.16)",
      },
    },
    fontFamily: {
      sans: ["Poppins", "ui-sans-serif", "system-ui"],
      display: ["Playfair Display", "Oswald"],
      handwrite: ["Homemade Apple"],
      body: ["Poppins", "Open Sans"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
