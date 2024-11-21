/** @type {import("tailwindcss").Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}", "./lib/style.ts", "./lib/assy/*.svelte"],
  theme: {
    extend: {
      fontFamily: {
        "nsbold": ["NSJP-Centered", "sans-serif"],
      },
      colors: {
        system: "rgb(var(--color-system))",
        canvas: "rgb(var(--color-canvas))",
        txtbdr: "rgb(var(--color-txtbdr))",
        active: "rgb(var(--color-active))",
        inactive: "rgb(var(--color-inactive))",
        invalid: "rgb(var(--color-invalid))",
      },
      brightness: {
        var: "var(--color-bright)",
      },
      backdropBrightness: {
        var: "var(--color-bright)",
      }
    },
  },
  plugins: [],
}

