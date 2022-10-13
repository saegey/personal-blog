import React from "react"

import Layout from "./src/components/layout"

const rootWrapper = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}

export default rootWrapper
