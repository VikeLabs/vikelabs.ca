import React from "react";
import { SimpleGrid } from "@chakra-ui/layout";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { Contact } from "../components/contact";
import { Metadata } from "../components/metadata";
import { BaseLayout } from "../layouts/base";
import { graphql, useStaticQuery } from "gatsby";

const query = graphql`
  query AboutPageQuery {
    markdownRemark(fields: { slug: { eq: "/about/" } }) {
      frontmatter {
        description
      }
    }
  }
`;

export default function About() {
  const data = useStaticQuery(query);

  return (
    <BaseLayout>
      <Metadata title="About" />
      <Box py="10">
        <Container maxW="container.xl">
          <Text>{data.markdownRemark.frontmatter.description}</Text>
        </Container>
      </Box>

      <Box py="10" bg="#108091" my="5">
        <Container maxW="container.xl">
          <SimpleGrid columns={[1, 1, 2]} spacing={10}>
            <Heading color="white">
              We're part of the University of Victoria Students' Society
            </Heading>
            <Text color="white">
              {data.markdownRemark.frontmatter.description}
            </Text>
          </SimpleGrid>
        </Container>
      </Box>
      <Box py="10" bg="#f28022" my="5">
        <Container maxW="container.xl">
          <SimpleGrid columns={[1, 1, 2]} spacing={10}>
            <Heading color="white">
              We're part of the UVic Engineering Student Society
            </Heading>
            <Text color="white">
              {data.markdownRemark.frontmatter.description}
            </Text>
          </SimpleGrid>
        </Container>
      </Box>
      <Box py="10">
        <Container maxW="container.xl">
          {data.markdownRemark.frontmatter.description}
          <Contact />
        </Container>
      </Box>
    </BaseLayout>
  );
}
