// custom typefaces
import '@fontsource-variable/public-sans'
// normalize CSS across browsers
import './src/normalize.css'
import './src/carousel.css'
// custom CSS styles
import './src/styles/globals.css'


import type { GatsbyBrowser } from 'gatsby'

import rootWrapper from './rootWrapper'

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = rootWrapper
