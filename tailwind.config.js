/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*", "./*.jsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        mesh1: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(8%, -6%) scale(1.08)" },
        },
        mesh2: {
          "0%, 100%": { transform: "translate(0, 0) scale(1.05)" },
          "50%": { transform: "translate(-10%, 8%) scale(0.95)" },
        },
        mesh3: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(5%, 12%)" },
        },
        floatCard: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        gradientFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        underlineSweep: {
          "0%": { backgroundSize: "0% 2px" },
          "100%": { backgroundSize: "100% 2px" },
        },
      },
      animation: {
        mesh1: "mesh1 18s ease-in-out infinite",
        mesh2: "mesh2 24s ease-in-out infinite",
        mesh3: "mesh3 20s ease-in-out reverse infinite",
        "float-slow": "floatCard 6s ease-in-out infinite",
        "grad-flow": "gradientFlow 12s ease infinite",
      },
    },
  },
  plugins: [],
};
