import scrollbar from "tailwind-scrollbar";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        softBlue: "rgba(67,71,85,0.27) 0px 0px 0.25em, rgba(90,125,188,0.05) 0px 0.25em 1em",
      },
    },
  },
  plugins: [scrollbar],
};
