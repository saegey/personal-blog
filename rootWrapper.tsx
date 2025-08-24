import React from 'react'

import Layout from './src/components/Layout'

type Props = {
  element: JSX.Element
  props?: any
}

const shouldBypassLayout = (pathname?: string) => {
  if (!pathname) return false
  // Normalize (remove trailing slash)
  const p = pathname.replace(/\/+$/, '') || '/'
  // Add any routes that shouldn't use Layout here
  const noLayout = new Set(['/links', '/link-in-bio'])
  return noLayout.has(p)
}

const rootWrapper = ({ element, props }: Props) => {
  const pathname = props?.location?.pathname as string | undefined
  if (shouldBypassLayout(pathname)) {
    return <>{element}</>
  }
  return <Layout>{element}</Layout>
}

export default rootWrapper
