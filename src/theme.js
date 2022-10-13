// example theme file
module.exports = {
  config: {
    initialColorModeName: "light",
  },
  styles: {
    // the keys used here reference elements in MDX
    h1: {
      // the style object for each element
      // can reference other values in the theme
      fontFamily: "headline",
      fontWeight: "headline",
      lineHeight: "headline",
      marginTop: 0,
      marginBottom: 3,
    },
    h2: {
      fontFamily: "headline",
      fontWeight: "headline",
      lineHeight: "headline",
      marginTop: 0,
      marginBottom: 3,
    },
    p: {
      fontFamily: "body",
      lineHeight: "1.3",
    },
    a: {
      color: "primary",
      ":hover, :focus": {
        color: "secondary",
      },
      textDecoration: "none",
    },
    // more styles can be added as needed
  },
  fontSizes: [10, 13, 18, 21, 26, 34, 48],
  fonts: {
    body: '"Merriweather", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    headline: "Merriweather Sans",
  },
  sizes: {
    container: 768,
  },
  text: {
    headline: {
      fontFamily: "body",
      fontSize: "6",
      fontWeight: "heavy",
      // lineHeight: "0",
      letterSpacing: "0",
      color: "text",
    },
    subHeadline: {
      fontFamily: "body",
      fontSize: "5",
      fontWeight: "heavy",
      // lineHeight: "0",
      letterSpacing: "0",
      color: "text",
    },
    menuItem: {
      fontSize: "5",
      fontWeight: "heavy",
      lineHeight: "1.5",
      margin: "0",
      fontFamily: "body",
      textDecoration: "none",
      color: "text",
    },
  },
  links: {
    menu: {
      fontSize: "5",
      fontWeight: "heavy",
      lineHeight: "1.5",
      margin: "0",
      fontFamily: "body",
      textDecoration: "none",
      color: "text",
      textDecoration: "none",
      "&:active": {
        color: "headerForeground",
      },
    },
  },
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#07c",
    headerColor: "pink",
    headerForeground: "rgb(255, 116, 139)",
    menuBackground: "#F8F7FC",
    modes: {
      dark: {
        headerColor: "#000",
        text: "#fff",
        background: "#444",
        primary: "#07c",
        menuBackground: "#000",
        headerForeground: "aquamarine",
      },
    },
  },
}
