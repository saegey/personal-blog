// src/gatsby-plugin-theme-ui/index.js
import { base } from '@theme-ui/presets'

const theme = {
  ...base,
  config: {
    useColorSchemeMediaQuery: 'system', // Automatically respects system preferences
  },
  colors: {
    ...base.colors,
    primary: 'black',
    primaryMuted: '#eeeeeeff',
    textMuted: '#777777ff',
    secondary: '#30c',
    badgeSecondaryBg: 'black',
    badgeSecondaryText: 'white',
    badgeSecondaryBorder: 'black',
    primaryText: 'white',
    cardBorderColor: '#e1e1e1',
    cardBackgroundColor: '#f8f8f8',
    showCardBackground: '#f5f5f5',
    highlightedItem: 'yellow',
    text: '#212121ff',

    modes: {
      dark: {
        primaryMuted: '#525252ff',
        text: 'white',
        background: 'black',
        badgeSecondaryBg: 'black',
        badgeSecondaryText: 'white',
        badgeSecondaryBorder: 'white',
        primary: 'white',
        primaryText: 'black',
        cardBorderColor: '#464646',
        cardBackgroundColor: 'black',
        showCardBackground: '#3b3b3b',
      },
    },
  },
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    headline:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    serif:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  styles: {
    root: {
      fontFamily: 'body',
      fontWeight: 'body',
    },
    h1: {
      fontFamily: 'body',
      fontWeight: 'heading',
      lineHeight: 'heading',
      // fontSize: 5,
    },
    h2: {
      fontFamily: 'body',
      fontWeight: 'headline',
      borderLeftWidth: [0, 0, '1px'],
      paddingTop: [3],
      paddingBottom: [0],
    },
    ol: {
      listStylePosition: 'outside',
      fontSize: [16, 18, 18],
    },
    ul: {
      paddingLeft: [3, 3, 3],

      listStyle: 'disc',
      listStylePosition: 'outside',
      fontSize: [16, 18, 18],
      'li::marker': {
        color: 'textMuted',
      },
      lineHeight: 1.3,
    },
    blockquote: {
      backgroundColor: 'blockquoteBg',
      paddingX: '20px',
      paddingY: '20px',
      margin: '0',
      color: 'text',
      borderLeftWidth: '3px',
      borderLeftStyle: 'solid',
      borderLeftColor: 'textMuted',
    },
    hr: {
      color: 'primaryMuted',
    },
    p: {
      fontFamily: 'body',
      lineHeight: '30px',
      fontSize: [16, 18, 18],
      fontWeight: '400',
      color: 'text',
    },
    a: {
      ':hover, :focus': {
        color: 'text',
      },
      textDecoration: 'none',
      color: 'text',
    },
    li: {
      fontFamily: 'body',
      fontSize: [16, 18, 18],
      marginBottom: '20px',
      paddingLeft: 2, // or adjust as needed
    },
    faded: {
      position: 'fixed',
      top: '0',
      height: '100%',
      width: '100%',
      left: '0',
      backgroundColor: 'rgba(0,0,0,0.8)',
      zIndex: 10000,
      display: 'flex',
    },
  },
  boxes: {
    figure: {
      maxWidth: [null, null, '690px'],
      backgroundColor: ['', 'primaryMuted'],
      paddingX: [0, '30px'],
      paddingY: [2, '30px'],
      borderRadius: [0, '5px'],
      marginLeft: 'auto',
      marginRight: 'auto',
      marginY: [3, 5],
      borderTop: ['1px solid', ''],
      borderBottom: ['1px solid', ''],
      borderColor: 'primaryMuted',
    },
  },
  images: {
    fullScreen: {
      position: 'relative',
      height: '100vh',
      maxHeight: '100%',
      zIndex: '100',
      borderRadius: [4, 4, 4],
    },
  },
  text: {
    headline: {
      fontFamily: 'headline',
      fontSize: '6',
      fontWeight: 'heavy',
      letterSpacing: '0',
      color: 'text',
    },
    resultsHeading: {
      fontFamily: 'body',
      fontWeight: '700',
    },
    resultsItem: {
      fontSize: [16, 16, 17],
      fontFamily: 'body',
    },
    highlightedItem: {
      textDecorationLine: 'underline',
      textDecorationThickness: '10px',
      textUnderlineOffset: '-8px',
      textDecorationSkipInk: 'none',
      textDecorationColor: 'highlightedItem',
      fontSize: [16, 16, 17],
      fontFamily: 'body',
    },
    statsLabel: {
      fontWeight: '600',
      textTransform: 'uppercase',
      fontSize: ['12px', '14px', '14px'],
      color: 'textMuted',
    },
    statsValue: {
      fontFamily: 'body',
      fontSize: ['18px', '24px', '24px'],
      fontWeight: [600, 600, 600],
      marginTop: 1,
      marginBottom: [2, 3, 3],
    },
    caption: {
      marginTop: '5px',
      display: 'block',
      color: 'primary',
      fontFamily: 'body',
      fontStyle: 'normal',
      fontSize: '13px',
    },
    postSubtitle: {
      fontFamily: 'body',
      fontWeight: '400',
      letterSpacing: '0px',
      fontSize: ['14px', '16px', '16px'],
    },
    postTitle: {
      fontFamily: 'body',
      fontWeight: 600,
      fontStyle: 'normal',
      fontSize: ['24px', '32px', '32px'],
      color: 'textInvert',
    },
    postType: {
      fontFamily: 'body',
      fontWeight: '700',
      letterSpacing: '.1em',
      fontSize: ['12px', '16px', '16px'],
      textTransform: 'uppercase',
      color: 'primary',
      lineHeight: '130%',
    },
  },
}

export default theme
