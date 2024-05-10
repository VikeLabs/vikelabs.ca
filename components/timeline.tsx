import React from "react";
import { Box, Container } from "@chakra-ui/react";
import { TimelineItem } from "./timelineitem";

interface Event {
  id: number;
  ttl: string;
  date: string;
  description: string;
}

interface TimelineProps {
  events: Event[];
}

export const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <Container centerContent>
      <Box position="relative" left="50%" transform="translateX(-50%)">
        {events.map((event, index) => (
          <TimelineItem
            key={event.id}
            ttl={event.ttl}
            date={event.date}
            description={event.description}
          />
        ))}
      </Box>
    </Container>
  );
};
