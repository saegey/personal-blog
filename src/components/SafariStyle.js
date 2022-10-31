import * as React from 'react'
import Helmet from 'react-helmet'

const SafariStyle = () => {
  return (
    <Helmet>
      <meta
        name='theme-color'
        content='#212529ff'
        media='(prefers-color-scheme: light)'
      />
      <meta
        name='theme-color'
        content='#212529ff'
        media='(prefers-color-scheme: dark)'
      />
      <meta name='apple-mobile-web-app-status-bar-style' content='black'></meta>
    </Helmet>
  )
}

export default SafariStyle
