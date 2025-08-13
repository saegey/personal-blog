import type { GatsbyNode } from 'gatsby'
import path from 'path'

type MdxData = {
  data?: {
    allMdx: {
      nodes: {
        id: string
        fields: {
          slug: string
        }
        frontmatter: {
          related: Array<string>
          isActive: boolean
        }
        internal: {
          contentFilePath: string
        }
      }[]
    }
  }
  errors?: any
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions

  const result: MdxData = await graphql(`
    {
      allMdx(
        # filter: { frontmatter: { isActive: { ne: false } } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            type
            related
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic(`Error loading posts`, result.errors)
    throw result.errors
  }

  if (!result.data) {
    reporter.panic(`No Data`, result.errors)
    throw 'No data found'
  }

  createPage({
    path: `/`,
    component: path.resolve('./src/pages/home.tsx'),
  })

  const postTemplate = path.resolve('./src/templates/post.tsx')
  const blogTemplate = path.resolve('./src/templates/blog.tsx')
  const postsDir = '/content/posts/'
  const blogsDir = '/content/blogs/'

  const createPostPromise = result.data?.allMdx.nodes
    .filter(post => post.internal.contentFilePath.includes(postsDir))
    .map(post => {
      createPage({
        path: `${post.fields.slug}`,
        component: `${postTemplate}?__contentFilePath=${post.internal.contentFilePath}`,
        context: {
          slug: post.fields.slug,
          id: post.id,
          relatedPosts: post.frontmatter.related ? post.frontmatter.related : [],
        },
      })
    })

  const createBlogPromise = result.data?.allMdx.nodes
    .filter(post => post.internal.contentFilePath.includes(blogsDir))
    .map(post => {
      createPage({
        path: `${post.fields.slug}`,
        component: `${blogTemplate}?__contentFilePath=${post.internal.contentFilePath}`,
        context: {
          slug: post.fields.slug,
          id: post.id,
        },
      })
    })

  await Promise.all([createPostPromise, createBlogPromise])
}
