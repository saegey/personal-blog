import { graphql } from 'gatsby'
import { Container, Box, Divider, Flex, Button } from 'theme-ui'
import { PageProps } from 'gatsby'
import { ImageDataLike } from 'gatsby-plugin-image'

import Seo from '../components/seo'
import FeaturedPost from '../components/home/FeaturedPost'
import Hero from '../components/home/Hero'

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
  const [visibleCount, setVisibleCount] = useState(3)

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, posts.length))
  }

  return (
    <Container sx={{ paddingTop: '0', maxWidth: '1045px', margin: '0 0' }}>
      <Box sx={{ marginX: [3, 5, 5] }}>
        <Hero />
        <Divider sx={{ marginBottom: '20px', color: 'primaryMuted' }} />
        <Flex sx={{ gap: '20px', flexDirection: 'column', marginBottom: 5 }}>
          {posts.length === 0 ? (
            <div>No posts found.</div>
          ) : (
            posts.slice(0, visibleCount).map((node, idx, arr) => (
              <>
                <FeaturedPost
                  key={node.fields.slug}
                  headerImage={node.frontmatter.headerImage}
                  title={node.frontmatter.title}
                  slug={node.fields.slug}
                  teaser={node.frontmatter.teaser}
                  subType={node.frontmatter.subType}
                  updatedAt={node.frontmatter.publishedDate}
                />
                {idx < arr.length - 1 && <Divider color="primaryMuted" />}
              </>
            ))
          )}
          {visibleCount < posts.length && (
            <Flex sx={{ justifyContent: 'center', marginTop: '20px' }}>
              <Box>
                <Button variant="primary" onClick={handleLoadMore}>
                  Load More
                </Button>
              </Box>
            </Flex>
          )}
        </Flex>
      </Box>
    </Container>
  )
}

export const Head: React.FC<PageProps<DataProps>> = ({ data }) => {
  return (
    <Seo
      title="Home"
      description="Home page about races and detailed breakdown of how they went down"
      pathname="/"
      image={data.allMdx.nodes[0].frontmatter.headerImage}
    />
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
              gatsbyImageData(placeholder: BLURRED)
            }
          }
          publishedDate
        }
      }
    }
  }
`
