import { Text, Link, Container, Box } from 'theme-ui'
import { graphql, PageProps } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { IGatsbyImageData } from 'gatsby-plugin-image'

import Seo from '../components/seo'
import { useSiteMetadata } from '../hooks/use-site-metadata'

import {
  PowerBreakdown,
  PostAuthor,
  PostHeader,
  PortraitImage,
  LandscapeImage,
  VisualOverview,
  Map,
  RaceResults,
  MatchesBurned,
  StravaLink,
  RelatedRaces,
  Carousel,
  VideoPlayer,
  PowerCurveGraph,
  RaceOverview
} from '../components/posts'

const shortcodes = {
  PortraitImage,
  RaceResults,
  RaceOverview,
  LandscapeImage,
  PowerCurveGraph,
  Link,
  Text,
  MatchesBurned,
  PowerBreakdown,
  VideoPlayer,
  Carousel,
  Map,
  RelatedRaces,
  StravaLink,
  VisualOverview,
  Box
}

const PostTemplate: React.FC<PageProps<DataProps>> = ({ data, children }) => {
  const {
    title,
    date,
    location,
    type,
    headerImage,
    teaser,
    publishedDate,
    headerImageCaption,
  } = data.mdx.frontmatter

  return (
    <>
      <PostHeader
        headerImage={headerImage}
        type={type}
        title={title}
        date={date}
        location={location}
        teaser={teaser}
        headerImageCaption={headerImageCaption}
      />
      <Container
        sx={{
          maxWidth: '1045px',
          position: 'relative',
          width: 'calc(100% - 40px)',
          margin: ['20px auto', '120px auto', '120px auto'],
          '&.article>p+p': {
            paddingTop: '30px',
          },
          '&.article>h2+ul': {
            paddingTop: '30px',
          },
          '&.article>ul+h2': {
            paddingTop: '30px',
          },
          '&.article>ol+h2': {
            paddingTop: '30px',
          },
          '&.article>h2+ol': {
            paddingTop: '0px',
          },
          '&.article>p+h2': {
            paddingTop: '30px',
          },
        }}
        className="article"
        as="article"
      >
        <PostAuthor publishedDate={publishedDate} />
        <MDXProvider components={shortcodes}>{children}</MDXProvider>
      </Container>
    </>
  )
}

export default PostTemplate

export const Head: React.FC<PageProps<DataProps>> = ({ data }) => {
  const siteMetadata = useSiteMetadata()
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: data.mdx.frontmatter.title,
    image: [
      `${siteMetadata.siteUrl}${data.mdx.frontmatter.headerImage?.childImageSharp?.gatsbyImageData?.images?.fallback?.src}`,
    ],
    datePublished: data.mdx.frontmatter.publishedDate,
    author: [
      {
        '@type': 'Person',
        name: siteMetadata.author.name,
        sameAs: `https://twitter.com/${siteMetadata.social.twitter}`,
      },
    ],
    description: data.mdx.frontmatter.description,
  }

  // 2️⃣ Stringify the schema object (adding the "null, 2" gives you readable json)
  const schemaAsString = JSON.stringify(schema, null, 2)

  return (
    <>
      <Seo
        title={data.mdx.frontmatter.title}
        description={data.mdx.frontmatter.description}
        image={
          data.mdx.frontmatter.headerImage?.childImageSharp?.gatsbyImageData
            ?.images?.fallback?.src
        }
        width={
          data.mdx.frontmatter.headerImage?.childImageSharp?.gatsbyImageData
            ?.width
        }
        height={
          data.mdx.frontmatter.headerImage?.childImageSharp?.gatsbyImageData
            ?.height
        }
        publishedDate={data.mdx.frontmatter.publishedDate}
      />
      <script type="application/ld+json">{schemaAsString}</script>
    </>
  )
}

type DataProps = {
  mdx: {
    frontmatter: {
      images: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }[]
      headerImage: {
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }
      title: string
      date: string
      publishedDate: string
      location: string
      type: string
      tags: ReadonlyArray<string>
      description: string
    }
  }
}

export const query = graphql`
  query Post($id: String!, $relatedPosts: [String]) {
    relatedP: allMdx(
      filter: { frontmatter: { title: { in: $relatedPosts } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMM DD, YYYY")
            publishedDate
            title
            location
            headerImage {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
          }
          gpxData {
            id
            fields {
              normalizedPower
              timeInRed
              distance
              stoppedTime
              elapsedTime {
                days
                hours
                minutes
                seconds
              }
            }
          }
        }
      }
    }
    mdx: mdx(id: { eq: $id }) {
      id
      frontmatter {
        publishedDate(formatString: "YYYY-MM-DD")
        date(formatString: "MMM DD, YYYY")
        location
        title
        teaser
        tags
        type
        images {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
        headerImage {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
        headerImageCaption
        description
        stravaUrl
      }
      segments {
        fields {
          segments {
            beginningTime
            segmentDistance
            segmentDuration
            segmentDurationStopped
          }
        }
      }
      results {
        id
        fields {
          data {
            place
            name
            time
          }
        }
      }
      gpxData {
        id
        fields {
          coordinates
          powerZoneBuckets
          powerZones {
            zone
            title
            powerLow
            powerHigh
          }
          currentFtp
          normalizedPower
          elevationGain
          stoppedTime
          timeInRed
          distance
          powerData
          heartRateData
          powerAnalysis {
            entire
          }
          cadenceAnalysis {
            entire
          }
          elapsedTime {
            days
            hours
            minutes
            seconds
          }
          elevationData {
            x
            y
            distance
            grade
          }
          heartAnalysis {
            entire
          }
          matchesBurned {
            averagePower
            index
            totalJoules
            startTime
            totalTime
            vals
          }
          powerCurve {
            x
            y
          }
          tempAnalysis {
            entire
          }
        }
      }
    }
  }
`
