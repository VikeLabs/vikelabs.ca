import React from "react";
import { Box } from "@chakra-ui/react";
import {
  Center,
  Container,
  Flex,
  Grid,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/layout";
import { Contact } from "../components/contact";
import { BaseLayout as Layout } from "../layouts/base";
import { Metadata } from "../components/metadata";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { Link as GatsbyLink } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

export default function Home() {
  return (
    <Layout>
      <Metadata title="Home" />
      <Box bgGradient="linear(to-l, #9bd4d2, #ffc6e3)">
        <Container maxW="container.xl">
          <Grid
            templateColumns={[null, "repeat(1, 1fr)", "repeat(2, 1fr)"]}
            gap={15}
            py={["5", "10", "10"]}
          >
            <Flex direction="column" justifyContent="center">
              <Heading
                as="h1"
                fontFamily="Consolas"
                fontSize={["4em", "5em", "6em"]}
                color="gray.700"
                lineHeight={[1, 1, 1.15]}
              >
                Connect; Learn; Build;
              </Heading>
              <Text fontSize="1em" color="gray.700" my="5">
                We are a community of student developers, designers, and
                entrepreneurs who are passionate about building the future of
                the software.
              </Text>
              <ButtonGroup>
                <Button colorScheme="green">Get Started</Button>
                <Button as={GatsbyLink} colorScheme="blue" to="/about">
                  Learn More
                </Button>
              </ButtonGroup>
            </Flex>
            <Flex
              direction="column"
              justifyContent="center"
              display={["none", "none", "flex"]}
            >
              <StaticImage
                alt="three VikeLabs members"
                placeholder="blurred"
                // layout="fixed"
                src="https://cdn.discordapp.com/attachments/800600228842962955/892635824154370058/IMG_1320.JPG"
                imgStyle={{
                  borderRadius: "20px",
                }}
              />
            </Flex>
          </Grid>
        </Container>
      </Box>
      <Box as="section" py="7" bg="gray.100">
        <Container maxW="container.xl">
          <Center my="2">
            <Heading as="h2" size="2xl" my="4">
              How does this work?
            </Heading>
          </Center>
          <Box my="6">
            <Text>
              Each semester starts out with a call for ideas from our members.
              The VikeLabs executive team will then review new idea proposals to
              ensure they make sense to include under our umbrella. Each team
              member then has the opportunity to rank their preferred projects
              and state who they want to work with (so we don't break up people
              who joined together). The executive team, working with team leads,
              will then decide who goes on what team and why.
            </Text>
          </Box>
          <SimpleGrid columns={[1, 1, 3]} spacing={10} my="6">
            {[
              { title: "Connect", body: "" },
              { title: "Learn", body: "" },
              { title: "Build", body: "" },
            ].map((item) => (
              <Box bg="white" borderRadius="xl" p="5" key={item.title}>
                <Center>
                  <Heading as="h3" size="xl" color="blue.700" my="3">
                    {item.title}
                  </Heading>
                </Center>
                <Text>{item.body}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
      <Box as="section" py="2">
        <Container maxW="container.xl">
          <Contact />
        </Container>
      </Box>
    </Layout>
  );
}
