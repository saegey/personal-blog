// example theme file
const colors = {
  cultured: "#f8f9faff",
  cultured2: "#e9ecefff",
  gainsboro: "#dee2e6ff",
  lightGray: "#ced4daff",
  cadetBlueCrayola: "#adb5bdff",
  sonicSilver: "#6c757dff",
  davysGrey: "#495057ff",
  onyx: "#343a40ff",
  eerieBlack: "#212529ff",
}

module.exports = {
  config: {
    initialColorModeName: "light",
  },
  styles: {
    // the keys used here reference elements in MDX
    h1: {
      // the style object for each element
      // can reference other values in the theme
      fontFamily: "serif",
      fontWeight: "headline",
      lineHeight: "headline",
      fontSize: ["3", "4", "5"],
      marginTop: 0,
      marginBottom: 3,
      letterSpacing: "1px",
    },
    h2: {
      fontFamily: "serif",
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
    hr: {
      color: "dividerColor",
    },
    p: {
      fontFamily: "serif",
      lineHeight: "1.8",
      fontSize: [16, 18, 18],
      letterSpacing: ".4px",
      fontWeight: "400",
    },
    a: {
      color: "primary",
      ":hover, :focus": {
        color: "secondary",
      },
      textDecoration: "none",
    },
    li: {
      fontFamily: "serif",
      lineHeight: "2",
      letterSpacing: ".4px",
    },
    // more styles can be added as needed
  },
  fontSizes: [10, 13, 18, 21, 26, 34, 48],
  fonts: {
    body: '"Inconsolata", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    headline: "Inconsolata",
    serif: '"Source Serif Pro", serif',
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
  // dividers: {
  //   default: {
  //     color: "dividerColor",
  //   },
  // },
  links: {
    menu: {
      fontSize: "5",
      fontWeight: "900",
      lineHeight: "1.5",
      margin: "0",
      fontFamily: "body",
      color: "headerForeground",
      "&:active": {
        color: "activeMenuLink",
      },
    },
  },
  colors: {
    text: colors.eerieBlack,
    background: "#fff",
    primary: colors.sonicSilver,
    headerColor: colors.davysGrey,
    // headerForeground: "rgb(255, 116, 139)",
    headerForeground: colors.onyx,
    menuBackground: colors.lightGray,
    cardBackground: colors.cultured,
    blockquoteBg: colors.cultured,
    activeMenuLink: colors.cadetBlueCrayola,
    dividerColor: colors.gainsboro,
    highlightColor: "#e8ff50c7",
    modes: {
      dark: {
        headerColor: colors.eerieBlack,
        dividerColor: colors.sonicSilver,
        text: colors.cultured,
        background: colors.eerieBlack,
        cardBackground: colors.onyx,
        primary: colors.gainsboro,
        menuBackground: colors.eerieBlack,
        blockquoteBg: colors.davysGrey,
        headerForeground: "aquamarine",
      },
    },
  },
}
