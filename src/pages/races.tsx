import { Container } from 'theme-ui'
import { graphql, PageProps } from 'gatsby'

import Seo from '../components/seo'

const Races: React.FC<PageProps<DataProps>> = ({ data }) => {
  const posts = data.allMdx.nodes

  return (
    <>
      <Container sx={{ padding: '20px' }}>
        <table sx={{ fontFamily: 'body', padding: '10px' }}>
          <tr>
            <th>Title</th>
            <th>Time In Red</th>
            <th>NP</th>
            <th>Avg Power</th>
            <th>Avg HR</th>
            <th>Avg Cadence</th>
            <th>Total Watts Over FTP</th>
          </tr>

          {posts.map((post, index) => {
            return (
              <tr key={index}>
                <td sx={{ padding: '5px' }}>{post.frontmatter.title}</td>
                <td sx={{ padding: '5px' }}>{`${new Date(
                  post.gpxData.fields.timeInRed * 1000
                )
                  .toISOString()
                  .substr(11, 8)}`}</td>
                <td sx={{ padding: '5px' }}>
                  {post.gpxData.fields.normalizedPower
                    ? post.gpxData.fields.normalizedPower.toFixed()
                    : ''}
                </td>
                <td sx={{ padding: '5px' }}>
                  {post.gpxData.fields.powerAnalysis
                    ? post.gpxData.fields.powerAnalysis.entire
                    : ''}
                </td>
                <td sx={{ padding: '5px' }}>
                  {post.gpxData.fields.heartAnalysis
                    ? post.gpxData.fields.heartAnalysis.entire
                    : ''}
                </td>
                <td sx={{ padding: '5px' }}>
                  {post.gpxData.fields.cadenceAnalysis
                    ? post.gpxData.fields.cadenceAnalysis.entire
                    : ''}
                </td>
                <td>
                  {post.gpxData.fields.totalWattsOverFtp
                    ? `${(post.gpxData.fields.totalWattsOverFtp / 1000).toFixed(
                        0
                      )} kJ`
                    : ''}
                </td>
              </tr>
            )
          })}
        </table>
      </Container>
    </>
  )
}

export default Races

type DataProps = {
  allMdx: {
    nodes: {
      fields: {
        slug: string
      }
      gpxData: {
        fields: {
          heartAnalysis: {
            entire: number
          }
          totalWattsOverFtp: number
        }
      }
      frontmatter: {
        title: string
        date: string
        location: string
        type: string
        tags: ReadonlyArray<string>
      }
    }[]
  }
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Race Journal Posts" />

export const pageQuery = graphql`
  query RacesQuery {
    allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { type: { eq: "Race Journal" } } }
    ) {
      nodes {
        id
        frontmatter {
          title
        }
        gpxData {
          fields {
            totalWattsOverFtp
            timeInRed
            currentFtp
            stoppedTime
            elapsedTime {
              seconds
              minutes
              hours
              days
            }
            normalizedPower
            powerZones {
              powerHigh
              powerLow
              title
              zone
            }
            powerZoneBuckets
            powerAnalysis {
              entire
            }
            heartAnalysis {
              entire
            }
            cadenceAnalysis {
              entire
            }
          }
        }
      }
    }
  }
`
