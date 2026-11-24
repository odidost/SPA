import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#F7F5EC",
          light: "#FAF9F5",
          dark: "#EFECE1",
          border: "#E4DEC8",
        },
        forest: {
          DEFAULT: "#203F35",
          dark: "#172E27",
          light: "#2B5246",
          muted: "#355E51",
          subtle: "rgba(32, 63, 53, 0.08)",
        },
        brass: {
          DEFAULT: "#A77740",
          light: "#C09059",
          dark: "#8D6232",
          subtle: "rgba(167, 119, 64, 0.15)",
        },
      },
      fontFamily: {
        serif: ["var(--font-instrument-serif)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      screens: {
        xs: "390px",
      },
    },
  },
  plugins: [],
};

export default config;
