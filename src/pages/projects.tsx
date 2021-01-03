import React from "react";
import { Heading, SubHeading } from "../components/Heading";
import { Text } from "../components/Text";
import { Layout } from "../components/Layout";
import { Box } from "../components/Box";
import { Contact } from "../components/Contact";
import { graphql, PageProps } from "gatsby";
import { ProjectsPageQuery } from "./__generated__/ProjectsPageQuery";
import { Metadata } from "../components/Metadata";

export const pageQuery = graphql`
  query ProjectsPageQuery {
    allMarkdownRemark {
      nodes {
        # excerpt
        # fields {
        #   slug
        # }
        frontmatter {
          # date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`;

type ProjectsPageProps = PageProps<ProjectsPageQuery>;

const ProjectsPage = ({ data }: ProjectsPageProps) => {
  const projects = data.allMarkdownRemark.nodes;
  return (
    <Layout>
      <Metadata
        title="Projects"
        description="Projects VikeLabs is currently working on or have worked on in the past."
      />
      {projects.map((p) => (
        <section>
          <Heading>{p.frontmatter?.title || ""}</Heading>
          <Text>{p.frontmatter?.description || ""}</Text>
        </section>
      ))}
      <section>
        <Contact />
      </section>
    </Layout>
  );
};

export default ProjectsPage;
