import React from "react";
import {
  Box,
  Text,
  VStack,
  Circle,
  useColorModeValue,
  Flex,
  CloseButton,
} from "@chakra-ui/react";
import { on } from "events";

interface TimelineItemProps {
  ttl: string;
  date: string;
  description: string;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  ttl,
  date,
  description,
}) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <VStack align="start" spacing={4}>
      <Flex direction={"column"}>
        <Box
          borderLeft="2px"
          borderColor={borderColor}
          position="relative"
          left="10px"
          paddingLeft={"20px"}
        >
          <Circle size="11px" bg="blue.500" position="absolute" left="-5px" />
          <Box
            backgroundColor={"lightblue"}
            boxShadow={"md"}
            width={400}
            borderRadius={10}
            paddingLeft={2}
          >
            <Text fontWeight="bold">{ttl}</Text>
            <Text fontSize="sm">{date}</Text>
            <Text fontSize="md">{description}</Text>
          </Box>
          <Circle
            size="11px"
            bg="blue.500"
            position="absolute"
            left="-5px"
            bottom={"0px"}
          />
        </Box>
        <Box
          left="10px"
          position="relative"
          height={"30px"}
          borderLeft="2px dotted"
          borderColor={borderColor}
        ></Box>
      </Flex>
    </VStack>
  );
};
