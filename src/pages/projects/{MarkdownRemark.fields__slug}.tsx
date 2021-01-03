import React from "react";
import { graphql, PageProps } from "gatsby";
import { Layout } from "../../components/Layout";
import { ProjectBySlug } from "./__generated__/ProjectBySlug";
import { Metadata } from "../../components/Metadata";

// This template is used to create the route /projects/{slug}
// The slug (ie. vikelabs.ca/projects/passr) is created in gatsby-node.js

// Use Gatsby PageProps with the generated GraphQL type defs (from query below)
type ProjectTemplateProps = PageProps<ProjectBySlug>;

const ProjectTemplate = ({ data }: ProjectTemplateProps) => {
  return (
    <Layout>
      {/* TODO: better metadata */}
      <Metadata title={data.markdownRemark?.frontmatter?.title || ""} />
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </Layout>
  );
};
export default ProjectTemplate;

export const pageQuery = graphql`
  query ProjectBySlug($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        description
      }
    }
  }
`;
