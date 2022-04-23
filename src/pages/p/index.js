import { graphql } from "gatsby"
import React from "react"
import Layout from "../../components/Layout/Layout"
import SearchBar from "../../components/SearchBar/SearchBar"

const Projects = ({ data }) => {
  let pageName = 'Projects'
  let description = 'Projects are the heart and soul of VikeLabs. Here you\'ll find the various projects our members are currently working on and previous projects we\'ve taken on.'
  return (
    <Layout title="Projects">
      <SearchBar 
        title={pageName}
        slug={pageName.toLowerCase().substring(0,1)}
        description={description}
        placeholder={`search ${pageName.toLowerCase()}...`} 
        data={data.projects.nodes} 
      >
      </SearchBar>
    </Layout>
  )
}

export const query = graphql`
  query ProjectsPage {
    projects: allMarkdownRemark(
      filter: {frontmatter: {type: {eq: "project"}}}
      sort: {fields: frontmatter___title, order: ASC}
    ) {
      nodes {
        frontmatter {
          title
          description
          github
          members {
            name
            role
          }
        }
      }
    }
  }
`

export default Projects