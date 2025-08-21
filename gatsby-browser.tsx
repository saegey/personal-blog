// Import Space Mono font (400/700 normal and italic)
import '@fontsource/space-mono/400.css'
import '@fontsource/space-mono/700.css'
import '@fontsource/space-mono/400-italic.css'
import '@fontsource/space-mono/700-italic.css'
// normalize CSS across browsers
import './src/normalize.css'
import './src/carousel.css'
// custom CSS styles
import './src/styles/globals.css'

import type { GatsbyBrowser } from 'gatsby'

import rootWrapper from './rootWrapper'

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = rootWrapper
