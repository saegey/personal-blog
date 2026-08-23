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

type GalleryData = {
  data?: {
    allFile: {
      nodes: { id: string; fields?: { data?: { slug?: string } } }[]
    }
  }
  errors?: any
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage, createRedirect } = actions

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

  // Convenience redirect for Instagram bio
  createRedirect({
    fromPath: '/link-in-bio',
    toPath: '/links',
    isPermanent: true,
    redirectInBrowser: true,
  })

  function createPagesForDir(
    nodes: any[],
    dir: string,
    template: string,
    contextCb: (post: any) => object,
  ) {
    return nodes
      .filter(post => post.internal.contentFilePath.includes(dir))
      .map(post => {
        console.log(`Creating page for ${post.fields.slug}`)
        createPage({
          path: `${post.fields.slug}`,
          component: `${template}?__contentFilePath=${post.internal.contentFilePath}`,
          context: contextCb(post),
        })
      })
  }

  const createPostPromise = createPagesForDir(
    result.data?.allMdx.nodes,
    '/content/posts/',
    path.resolve('./src/templates/post.tsx'),
    post => ({
      slug: post.fields.slug,
      id: post.id,
      relatedPosts: post.frontmatter.related ? post.frontmatter.related : [],
    }),
  )

  const createBlogPromise = createPagesForDir(
    result.data?.allMdx.nodes,
    '/content/blogs/',
    path.resolve('./src/templates/blog.tsx'),
    post => ({
      slug: post.fields.slug,
      id: post.id,
    }),
  )

  const createProjectPromise = createPagesForDir(
    result.data?.allMdx.nodes,
    '/content/projects/',
    path.resolve('./src/templates/project.tsx'),
    post => ({
      slug: post.fields.slug,
      id: post.id,
    }),
  )

  const galleries: GalleryData = await graphql(`
    { allFile(filter: {sourceInstanceName: {eq: "galleries"}}) { nodes { id fields { data } } } }
  `)
  if (galleries.errors) reporter.panic(`Error loading galleries`, galleries.errors)
  galleries.data?.allFile.nodes.forEach(gallery => {
    const slug = gallery.fields?.data?.slug
    if (!slug) return
    createPage({
      path: `/gallery/${slug}/`,
      component: path.resolve('./src/templates/gallery.tsx'),
      context: { id: gallery.id },
    })
  })

  await Promise.all([
    createPostPromise,
    createBlogPromise,
    createProjectPromise,
  ])
}
