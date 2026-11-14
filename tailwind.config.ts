import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        unbounded: ["Unbounded", "sans-serif"],
        pixel: ["Pixelify Sans", "monospace", "sans-serif"],
        jetbrains: ["JetBrains Mono", "monospace"],
        caveat: ["Caveat", "cursive", "sans-serif"],
        cormorant: ["Cormorant Garamond", "Georgia", "serif"],
      },
      colors: {
        paper: "rgb(var(--paper) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        sage: "rgb(var(--sage) / <alpha-value>)",
        accent: "#4B5BFF",
      },
    },
  },
  plugins: [],
};
export default config;
