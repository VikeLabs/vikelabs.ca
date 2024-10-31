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
import { Contact, DiscordIcon, discordInvite } from "../components/contact";
import { BaseLayout as Layout } from "../layouts/base";
import { Metadata } from "../components/metadata";
import { Button, ButtonGroup } from "@chakra-ui/button";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { NextPage } from "next";
import vikeLabsPhoto from "../public/vikelabs.jpg";

const connect =
  "Network with like-minded, passionate other students and professionals within the industry. We're active in on Discord and GitHub.";
const learn =
  "Learn new skills and technologies through workshops and events. Work with peers to build projects and applications.";
const build =
  "Build projects and applications that you can add to your portfolio and resume. ";

export const Index: NextPage = () => {
  return (
    <Layout>
      <Script
        src="https://analytics.eu.umami.is/script.js"
        data-website-id="f1ec35c0-1910-4ef4-8558-53b9871ac849"
      ></Script>
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
                fontSize={["4em", "5em", "6em"]}
                color="gray.700"
                lineHeight={[1, 1, 1.15]}
              >
                Connect; Learn; Build;
              </Heading>
              <Text fontSize="1em" color="gray.700" my="5">
                We are a community of student developers, designers, and entrepreneurs
                who are passionate about building software solutions for students at
                University of Victoria
              </Text>
              <ButtonGroup>
                <Link href="/about" passHref>
                  <Button as="a" colorScheme="blue">
                    Learn More
                  </Button>
                </Link>

                <Button
                  variant="black"
                  leftIcon={DiscordIcon}
                  as="a"
                  href={discordInvite}
                >
                  Join Our Discord!
                </Button>
              </ButtonGroup>
            </Flex>
            <Flex
              direction="column"
              justifyContent="center"
              display={["none", "none", "flex"]}
            >
              <Image
                alt="three VikeLabs members"
                placeholder="blur"
                height={400}
                width={600}
                src={vikeLabsPhoto}
                style={{
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
              { title: "Connect", body: connect },
              { title: "Learn", body: learn },
              { title: "Build", body: build },
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
};

export default Index;
