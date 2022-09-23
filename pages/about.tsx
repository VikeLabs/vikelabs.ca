import { SimpleGrid, ListItem } from "@chakra-ui/layout";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  UnorderedList,
  Heading,
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { Contact } from "../components/contact";
import { Metadata } from "../components/metadata";
import { BaseLayout } from "../layouts/base";

export const About: NextPage = () => {
  return (
    <BaseLayout>
      <Metadata
        title="About"
        description="Learn more about VikeLabs, it's mission and it's members."
      />
      <Box py="10">
        <Container maxW="container.xl">
          <Text>
            VikeLabs is a student-run software development club at the
            University of Victoria.
          </Text>
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
          <Accordion>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    When was VikeLabs formed and by whom? How did it get its
                    name?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                VikeLabs was formed in September 2019 by founding students
                Bryce, Braiden, Goh and Chris. It was originally called the UVic
                Product Development Club before rebranding to VikeLabs.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    What is the group’s purpose?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                VikeLabs is a collective of students who learn to build, deploy,
                and test software by developing solutions to problems that exist
                within the UVic community and beyond. In the process members are
                able to learn about software development, product management,
                and design.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    About how many members do you have and from what
                    disciplines?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                We have around eighty five currently active members, mostly from
                software engineering and computer science, as we are mainly a
                software development club. But, we welcome students from any
                faculty and are always looking for outside ideas and
                perspectives.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    What are the criteria for taking on a project?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                At the beginning of the school year we do a large brainstorm,
                where we invite all club members to come together and think up
                new project ideas. We take the ideas that we think will have the
                best impact in helping others around UVic and are feasible to
                implement. Then solidify those ideas, recruit team leads, and
                build out the project from there.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Where do project ideas usually come from?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                As above, the project ideas are a product of many innovative
                minds coming together to solve problems and think of solutions,
                mainly surrounding UVic.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Who is the leadership team?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                The leadership team is made up of the:
                <UnorderedList>
                  <ListItem>President - Samantha</ListItem>
                  <ListItem>Director of Projects - Danielle</ListItem>
                  <ListItem>Director of Marketing - Liam</ListItem>
                  <ListItem>Director of Finance - OPEN</ListItem>
                  <ListItem>Director of Projects - OPEN</ListItem>
                  <ListItem>Director of Events - OPEN</ListItem>
                  <ListItem>Advisor - Aomi</ListItem>
                </UnorderedList>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <Contact />
        </Container>
      </Box>
    </BaseLayout>
  );
};

export default About;
