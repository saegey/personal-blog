import { graphql, useStaticQuery } from 'gatsby'

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          social {
            twitter
          }
          # image
          siteUrl
          author {
            name
          }
        }
      }
    }
  `)

  return data.site.siteMetadata
}
