import React from 'react'
import type { GatsbySSR } from 'gatsby'

const themeBootstrap = `
  try {
    var preference = localStorage.getItem('saegey-theme-preference');
    if (preference === 'light' || preference === 'dark') document.documentElement.classList.add(preference);
  } catch (error) {}
`

export const onRenderBody: GatsbySSR['onRenderBody'] = ({ setHeadComponents }) => {
  setHeadComponents([
    React.createElement('script', {
      key: 'theme-preference',
      dangerouslySetInnerHTML: { __html: themeBootstrap },
    }),
  ])
}
