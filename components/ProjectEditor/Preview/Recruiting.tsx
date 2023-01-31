import { Badge } from "@chakra-ui/react";
import React from "react";

const Recruiting = ({ value }: { value: boolean }) => {
  if (value) {
    return (
      <Badge colorScheme="cyan" display="block">
        recruiting
      </Badge>
    );
  }
  return;
};

export default Recruiting;
