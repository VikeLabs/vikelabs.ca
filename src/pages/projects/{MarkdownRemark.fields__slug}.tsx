import React from "react";
import { graphql, PageProps } from "gatsby";
import { Layout } from "../../components/Layout";
import { ProjectBySlug } from "./__generated__/ProjectBySlug";

// Use Gatsby PageProps with the generated GraphQL type defs (from query below)
type ProjectTemplateProps = PageProps<ProjectBySlug>;

const ProjectTemplate = ({ data }: ProjectTemplateProps) => {
  return (
    <Layout>
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
