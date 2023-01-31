import { Box } from "@chakra-ui/react";
import { sanitize } from "dompurify";
import React from "react";

const Description = ({ value }: { value: string }) => (
  <Box pt="2" dangerouslySetInnerHTML={{ __html: sanitize(value) }} />
);

export default Description;
