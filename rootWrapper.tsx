import React from 'react'

import Layout from './src/components/layout'

type Props = {
  element: JSX.Element
}
const rootWrapper = ({ element }: Props) => {
  return <Layout>{element}</Layout>
}

export default rootWrapper
