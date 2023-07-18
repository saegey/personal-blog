// custom typefaces
import '@fontsource-variable/public-sans';
// import '@fontsource/source-sans-pro/300.css'
// import '@fontsource/source-sans-pro/400.css'
// import '@fontsource/source-sans-pro/600.css'
// import '@fontsource/source-sans-pro/700.css'
// import '@fontsource/source-serif-pro/200.css'
// import '@fontsource/source-serif-pro/300-italic.css'
// import '@fontsource/source-serif-pro/300.css'
// import '@fontsource/source-serif-pro/400.css'
// import '@fontsource/source-serif-pro/600.css'
// import '@fontsource/source-serif-pro/700.css'
// import '@fontsource/source-serif-pro/900.css'
// import '@fontsource/inconsolata/300.css'
// import '@fontsource/inconsolata/400.css'
// import '@fontsource/inconsolata/500.css'
// import '@fontsource/inconsolata/600.css'
// import '@fontsource/inconsolata/700.css'
// import '@fontsource/inconsolata/800.css'
// import '@fontsource/inconsolata/900.css'
// normalize CSS across browsers
import './src/normalize.css'
import './src/carousel.css'
// custom CSS styles
import "./src/styles/globals.css"

// Highlighting for code blocks
// import "prismjs/themes/prism.css"

import type { GatsbyBrowser } from 'gatsby'

import rootWrapper from './rootWrapper'

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = rootWrapper
