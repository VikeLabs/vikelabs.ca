import { SimpleGrid } from "@chakra-ui/layout";
import { Box, Flex, Grid, Container, Heading, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Image from "next/image";
import { Contact } from "../components/contact";
import { Metadata } from "../components/metadata";
import { BaseLayout } from "../layouts/base";

import kickoff2021 from "../public/kickoff2021.jpg";
import { Faq } from "../components/faq";
import { Supporters } from "../components/supporters";

export const About: NextPage = () => {
  return (
    <BaseLayout>
      <Metadata
        title="About"
        description="Learn more about VikeLabs, it's mission and it's members."
      />
      <Box>
        <Container maxW="container.xl">
          <Grid
            templateColumns={[null, "repeat(1, 1fr)", "repeat(2, 1fr)"]}
            gap={15}
            py={["5", "7", "7"]}
          >
            <Flex direction="column" justifyContent="center">
              <Heading
                as="h1"
                fontSize={["4em", "5em", "6em"]}
                color="gray.700"
                lineHeight={[1, 1, 1.15]}
              >
                VIKELABS
              </Heading>
              <Text fontSize="1em" color="gray.700" my="5">
                We are a community of student developers, designers, and
                entrepreneurs who are passionate about building the future of
                the software.
              </Text>
            </Flex>
            <Flex
              direction="column"
              justifyContent="center"
              display={["none", "none", "flex"]}
            >
              <Image
                alt="Three VikeLabs members"
                placeholder="blur"
                height={450}
                width={600}
                src={kickoff2021}
                style={{
                  borderRadius: "20px",
                }}
              />
            </Flex>
          </Grid>
        </Container>
      </Box>

      <Box py="10" bg="#108091" my="5">
        <Container maxW="container.xl">
          <SimpleGrid columns={[1, 1, 2]} spacing={10}>
            <Heading color="white">
              We're part of the University of Victoria Students' Society
            </Heading>
            <Text color="white">
              We get funding from the UVSS to run our events and workshop each
              semester. We also get access to the UVSS's resources like rooms
              and equipment. Special project grants are also available to
              through the UVSS.
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
              We get funding from the UVic Engineering Student Society to
              support our projects and events. Each year, we also get access to
              the Cinkant grant, which is a grant for special projects.
            </Text>
          </SimpleGrid>
        </Container>
      </Box>
      <Box py="10">
        <Container maxW="container.xl">
          <Heading mb="5">FAQ</Heading>
          <Faq />
          <Supporters />
          <Contact />
        </Container>
      </Box>
    </BaseLayout>
  );
};

export default About;
