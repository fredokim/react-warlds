module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        green: {
          500: "#6aaa64",
        },
        yellow: {
          500: "#c9b458",
        },
        gray: {
          500: "#787c7e",
        },
      },
    },
  },
  plugins: [],
};
