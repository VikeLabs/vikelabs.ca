import { Box, Container, Flex, Heading, Text } from "@chakra-ui/layout";

import { Contact } from "../components/contact";
import { BaseLayout } from "../layouts/base";
import { Metadata } from "../components/metadata";

const ProjectsPage = () => {
  const projects = [];
  return (
    <BaseLayout>
      <Metadata title="Projects" />
      <Box py="10" bgGradient="linear(to-l, #9bd4d2, #92b8ff)">
        <Container maxW="container.xl">
          <Flex align="center" color="gray.700">
            <Heading as="h1" size="4xl" fontFamily="Consolas">
              Projects
            </Heading>
          </Flex>
          <Text>
            Projects are the heart and soul of VikeLabs. Here you'll find the various projects our
            members are currently working on and previous projects we've taken on.
          </Text>
        </Container>
      </Box>
      <Box py="10">
        <Container maxW="container.xl">
          {projects.map((p) => (
            <Box as="section" my="8" key={p}>
              {/* <Link as={GLink} to={`/projects${p.fields.slug}`} fontSize="4xl">
                {p.frontmatter?.title || ""}
              </Link> */}
              {/* <Text>{p.frontmatter?.description || ""}</Text> */}
            </Box>
          ))}
          <Contact />
        </Container>
      </Box>
    </BaseLayout>
  );
};

export default ProjectsPage;
