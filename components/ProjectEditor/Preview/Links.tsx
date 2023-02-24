import { LinkIcon } from "@chakra-ui/icons";
import { Link, Tag, TagLabel, TagLeftIcon, Wrap } from "@chakra-ui/react";
import React from "react";
import { LinkTag } from "../../../types";
import { colorShade, hexToRgbA } from "../../../utils/colorHelpers";

const Links = ({ value }: { value: LinkTag[] }) => {
  return (
    <Wrap pt="2">
      {value.map((item: LinkTag, index) => (
        <Link href={item.url} key={index} lineHeight={1} isExternal>
          <Tag
            key={index}
            size="md"
            variant="subtle"
            borderRadius="sm"
            colorScheme={item.color.includes("#") ? undefined : item.color}
            bgColor={item.color.includes("#") ? hexToRgbA(item.color, 0.3) : undefined}
            textColor={item.color.includes("#") ? colorShade(item.color, -100) : undefined}
          >
            <TagLeftIcon boxSize={2.5} as={LinkIcon} />
            <TagLabel ml={-1}>{item.label}</TagLabel>
          </Tag>
        </Link>
      ))}
    </Wrap>
  );
};

export default Links;
