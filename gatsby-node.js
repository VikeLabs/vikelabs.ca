const path = require('path')

exports.createPages = async ({ graphql, actions }) => {

  const { data } = await graphql(`
    query ProjectBlog {
      projects: allMarkdownRemark(
        filter: {frontmatter: {type: {eq: "project"}}}
      ) {
        nodes {
          frontmatter {
            title
          }
        }
      }
      blogs: allMarkdownRemark(
        filter: {frontmatter: {type: {eq: "blog"}}}
      ) {
        nodes {
          frontmatter {
            title
          }
        }
      }
    }
  `)

  data.projects.nodes.forEach(node => {
    actions.createPage({
      path: '/p/' + node.frontmatter.title.toLowerCase().replaceAll(" ","-"),
      component: path.resolve('./src/templates/project/project.js'),
      context: {
        title: node.frontmatter.title,
      },
    })
  })

  data.blogs.nodes.forEach(node => {
    actions.createPage({
      path: '/b/' + node.frontmatter.title.toLowerCase().replaceAll(" ","-"),
      component: path.resolve('./src/templates/blog/blog.js'),
      context: {
        title: node.frontmatter.title,
      },
    })
  })
}