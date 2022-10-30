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

const theme = {
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
    em: { fontWeight: "500" },
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
      textDecoration: "underline",
      color: "text",
    },
    li: {
      fontFamily: "serif",
      lineHeight: "2",
      letterSpacing: ".4px",
      fontSize: [16, 18, 18],
      paddingLeft: "10px",
      marginBottom: "10px",
    },
    ol: {
      paddingInlineStart: "20px",
    },
    // more styles can be added as needed
  },
  buttons: {
    primary: {
      color: "background",
      marginRight: 0,
      paddingX: "10px",
      paddingY: "5px",
      fontFamily: "body",
      cursor: "pointer",
      textTransform: "uppercase",
      fontWeight: "600",
      fontSize: "14px",
      letterSpacing: ".5px",
      paddingLeft: "20px",
      paddingRight: "20px",
    },
  },
  fontSizes: [10, 13, 18, 21, 26, 34, 48],
  fonts: {
    body: '"Source Sans Pro", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    headline: "Inconsolata",
    serif: '"Source Serif Pro", serif',
    mono: "Inconsolata",
  },
  sizes: {
    container: 768,
  },
  cards: {
    primary: {
      padding: 0,
      borderRadius: 4,
      boxShadow: "0 8px 16px -4px rgba(0,0,0,.1), 0 0 8px -3px rgba(0,0,0,.1)",
      marginBottom: "20px",
      backgroundColor: "cardBackground",
    },
  },
  box: {
    faded: {
      position: "fixed",
      top: "0",
      height: "100%",
      width: "100%",
      left: "0",
      backgroundColor: "rgba(0,0,0,0.8)",
      zIndex: 10000,
      display: "flex",
    },
  },
  images: {
    postCardImage: {
      width: ["100%", "200px", "300px"],
      height: ["300px", "150px", "200px"],
      zIndex: "100",
      borderTopLeftRadius: 4,
      borderTopRightRadius: [4, 0, 0],
      borderBottomLeftRadius: [0, 4, 4],
    },
    fullScreen: {
      position: "relative",
      height: "100vh",
      maxHeight: "100%",
      zIndex: "100",
      borderRadius: [4, 4, 4],
    },
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
    postCardType: {
      fontSize: "16px",
      fontFamily: "body",
      textTransform: "uppercase",
      fontWeight: "600",
      letterSpacing: "1px",
      color: "mutedText",
      // marginLeft: "20px",
      // marginTop: "20px",
      display: "block",
    },
    postCardTitle: {
      fontSize: ["2", "3", "3"],
      fontFamily: "serif",
      fontWeight: "600",
      color: "text",
      // marginLeft: "20px",
    },
    postCardSubtitle: {
      fontSize: ["14px", "2", "16px"],
      fontFamily: "body",
      fontWeight: 400,
      color: "mutedText",
      letterSpacing: "0.3px",
      // marginLeft: "20px",
    },
    postCardBottom: {
      fontSize: ["14px", "2", "16px"],
      fontFamily: "body",
      fontWeight: 400,
      color: "mutedText",
      letterSpacing: "0.3px",
      // marginLeft: "20px",
      // marginTop: "auto",
      // marginBottom: "5px",
      height: "100%",
      // position: "absolute",
    },
    resultsHeading: {
      lineHeight: "30px",
      fontFamily: "serif",
      letterSpacing: ".6px",
      fontWeight: "700",
    },
    resultsItem: {
      fontSize: ["1", "2", "2"],
      lineHeight: "35px",
    },
    caption: {
      marginTop: "5px",
      display: "block",
      color: "primary",
      fontFamily: "body",
      fontStyle: "normal",
      fontSize: "14px",
      letterSpacing: ".1px",
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
      fontSize: "24px",
      textTransform: "uppercase",
      fontWeight: "700",
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
    text: "#212529ff",
    mutedText: "#495057ff",
    background: "#fff",
    primary: colors.sonicSilver,
    headerColor: "#e9ecefff",
    // headerForeground: "rgb(255, 116, 139)",
    headerForeground: colors.onyx,
    menuBackground: colors.lightGray,
    cardBackground: colors.cultured,
    blockquoteBg: colors.cultured,
    activeMenuLink: colors.cadetBlueCrayola,
    dividerColor: colors.gainsboro,
    highlightColor: "#e8ff50c7",
    opacity: "0.3",
    // @refresh reset
    modes: {
      dark: {
        headerColor: colors.eerieBlack,
        dividerColor: colors.sonicSilver,
        text: colors.cultured,
        mutedText: "#6c757dff",
        background: colors.eerieBlack,
        cardBackground: colors.onyx,
        primary: colors.gainsboro,
        menuBackground: colors.eerieBlack,
        blockquoteBg: colors.davysGrey,
        headerForeground: "aquamarine",
        highlightColor: "#6c757dff",
        opacity: "0.1",
      },
    },
  },
}

export default theme
