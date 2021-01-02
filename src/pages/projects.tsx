import React from "react";
import { Header } from "../components/Header";
import { Heading, SubHeading } from "../components/Heading";
import { Text } from "../components/Text";
import { Layout } from "../components/Layout";
import { Box } from "../components/Box";
import { Contact } from "../components/Contact";

const ProjectsPage = () => {
  return (
    <Layout>
      <Heading>Projects</Heading>
      <Text>
        Proident mollit voluptate aliqua mollit minim officia ullamco non
        cupidatat dolor culpa sint aute. Sit reprehenderit eu eu ad enim aliquip
        officia pariatur proident. Adipisicing ipsum ullamco ea aliqua id sunt
        esse et consequat exercitation minim et.
      </Text>
      <Box>
        <SubHeading>Passr</SubHeading>
        <Text>
          Id id irure eu commodo irure reprehenderit dolore deserunt adipisicing
          sunt. Aliqua consequat officia consectetur quis aliqua anim cupidatat
          pariatur nostrud ipsum tempor mollit. Lorem occaecat nostrud quis
          exercitation ut exercitation irure Lorem deserunt laboris ad.
        </Text>
      </Box>
      <Box>
        <SubHeading>UVic Course Scraper</SubHeading>
        <Text>
          Ex excepteur occaecat minim commodo do laboris. Pariatur qui elit in
          consectetur mollit quis. Mollit deserunt aliquip velit sunt cillum
          tempor enim aliquip commodo. Ea enim et adipisicing officia aute sint
          mollit eiusmod eiusmod. Consectetur cupidatat do ipsum ullamco
          ullamco. Esse anim commodo qui Lorem laboris consequat. Consequat ea
          Lorem voluptate velit magna esse tempor cillum eu est culpa elit.
        </Text>
      </Box>
      <section>
        <Contact />
      </section>
    </Layout>
  );
};
export default ProjectsPage;
