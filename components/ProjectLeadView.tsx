import React, { useCallback, useState } from "react";
import { useAuthContext } from "../components/AuthContextProvider";
import DashboardWrapper from "../components/DashboardWrapper";
import Loading from "../components/Loading";
import { useProjectEditView } from "../hooks/useProjectEditView";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Box,
  StackDivider,
  Text,
  Badge,
  HStack,
  Tag,
  Flex,
  Spacer,
  TagLabel,
  TagRightIcon,
  TagLeftIcon,
  AvatarGroup,
  Avatar,
  IconButton,
  VStack,
  Portal,
  Link,
  Wrap,
  SimpleGrid,
} from "@chakra-ui/react";
import { EditIcon, InfoOutlineIcon, LinkIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { MemberInfo } from "../types";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { ProjectInfo } from "@prisma/client";
import ScrollContainer from "react-indiana-drag-scroll";
import Image from "next/image";
import { ImageInfo, LinkTag, TechTag } from "../types";
import ProjectSideButtons from "./ProjectSideButtons";
import { mockData } from "../utils/mockData";

const ProjectLeadView = ({
  id,
  project,
  members,
  onEditor,
  preview,
  onPreview,
}: {
  id: number;
  project: ProjectInfo;
  members: MemberInfo[];
  onEditor: () => void;
  preview: boolean;
  onPreview: () => void;
}) => {
  return (
    <CardBody>
      <Flex>
        <Box>
          <Wrap align="center">
            <Heading size="xs">{project.title}</Heading>
            <Badge colorScheme="cyan">recruiting</Badge>
          </Wrap>
          <AvatarGroup pt="2" size="md" max={5}>
            {mockData.memberInfo.map((member: MemberInfo) => (
              <Avatar key={member.id} name={member.displayName} src={member.imageUrl} />
            ))}
          </AvatarGroup>
          <Wrap pt="2">
            {mockData.stack.map((tech: TechTag, index) => (
              <Tag key={index} size="sm" variant="solid" borderRadius="sm" colorScheme={tech.color}>
                {tech.label}
              </Tag>
            ))}
            {mockData.links.map((link: LinkTag, index) => (
              <Link href={link.url} key={index} lineHeight={1} isExternal>
                <Tag size="sm" variant="subtle" borderRadius="sm" colorScheme={link.color}>
                  <TagLeftIcon boxSize={2.5} as={LinkIcon} />
                  <TagLabel ml={-1}>{link.label}</TagLabel>
                </Tag>
              </Link>
            ))}
          </Wrap>
          <Text pt="1" noOfLines={1}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et sapien justo. Integer
            bibendum odio a arcu eleifend dignissim. Integer ullamcorper lacinia velit a porta.
          </Text>
        </Box>
        <Spacer />
        <ProjectSideButtons
          id={id}
          project={project}
          members={members}
          onEditor={onEditor}
          preview={preview}
          onPreview={onPreview}
          isPreview
        />
      </Flex>
    </CardBody>
  );
};

export default ProjectLeadView;
