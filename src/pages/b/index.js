import { graphql } from "gatsby"
import React from "react"
import Layout from "../../components/Layout/Layout"
import SearchBar from "../../components/SearchBar/SearchBar"

const Blogs = ({ data }) => {
  let pageName = 'Blogs'
  let description = 'Someone write something here...'
  return (
    <Layout title="Blogs">
      <SearchBar 
        title={pageName}
        slug={pageName.toLowerCase().substring(0,1)}
        description={description}
        placeholder={`search ${pageName.toLowerCase()}...`} 
        data={data.blogs.nodes} 
      >
      </SearchBar>
    </Layout>
  )
}

export const query = graphql`
  query BlogsPage {
    blogs: allMarkdownRemark(
      filter: {frontmatter: {type: {eq: "blog"}}}
      sort: {fields: frontmatter___title, order: ASC}
    ) {
      nodes {
        frontmatter {
          title
          author
          date
        }
      }
    }
  }
`

export default Blogs