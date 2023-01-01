import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

const Entries = [
  {
    title: "When was VikeLabs formed and by whom? How did it get its name?",
    body: "VikeLabs was formed in September 2019 by founding students Bryce, Braiden, Goh and Chris. It was originally called the UVic Product Development Club before rebranding to VikeLabs.",
  },
  {
    title: "What is the group’s purpose?",
    body: "VikeLabs is a collective of students who learn to build, deploy, and software by developing solutions to problems that exist within the UVic community and beyond. In the process members are able to learn about software development, product management, and design.",
  },
  {
    title: "About how many members do you have and from what disciplines?",
    body: "We have around eighty five currently active members, mostly from software engineering and computer science, as we are mainly a software development club. But, we welcome students from any faculty and are always looking for outside ideas and perspectives.",
  },
  {
    title: "What are the criteria for taking on a project?",
    body: "At the beginning of the school year we do a large brainstorm, where we invite all club members to come together and think up new project ideas. We take the ideas that we think will have the best impact in helping others around UVic and are feasible to implement. Then solidify those ideas, recruit team leads, and build out the project from there.",
  },
  {
    title: "Where do project ideas usually come from?",
    body: "As above, the project ideas are a product of many innovative minds coming together to solve problems and think of solutions, mainly surrounding UVic.",
  },
];

export const Faq = () => {
  return (
    <Accordion>
      {Entries.map((entry) => (
        <AccordionItem key={entry.title}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {entry.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Box>{entry.body}</Box>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
