import { FormLabel, Heading } from "@chakra-ui/react";
import React from "react";

const SectionLabel = ({
  label,
  isPreview,
  noHeading = false,
}: {
  label: string;
  isPreview: boolean;
  noHeading?: boolean;
}) => {
  if (noHeading && isPreview) return <></>;
  if (isPreview) return <Heading>{label}</Heading>;
  return <FormLabel>{label}</FormLabel>;
};

export default SectionLabel;
