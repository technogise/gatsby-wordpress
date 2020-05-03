const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // query content for WordPress posts
  const result = await graphql(`
  {
    allWordpressPost {
      edges {
        node {
          id
          slug
          status
          template
        }
      }
    }
  }
`)

  if (result.errors) {
    console.error(result.errors)
  }

  const { allWordpressPost } = result.data

  const postTemplate = path.resolve(`./src/templates/post.js`)
  allWordpressPost.edges.forEach(edge => {
    createPage({
      path: `/${edge.node.slug}/`,
      component: slash(postTemplate),
      context: {
        id: edge.node.id,
      },
    })
  })
}