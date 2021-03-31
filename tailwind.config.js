const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  purge: ["./pages/**/*.js", "./src/components/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.white"),
            a: {
              color: theme("colors.pink.400"),
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            },
            p: {
              wordBreak: "break-word",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      borderStyle: ["hover", "focus"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
