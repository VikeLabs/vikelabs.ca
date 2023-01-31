import { Box, FormControl, FormErrorMessage } from "@chakra-ui/react";
import React from "react";
import SectionLabel from "./SectionLabel";

const Section = ({
  label,
  isPreview,
  children,
  error = [],
  noPt = false,
  noPb = false,
  noHeading = false,
  disabled = false,
  hidden = false,
}: {
  label: string;
  isPreview: boolean;
  children: React.ReactNode;
  error?: [boolean, string] | []; // isError, errorMessage
  noPt?: boolean;
  noPb?: boolean;
  noHeading?: boolean;
  disabled?: boolean;
  hidden?: boolean;
}) => {
  if (hidden) {
    return <></>;
  }
  return (
    <Box pt={disabled || noPt ? 0 : 2}>
      <FormControl
        height={disabled && isPreview && 0}
        isInvalid={error.length === 2 ? error[0] : false}
        width="auto"
      >
        <SectionLabel label={label} isPreview={isPreview} noHeading={disabled || noHeading} />
        {error.length === 2 && <FormErrorMessage>{error[1]}</FormErrorMessage>}
        <Box pb={disabled || noPb ? 0 : 2}>{children}</Box>
      </FormControl>
    </Box>
  );
};

export default Section;
