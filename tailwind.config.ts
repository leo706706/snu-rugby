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
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          DEFAULT: "#1a3a5c",
          50: "#eef3f8",
          100: "#d6e2ed",
          200: "#aec5db",
          300: "#7fa3c2",
          400: "#4f7da3",
          500: "#2f5d83",
          600: "#1a3a5c",
          700: "#152f4a",
          800: "#102338",
          900: "#0b1726",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "Pretendard Variable",
          "Apple SD Gothic Neo",
          "Malgun Gothic",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tightish: "-0.01em",
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};
export default config;
