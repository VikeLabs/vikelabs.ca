import React from "react";

import { Heading, Text, Container } from "@chakra-ui/layout";
import { BaseLayout } from "../../layouts/base";
import { Metadata } from "../../components/metadata";
import { GitHubIcon } from "../../components/contact";
import { IconButton } from "@chakra-ui/button";
import { NextPage } from "next";
import { promises as fs } from "fs";
import path from "path";

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: "passr" } }],
    fallback: false, // can also be true or 'blocking'
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
  const { slug } = context.params;
  console.log(slug);
  // fetch file from filesystem (content/projects/[slug].md)
  const p = path.join(process.cwd(), "content", "projects", slug, "index.md");
  const md = await fs.readFile(p, "utf8");
  return {
    // Passed to the page component as props
    props: { data: md },
  };
}

const Project = ({ data }) => {
  // const { title } = data.markdownRemark.frontmatter;
  return (
    <BaseLayout>
      {/* <Metadata title={""} /> */}
      <Container maxW="container.xl">
        <Heading as="h1" size="4xl" fontFamily="Raleway" my="2">
          {/* {data.markdownRemark.frontmatter.title} */}
        </Heading>
        <IconButton
          as="a"
          aria-label="link to courseup github"
          icon={GitHubIcon}
          // href={`https://github.com/${data.markdownRemark.frontmatter.github}`}
          variant="unstyled"
        />
        <pre>{data}</pre>
        {/* <Text>{data.markdownRemark?.frontmatter?.description || ""}</Text> */}
        {/* <Text dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} /> */}
      </Container>
    </BaseLayout>
  );
};
export default Project;
