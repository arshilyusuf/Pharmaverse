const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
  theme: {
    extend: {
      screens: {
        xs: { max: "412px" }, 
        sm: "413px",
      },
    },
  },
};
export default config;
