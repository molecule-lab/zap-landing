module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E57373", // Coral/salmon color
        secondary: "#2D3748", // Dark gray
        background: "#F7FAFC",
        lightPink: "#FFF1F1",
      },
    },
  },
  plugins: [],
};
