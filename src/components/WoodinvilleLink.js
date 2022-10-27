/** @jsxImportSource theme-ui */
import React from "react"
import { Text, Link } from "theme-ui"

const WoodinvilleLink = () => {
  return (
    <Text>
      Photo courtesy of{" "}
      <Link sx={{ color: "primary" }} href="http://woodinvillebicycle.com">
        Woodinville Bicycle
      </Link>
    </Text>
  )
}

export default WoodinvilleLink
