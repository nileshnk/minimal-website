import type { Config } from "tailwindcss";

export default {
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
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "inherit",
            a: {
              color: "inherit",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              "&:hover": {
                opacity: "0.7",
              },
            },
            strong: {
              color: "inherit",
              fontWeight: "600",
            },
            "h1, h2, h3, h4, h5, h6": {
              color: "inherit",
              fontWeight: "300",
            },
            code: {
              color: "inherit",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            blockquote: {
              borderLeftColor: "rgb(107 114 128)",
              color: "rgb(156 163 175)",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
} satisfies Config;
