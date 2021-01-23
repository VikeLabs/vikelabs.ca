import React from "react";
import { Heading, SubHeading } from "../components/Heading";
import { Text } from "../components/Text";
import { Layout } from "../components/Layout";
import { Box } from "../components/Box";
import { Contact } from "../components/Contact";
import { graphql, Link, PageProps } from "gatsby";
import { ProjectsPageQuery } from "./__generated__/ProjectsPageQuery";
import { Metadata } from "../components/Metadata";

export const pageQuery = graphql`
  query ProjectsPageQuery {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/projects/" } }) {
      nodes {
        # excerpt
        fields {
          slug
        }
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
          {/* TODO: enable links when pages are built */}
          {/* <Link to={`/projects${p.fields?.slug || ""}`}> */}
          <Heading>{p.frontmatter?.title || ""}</Heading>
          {/* </Link> */}
          <Text>{p.frontmatter?.description || ""}</Text>
        </section>
      ))}
      {/* TODO: add a separation line. */}
      <section>
        <Contact />
      </section>
    </Layout>
  );
};

export default ProjectsPage;
