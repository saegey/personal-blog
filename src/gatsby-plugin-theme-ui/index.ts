import { base } from '@theme-ui/presets'
import nightOwl from '@theme-ui/prism/presets/night-owl.json'

// Helper to map night-owl prism preset tokens to theme tokens
const _night = (nightOwl as any) || {}
const nightPlain = _night.plain || { background: '#011627', color: '#d6deeb' }
const findNightColor = (types: string[], fallback = nightPlain.color) => {
  if (!Array.isArray(_night.styles)) return fallback
  const entry = _night.styles.find(
    (s: any) => Array.isArray(s.types) && types.some(t => s.types.includes(t)),
  )
  return (entry && entry.style && entry.style.color) || fallback
}

const grays = [
  '#ffffff',
  '#f7f7f7',
  '#eeeeee',
  '#dddddd',
  '#bbbbbb',
  '#999999',
  '#666666',
  '#444444',
  '#222222',
  '#000000',
]

const theme = {
  ...base,
  config: {
    useColorSchemeMediaQuery: 'system', // Automatically respects system preferences
  },
  colors: {
    ...base.colors,
    // Core roles
    text: '#212121',
    textSubtle: '#222222',
    background: '#ffffff',

    primary: '#000000',
    secondary: '#30c',
    muted: '#f6f6f6',
    // Grayscale and utilities
    gray: grays,
    textMuted: '#777777',
    textInvert: '#ffffff',
    primaryMuted: '#eeeeee',
    blockquoteBg: '#f8f8f8',
    // Semantic palette
    red: '#e11d48',
    green: '#16a34a',
    yellow: '#fbff00ff',
    blue: '#3b82f6',
    orange: '#f97316',
    // Prism / code token colors (light)
    prismBackground: '#e3e3e3ff',
    prismText: '#24292e',
    prismComment: '#6a737d',
    prismString: '#032f62',
    prismKeyword: '#d73a49',
    prismFunction: '#6f42c1',
    prismPunctuation: '#24292e',
    prismNumber: '#005cc5',
    // Components
    badgeSecondaryBg: '#000000',
    badgeSecondaryText: '#ffffff',
    badgeSecondaryBorder: '#000000',
    primaryText: '#ffffff',
    cardBorderColor: '#949494ff',
    cardBackgroundColor: '#f8f8f8',
    showCardBackground: '#f5f5f5',
    backgroundSubtle: '#ffffffff',
    featuredCardBorder: '#383838ff',
    modes: {
      dark: {
        text: '#ffffff',
        textInvert: '#000000',
        textSubtle: '#b8b8b8ff',
        background: '#000000',
        primary: '#ffffff',
        secondary: '#30c',
        muted: '#1f1f1f',
        primaryMuted: '#525252',
        textMuted: '#bdbdbd',
        blockquoteBg: '#1e1e1e',
        badgeSecondaryBg: '#000000',
        badgeSecondaryText: '#ffffff',
        badgeSecondaryBorder: '#ffffff',
        cardBorderColor: '#464646',
        cardBackgroundColor: '#111111',
        showCardBackground: '#3b3b3b',
        red: '#f43f5e',
        green: '#22c55e',
        yellow: 'rgba(250, 237, 94, 0.45)',
        blue: '#60a5fa',
        orange: '#fb923c',
        backgroundSubtle: '#1f1f1fff',
        // Prism / code token colors (dark/night-owl-ish) from night-owl preset
        prismBackground: '#252525ff',
        prismText: nightPlain.color,
        prismComment: findNightColor(
          ['comment', 'prolog', 'doctype', 'cdata'],
          '#5c6a72',
        ),
        prismString: findNightColor(
          ['string', 'char', 'attr-value', 'builtin'],
          '#ecc48d',
        ),
        prismKeyword: findNightColor(
          ['keyword', 'selector', 'important'],
          '#c792ea',
        ),
        prismFunction: findNightColor(['function', 'class-name'], '#82aaff'),
        prismPunctuation: findNightColor(['punctuation'], '#c3e88d'),
        prismNumber: findNightColor(['number'], '#ff5874'),
        featuredCardBorder: '#4f4f4fff',
      },
    },
  },
  radii: {
    none: 0,
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
    pill: 9999,
    button: 4,
    card: 6,
    input: 4,
  },
  // Optional: shared shadows and borders
  shadows: {
    card: '0 2px 8px rgba(0,0,0,0.08)',
    focus: '0 0 0 2px rgba(59,130,246,0.5)',
    elevated: '0 6px 16px rgba(0,0,0,0.12)',
  },
  borders: {
    default: '1px solid',
  },
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    headline:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    serif:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"SF Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
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
      bg: 'background',
    },
    pre: {
      fontFamily: 'mono',
      fontSize: 1,
      lineHeight: 1.6,
      bg: 'prismBackground',
      color: 'prismText',
      mt: 3,
      mb: 3,
      borderRadius: 'md',
      overflowX: 'auto',
      // border: '1px solid',
      // borderColor: 'cardBorderColor',
    },
    code: {
      fontFamily: 'mono',
      padding: 3,
      borderRadius: 'xl',
      bg: 'prismBackground',
      color: 'prismText',
      // token colors
      '.token.comment, .token.prolog, .token.doctype, .token.cdata': {
        color: 'prismComment',
      },
      '.token.punctuation': { color: 'prismPunctuation' },
      '.token.property, .token.tag, .token.boolean, .token.number, .token.constant, .token.symbol, .token.deleted':
        {
          color: 'prismNumber',
        },
      '.token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted':
        {
          color: 'prismString',
        },
      '.token.operator, .token.entity, .token.url': {
        color: 'prismPunctuation',
      },
      '.token.atrule, .token.keyword': { color: 'prismKeyword' },
      '.token.function, .token.class-name': { color: 'prismFunction' },
    },
    h1: {
      fontFamily: 'body',
      fontWeight: 'heading',
      lineHeight: 'heading',
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
      borderRadius: 'md',
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
      color: 'text',
      textDecoration: 'none',
      ':hover, :focus': {
        color: 'text',
      },
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
  buttons: {
    primary: {
      cursor: 'pointer',
      bg: 'primary',
      color: 'textInvert',
      border: '1px solid',
      borderColor: 'primary',
      borderRadius: 'button',
      px: 3,
      py: 2,
      '&:hover': { opacity: 0.9 },
      '&:disabled': { opacity: 0.6, cursor: 'not-allowed' },
      fontWeight: 700,
    },
    secondary: {
      cursor: 'pointer',
      bg: 'transparent',
      color: 'primary',
      border: ['2px solid', '2px solid', '2px solid'],
      borderColor: 'primary',
      borderRadius: 'button',
      px: 3,
      py: 2,
      '&:hover': { bg: 'primaryMuted' },
      '&:disabled': { opacity: 0.6, cursor: 'not-allowed' },
      fontWeight: 700,
    },
    ghost: {
      cursor: 'pointer',
      bg: 'transparent',
      color: 'text',
      border: 'none',
      borderRadius: 'button',
      px: 2,
      py: 1,
      '&:hover': { bg: 'muted' },
      '&:disabled': { opacity: 0.6, cursor: 'not-allowed' },
    },
  },
  cards: {
    primary: {
      // bg: 'cardBackgroundColor',
      border: '3px solid',
      borderColor: 'text',
      borderRadius: 'lg',
      // boxShadow: 'card',
      p: 3,
    },
    featured: {
      textDecoration: 'none',
      color: 'inherit',
      py: [2, 3],
      borderRadius: 'lg',
      // transition: 'transform 120ms ease, box-shadow 120ms ease',
      // boxShadow: 'card',
      border: '2px solid',
      borderColor: 'featuredCardBorder',
      background: 'backgroundSubtle',
      boxShadow: 'unset',
      '&:hover, &:focus': {
        transform: 'translateY(-2px)',
        // boxShadow: 'elevated',
      },
      '&:focus': {
        outline: 'none',
      },
    },
  },
  links: {
    nav: {
      textDecoration: 'underline',
      color: 'text',
      '&:hover': {
        color: 'textSubtle',
        textDecorationThickness: '2px',
      },
      fontWeight: 600,
      fontSize: ['15px', 1, 2],
    },
  },
  boxes: {
    figure: {
      maxWidth: [null, null, '690px'],
      backgroundColor: ['transparent', 'primaryMuted'],
      paddingX: [0, '30px'],
      paddingY: [2, '30px'],
      borderRadius: [0, 'lg'],
      marginLeft: 'auto',
      marginRight: 'auto',
      marginY: [3, 5],
      borderTop: ['1px solid', '0'],
      borderBottom: ['1px solid', '0'],
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
    code: {
      fontFamily: 'mono',
    },
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
      textDecorationColor: 'yellow',
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
    statsLabelSub: {
      marginTop: 1,
      fontWeight: '400',
      fontSize: ['12px', '14px', '14px'],
      color: 'textMuted',
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
      fontSize: ['22px', '26px', '28px'],
      color: 'textInvert',
    },
    postSubType: {
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: 'textMuted',
      mb: 1,
      fontFamily: 'body',
      fontSize: [0, 1, 1],
    },
    postType: {
      fontFamily: 'body',
      fontWeight: '700',
      letterSpacing: '.1em',
      fontSize: ['12px', '16px', '16px'],
      textTransform: 'uppercase',
      color: 'textSubtle',
      lineHeight: '130%',
    },
  },
}

export default theme
