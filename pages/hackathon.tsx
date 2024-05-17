import { Box, Flex, Grid, Container, Heading, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import Image from "next/image";
import { Contact } from "../components/contact";
import { BaseLayout } from "../layouts/base";

import kickoff2021 from "../public/kickoff2021.jpg";
import { Faq } from "../components/hackathonfaq";
import { Supporters } from "../components/hackathonsupporters";
import { Timeline } from "../components/timeline";

const events = [
  {
    id: 1,
    ttl: "Team Formation (optional)",
    date: "9:00am",
    description:
      "Want help finding a team? Come to the optional team formation session!",
  },
  {
    id: 2,
    ttl: "Hackathon Kick-off",
    date: "9:30am",
    description: "We'll do a quick presentation and start hacking.",
  },
  {
    id: 3,
    ttl: "Lunch time with a special guest speaker!",
    date: "12:30pm",
    description:
      "Lunch will be provided, you'll also get to hear from a special guest speaker.",
  },
  {
    id: 4,
    ttl: "End Hacking",
    date: "5:30pm",
    description:
      "After a long day of hacking you'll be able to get to decompress by working on your project presentation.",
  },
  {
    id: 5,
    ttl: "Project Presentations and Judging",
    date: "5:30pm",
    description:
      "You'll have a chance to show off all your hard work by presenting your project to the judges and other participants."
  },
  {
    id: 6,
    ttl: "End Presentations and Determining Winners",
    date: "7:30pm",
    description:
      "We will deliberate, tally scores, and determine the winners."
  },
  {
    id: 7,
    ttl: "Closing Ceremony and Winners Announced",
    date: "8:30pm",
    description: "We'll announce the winners and hand out prizes!",
  },
];

export const Hackathon: NextPage = () => {
  return (
    <BaseLayout>
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
                fontSize={["2em", "3em", "4em"]}
                color="gray.700"
                lineHeight={[1, 1, 1.15]}
              >
                VIKELABS HACKATHON 2024
              </Heading>
              <Text fontSize="1.5em" color="black.700" my="5">
                Join us for a day of hacking, learning, and fun! This hackathon
                is a great opportunity to meet other students, learn new skills,
                and build something cool.
              </Text>
            </Flex>
            <Flex
              direction="column"
              justifyContent="center"
              display={["none", "none", "flex"]}
            >
              <Image
                alt="three VikeLabs members"
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
          <Heading color="black">Hackathon Schedule</Heading>
          <Timeline events={events} />
        </Container>
      </Box>
      <Box py="10">
        <Container maxW="container.xl">
          <Heading mb="5">Pre-Hackathon Preparation</Heading>
          <Text mb="2">
            <b>Project Scope:</b> Remember, the hackathon timeframe is limited, so plan your projects to be achievable within this period. Keep your project scope small and manageable.
          </Text>
          <Text mb="2">
            <b>Designs/Mock Ups:</b> You are welcome to prepare your designs in Figma before the hackathon. However, please remember that all coding must be done during the hackathon itself. We will be checking version control to ensure fairness.
          </Text>
          <Text mb="2">
            <b>GitHub Setup:</b> Make sure you have a GitHub account set up before the event. Ensure Git is installed on your computer. If you need help, here's a <a href=" ">GitHub Guide</a> to get you started.
          </Text>
          <Text mb="2">
            <b>What to Bring:</b>
          </Text>
          <Box></Box>
          <Text ml="10" mb="2">
            <ul>
              <li>
                Laptop and Charger: Essential for all your hacking needs.
              </li>

              <li>
                Water Bottle: Stay hydrated!
              </li>

              <li>
                Snacks: Keep your energy up throughout the event.
              </li>

              <li>
                Some form of ID: Just to make sure you're signed up.

              </li>
            </ul>
          </Text>
          <Text mb="2">
            <b>
              Schedule and Team Formation:
            </b>
          </Text>
          <Text mb="2">
            We will kick off with a team formation session for those who haven't yet joined a team. Feel free to bring an idea or two, we'll do some brief icebreakers and then organize into teams.
          </Text>
          <Heading mb="5">Frequently Asked Questions</Heading>
          <Faq />
          <Box mb="5"></Box>
          <Heading mb="5">Hackathon Rubric</Heading>
          <iframe src="rubric.html" width="100%" height="500px"></iframe>
          <Box mb="5"></Box>
          <Supporters />
          <Contact />
        </Container>
      </Box>
    </BaseLayout>
  );
};

export default Hackathon;
