/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#ffffff",
        card: "#0a0a0a",
        "card-foreground": "#ffffff",
        primary: "#ffffff",
        "primary-foreground": "#000000",
        secondary: "#1a1a1a",
        "secondary-foreground": "#ffffff",
        muted: "#262626",
        "muted-foreground": "#a3a3a3",
        accent: "#7c3aed",
        "accent-foreground": "#ffffff",
        destructive: "#ef4444",
        "destructive-foreground": "#ffffff",
        border: "#262626",
        input: "#1a1a1a",
        ring: "#7c3aed",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
