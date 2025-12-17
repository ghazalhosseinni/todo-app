/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  mode: "jit", // update this line
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  options: {
    safelist: ["aos-init", "aos-animate", "fade-up"], // Add your animation classes here
  },

  theme: {
    extend: {
      colors: {
        "primary-tw": "#0891B2",
        "secondary-tw": "#0D9488",
        "bgColor-tw": "#DCDCDC",
        "colorText-tw": "#111827",
        "hover-tw": "#6366F1",
        "delete-tw": "#DC2626",
      },
      animation: {
        "spin-slow": "spin 10s linear infinite",
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      boxShadow: {
        main: " 0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        ":root": {
          "--primary-tw": theme("colors.primary-tw"),
          "--secondary-tw": theme("colors.secondary-tw"),
          "--bgColor-tw": theme("colors.bgColor-tw"),
          "--virayesh-tw": theme("colors.virayesh-tw"),
          "--delete-tw": theme("colors.delete-tw"),
          "--add-tw": theme("colors.add-tw"),
        },
      });
    },
  ],
  safelist: [],
};
