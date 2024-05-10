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
    id: 1,
    title: "How do I register for the hackathon?",
    body: "Using the google form link found here: https://forms.gle/D6iYz7DFhXS8Cx1bA",
  },
  {
    id: 2,
    title:
      "Can I participate without a team, or do I need to find one beforehand?",
    body: "You can participate in teams of up to 4 people. If you’d like to join a team but don’t know how to form one beforehand, join us for our team networking session at 9am.",
  },
  {
    id: 3,
    title: "Are there any restrictions on team size?",
    body: "Teams are limited to a maximum of 4 people.",
  },
  {
    id: 4,
    title: "What is the theme of the hackathon?",
    body: "The theme of the hackathon is “helping other students”, any sort of tech or system that can help other students, in some way, counts.",
  },
  {
    id: 5,
    title: "Can we start working on our project before the hackathon begins?",
    body: "You may do any non-code related work before the hackathon. This includes mockups and project planning. All programming must happen during the hackathon. We expect to see the commit history of the project on github.",
  },
  {
    id: 6,
    title: "What are the rules for participation?",
    body: "TBA",
  },
  {
    id: 7,
    title: "How will projects be judged, and what are the criteria?",
    body: "TBA",
  },
  {
    id: 8,
    title: "Are there any restrictions on the tools or languages we can use?",
    body: "No, you may use any tools you see fit.",
  },
  {
    id: 9,
    title:
      "Will there be any workshops or mentor sessions before or during the hackathon?",
    body: "TBA",
  },
  {
    id: 10,
    title:
      "What facilities and resources will be provided (e.g., Wi-Fi, power, workspace)?",
    body: "Wi-Fi, power, workspace, and lunch will all be provided.",
  },
  {
    id: 11,
    title: "What prizes will be awarded?",
    body: "TBA",
  },
  {
    id: 12,
    title:
      "Will there be mentors or technical support available during the event?",
    body: "Yes, there will be mentors and technical support throughout the hackathon.",
  },
];

export const Faq = () => {
  return (
    <Accordion>
      {Entries.map((entry) => (
        <AccordionItem key={entry.id}>
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
