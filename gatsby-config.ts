require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2017',
  },
})

module.exports = {
  siteMetadata: {
    title: `Saegey`,
    author: {
      name: `Adam Saegebarth`,
      summary: `a senior software engineer, endurance athlete, and creative technologist based in Seattle — building at the intersection of code, culture, and community.`,
    },
    description: `The personal site of Adam Saegebarth — stories and projects spanning software engineering, data-driven creativity, vinyl DJ culture, and endurance cycling.`,
    siteUrl: `https://saegey.com`,
    social: {
      instagram: `saegey`,
      twitter: `saegey`,
      github: `saegey`,
      strava: `saegey`,
      linkedin: `saegey`,
    },
    about: {
      kicker: `About Me`,
      headline: `I’m Adam Saegebarth — senior software engineer, endurance athlete, and vinyl selector.`,
      intro: `I build products end‑to‑end, document training and race data, and spin global sounds on 100% vinyl. I’ve spent years across startups and established teams in Seattle and Miami, pairing engineering craft with culture, community, and curiosity.`,
      stats: [
        { label: `Home Base`, value: `Seattle, WA` },
        { label: `Day Job`, value: `Senior Full‑Stack Engineer` },
        { label: `Community`, value: `Rapha Cycling Club - Ride Leader` },
      ],
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: ['G-45TP2BZ76F'],
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: { maxWidth: 900 },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blogs`,
        path: `${__dirname}/content/blogs`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/content/projects`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `results`,
        path: `${__dirname}/content/results`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `stats`,
        path: `${__dirname}/content/stats`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `galleries`,
        path: `${__dirname}/content/galleries`,
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `dominantColor`,
          quality: 90,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
          tracedSVGOptions: {},
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Saegey`,
        short_name: `Saegey`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
  ],
}
