import { Box, FormControl, FormErrorMessage } from "@chakra-ui/react";
import React from "react";
import SectionLabel from "./SectionLabel";

const Section = ({
  label,
  isPreview,
  children,
  error = [],
  noPt = false,
}: {
  label: string;
  isPreview: boolean;
  children: React.ReactNode;
  error?: [boolean, string] | []; // isError, errorMessage
  noPt?: boolean;
}) => {
  return (
    <Box pt={noPt ? 0 : 2}>
      <FormControl isInvalid={error.length === 2 ? error[0] : false} width="auto">
        <SectionLabel label={label} isPreview={isPreview} />
        {error.length === 2 && <FormErrorMessage>{error[1]}</FormErrorMessage>}
        <Box pb="2">{children}</Box>
      </FormControl>
    </Box>
  );
};

export default Section;
