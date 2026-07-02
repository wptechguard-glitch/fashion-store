module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#b76e79",      // Rose Gold
        primaryDark: "#9c5a63",  // Dark Rose Gold
        primaryLight: "#f2d4d7", // Light Rose Pink
        gold: "#d4af37",         // Gold accent
        luxury: "#1a0a0c",       // Deep dark background
      },
      fontFamily: {
        elegant: ["Playfair Display", "serif"],
        body: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
