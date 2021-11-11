import React from "react";
import { graphql } from "gatsby";
import { Heading, Text } from "@chakra-ui/layout";
import { BaseLayout } from "../../layouts/base";
import { Metadata } from "../../components/metadata";
import { GitHubIcon } from "../../components/contact";
import { IconButton } from "@chakra-ui/button";

// https://www.gatsbyjs.com/docs/reference/routing/file-system-route-api

const ProjectTemplate = ({ data }) => {
  const { title } = data.markdownRemark.frontmatter;
  return (
    <BaseLayout>
      <Metadata title={title} />
      <Heading as="h1" size="4xl" fontFamily="Raleway" my="2">
        {data.markdownRemark.frontmatter.title}
      </Heading>
      <IconButton
        as="a"
        aria-label="link to courseup github"
        icon={GitHubIcon}
        href={`https://github.com/${data.markdownRemark.frontmatter.github}`}
        variant="unstyled"
      />
      <Text>{data.markdownRemark?.frontmatter?.description || ""}</Text>
      <Text dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </BaseLayout>
  );
};
export default ProjectTemplate;

// This is the funky stuff that makes Gatsby both great but wonderful.
// Imagine the following query being run:
// {
//   allMarkdownRemark {
//     nodes {
//       fields {
//         slug
//       }
//     }
//   }
// }

// src/pages/projects/{MarkdownRemark.fields__slug}.tsx

export const pageQuery = graphql`
  query ProjectBySlug($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        description
        github
      }
      html
    }
  }
`;
