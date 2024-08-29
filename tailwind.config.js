module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        background: "var(--background-color)",
        border: "var(--border-color)",
        text: "var(--text-color)",
      },
      
      borderColor: {
        DEFAULT: "var(--border-color)",
      },
      divideColor: {
        DEFAULT: "var(--border-color)",
      },
    },
  },
  plugins: [],
};
