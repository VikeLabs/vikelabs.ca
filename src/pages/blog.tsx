import React from "react";
import { Box, Center, Container, Flex, Heading, Text } from "@chakra-ui/layout";
import { Contact } from "../components/contact";
import { Metadata } from "../components/metadata";
import { BaseLayout } from "../layouts/base";
import { graphql, useStaticQuery } from "gatsby";

const query = graphql`
  query BlogPageQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/blog/" } }
      sort: { fields: frontmatter___date }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          author
        }
        excerpt(pruneLength: 150, format: PLAIN)
      }
    }
  }
`;

const BlogPage = () => {
  const {
    allMarkdownRemark: { nodes },
  } = useStaticQuery(query);

  return (
    <BaseLayout>
      <Metadata title="Blog" />
      <Box py="10" bgGradient="linear(to-l, #9bd4d2, #92b8ff)">
        <Container maxW="container.xl">
          <Flex align="center" color="gray.700">
            <Heading as="h1" size="4xl" fontFamily="Consolas">
              The
            </Heading>
            <Heading as="h1" size="4xl" fontFamily="Raleway" mx="4">
              VIKELABS
            </Heading>
            <Heading as="h1" size="4xl" fontFamily="Consolas">
              Blog
            </Heading>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.xl">
        {JSON.stringify(nodes, null, 4)}
        <Box my="4">
          <Heading as="h1" size="2xl">
            {nodes[0].frontmatter.title}
          </Heading>
          <Text>{nodes[0].frontmatter.date}</Text>
          <Text>{nodes[0].excerpt}</Text>
        </Box>
        <Contact />
      </Container>
    </BaseLayout>
  );
};

export default BlogPage;
