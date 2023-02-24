import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

const RecruitingFor = ({ value }: { value: string[] }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <Box>
      <Accordion
        borderRadius="8"
        borderColor="transparent"
        bgColor="cyan.100"
        textColor="cyan.800"
        allowToggle
      >
        <AccordionItem>
          <h2>
            <AccordionButton borderRadius="8" onClick={() => setAccordionOpen(!accordionOpen)}>
              <Box as="span" flex="1" borderWidth="0" textAlign="left">
                {accordionOpen ? "This project is recruiting for:" : "View available project roles"}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel borderRadius="6" pb={2}>
            {value.map((position: string, index) => (
              <Text key={index}>{position}</Text>
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default RecruitingFor;
