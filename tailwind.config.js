/** @type {import("tailwindcss").Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}", "./lib/style.ts", "./lib/assy/*.svelte"],
  theme: {
    extend: {
      fontFamily: {
        "nsbold": ["NSJP-Centered", "sans-serif"],
      },
      colors: {
        canvas: "var(--color-canvas)",
        active: "var(--color-active)",
        inactive: "var(--color-inactive)",
        charline: "var(--color-charline)",
        invalid: "var(--color-invalid)",
      },
    },
  },
  plugins: [],
}

