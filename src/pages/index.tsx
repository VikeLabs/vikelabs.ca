import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";
import { space, SpaceProps } from "styled-system";
import { Box } from "../components/Box";
import { Button } from "../components/Button";
import { Contact } from "../components/Contact";
import { Heading, SubHeading } from "../components/Heading";
import { Layout } from "../components/Layout";
import { Text } from "../components/Text";

const Section = styled.section<SpaceProps>`
  ${space}
`;

const IndexPage = () => {
  return (
    <Layout>
      <Section mb="4">
        <Box display="flex" flexDirection={{ sm: "column", md: "row" }}>
          <Box p="4">
            <Heading>Design, Build & Do</Heading>
            <Text>
              VikeLabs is a team based club of UVic students who collaboratively
              build apps to learn more about software development, efficient
              product management, and good design practices.
            </Text>
            <a href="#contact">
              <Button mr="20px">Contact Us</Button>
            </a>
            <Link to="/projects">
              <Button>Projects</Button>
            </Link>
          </Box>
          <Box>
            <img width="670px" height="480px" />
          </Box>
        </Box>
      </Section>
      <Section mb="4">
        <Box display="flex" flexDirection="row-reverse" p="2">
          <Box>
            <Box p="4">
              <SubHeading>A little about VikeLabs</SubHeading>
              <Text>
                VikeLabs is a collective of students who learn to build, deploy,
                and test software quickly. We view UVic as a kind of laboratory
                for testing solutions to problems that exist within the UVic
                community. We limit ourselves to the UVic community because it's
                much easier to deploy and test solutions to users where we are
                in close proximity to them and their problems. This does not
                mean that the problem can't also exist in the broader world, in
                fact, we encourage you to look for problems that have a large
                overlap between the UVic population and the rest of the world.
              </Text>
            </Box>
          </Box>
          <Box>
            <img width="480px" height="480px" />
          </Box>
        </Box>
      </Section>
      <Section mb="4">
        <Box display="flex" justifyContent="center" flexDirection="column">
          <SubHeading textAlign="center">How does this work?</SubHeading>
          <Box>
            <Text textAlign="center">
              Each semester starts out with a call for ideas from our members.
              The VikeLabs executive team will then review new idea proposals to
              ensure they make sense to include under our umbrella. Each team
              member then has the opportunity to rank their preferred projects
              and state who they want to work with (so we don't break up people
              who joined together). The executive team, working with team leads,
              will then decide who goes on what team and why.
            </Text>
          </Box>
          <Box display="flex" justifyContent="space-between">
            {/* TODO: replace with actual images / non static sizes */}
            <img width="370px" height="230px" />
            <img width="370px" height="230px" />
            <img width="370px" height="230px" />
          </Box>
        </Box>
      </Section>
      <Contact />
    </Layout>
  );
};
export default IndexPage;
