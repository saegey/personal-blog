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
      fontSize: ["3", "4", "5"],
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
    blockquote: {
      backgroundColor: "blockquoteBg",
      paddingX: "20px",
      paddingY: "20px",
      margin: "0",
      color: "text",
    },
    p: {
      fontFamily: "body",
      lineHeight: "1.8",
    },
    a: {
      color: "primary",
      ":hover, :focus": {
        color: "secondary",
      },
      textDecoration: "none",
    },
    li: {
      fontFamily: "body",
      lineHeight: "2",
    },
    // more styles can be added as needed
  },
  fontSizes: [10, 13, 18, 21, 26, 34, 48],
  fonts: {
    body: '"Inconsolata", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    headline: "Inconsolata",
  },
  sizes: {
    container: 768,
  },
  text: {
    headline: {
      fontFamily: "headline",
      fontSize: "6",
      fontWeight: "heavy",
      // lineHeight: "0",
      letterSpacing: "0",
      color: "text",
    },
    subHeadline: {
      fontFamily: "headline",
      fontSize: ["3", "4", "4"],
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
  badges: {
    listSection: {
      fontFamily: "headline",
      padding: "5px",
      fontSize: ["0", "1", "1"],
      color: "background",
      textTransform: "uppercase",
      marginRight: "5px",
    },
  },
  containers: {
    default: {
      padding: ["2", "3", "4"],
    },
  },
  links: {
    menu: {
      fontSize: "5",
      fontWeight: "900",
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
    primary: "olivedrab",
    headerColor: "pink",
    headerForeground: "rgb(255, 116, 139)",
    menuBackground: "#F8F7FC",
    cardBackground: "#fffbf5",
    blockquoteBg: "aliceblue",
    modes: {
      dark: {
        headerColor: "#000",
        text: "#fff",
        background: "#444",
        cardBackground: "#565656",
        primary: "cornsilk",
        menuBackground: "#000",
        blockquoteBg: "#565656",
        headerForeground: "aquamarine",
      },
    },
  },
}
