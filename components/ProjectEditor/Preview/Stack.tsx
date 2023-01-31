import { Tag, Wrap } from "@chakra-ui/react";
import React from "react";
import { TechTag } from "../../../types";

const Stack = ({ value }: { value: TechTag[] }) => {
  return (
    <Wrap pt="2">
      {value.map((item: TechTag, index) => (
        <Tag
          key={index}
          size="sm"
          variant="solid"
          borderRadius="sm"
          colorScheme={item.color.includes("#") ? undefined : item.color}
          bgColor={item.color.includes("#") ? item.color : undefined}
        >
          {item.label}
        </Tag>
      ))}
    </Wrap>
  );
};

export default Stack;
