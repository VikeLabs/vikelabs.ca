import { Heading } from "@chakra-ui/react";
import React from "react";

export const Title = ({ value }: { value: string }) => (
  <Heading as="h3" size="lg">
    {value}
  </Heading>
);
