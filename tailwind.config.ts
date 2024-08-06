import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
        ibm: ["var(--font-ibm)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
