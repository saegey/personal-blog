import { graphql } from 'gatsby'
import { Container, Box, Flex, Button, Text } from 'theme-ui'
import { PageProps } from 'gatsby'
import { ImageDataLike } from 'gatsby-plugin-image'

import Seo from '../components/seo'
import FeaturedPost from '../components/home/FeaturedPost'
import Hero from '../components/home/Hero'
import { useSiteMetadata } from '../hooks/use-site-metadata'

type PostProps = {
  frontmatter: {
    headerImage: ImageDataLike | undefined
    title: string
    teaser: string
    type: string
    subType: string
    publishedDate: Date
  }
  fields: {
    slug: string
  }
}

type DataProps = {
  allMdx: {
    nodes: Array<PostProps>
  }
}

import React, { useState } from 'react'

const HomePage: React.FC<PageProps<DataProps>> = ({ data }) => {
  const posts = data?.allMdx?.nodes ?? []
  const [visibleCount, setVisibleCount] = useState(6)

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, posts.length))
  }

  return (
    <Container sx={{ paddingTop: '0' }}>
      <Hero />
      <Flex sx={{ gap: '20px', flexDirection: 'column', marginBottom: 5 }}>
        {posts.length === 0 ? (
          <div>No posts found.</div>
        ) : (
          posts
            .slice(0, visibleCount)
            .map(node => (
              <FeaturedPost
                key={node.fields.slug}
                headerImage={node.frontmatter.headerImage}
                title={node.frontmatter.title}
                slug={node.fields.slug}
                teaser={node.frontmatter.teaser}
                subType={node.frontmatter.subType}
                updatedAt={node.frontmatter.publishedDate}
              />
            ))
        )}
        {visibleCount < posts.length && (
          <Flex sx={{ justifyContent: 'center', marginTop: '20px' }}>
            <Box>
              <Button variant="primary" onClick={handleLoadMore}>
                <Text sx={{ color: 'primaryMuted', fontWeight: 500 }}>
                  Load More
                </Text>
              </Button>
            </Box>
          </Flex>
        )}
      </Flex>
    </Container>
  )
}

export const Head: React.FC<PageProps<DataProps>> = ({ data }) => {
  const site = useSiteMetadata()
  const title = site.title
  const description = site.description
  const pathname = '/'
  const first = data.allMdx.nodes?.[0]
  const gimg =
    first?.frontmatter?.headerImage &&
    // @ts-ignore
    first.frontmatter.headerImage.childImageSharp?.gatsbyImageData

  // Build WebSite & Organization JSON-LD
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: site.siteUrl,
    name: site.title,
    description: site.description,
  }
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.title,
    url: site.siteUrl,
    sameAs: site.social?.twitter
      ? [`https://twitter.com/${site.social.twitter}`]
      : undefined,
  }

  return (
    <>
      <Seo
        title={title}
        description={description}
        pathname={pathname}
        image={gimg}
      />
      <link
        rel="alternate"
        type="application/rss+xml"
        title={`${site.title} RSS`}
        href={`${site.siteUrl}/rss.xml`}
      />
      <script type="application/ld+json">
        {JSON.stringify(websiteJsonLd)}
      </script>
      <script type="application/ld+json">{JSON.stringify(orgJsonLd)}</script>
    </>
  )
}

export default HomePage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          subType
          title
          tags
          type
          teaser
          headerImage {
            childImageSharp {
              gatsbyImageData(
                placeholder: BLURRED
                width: 800
                quality: 70
                layout: CONSTRAINED
              )
            }
          }
          publishedDate
        }
      }
    }
  }
`
