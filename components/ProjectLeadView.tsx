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

const ProjectLeadView = ({
  id,
  project,
  members,
  onEditor,
  onPreview,
}: {
  id: number;
  project: ProjectInfo;
  members: MemberInfo[];
  onEditor: () => void;
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
            {[
              {
                id: "551f0f28-5d6a-43ee-96d8-6b51e92b9e64",
                username: "robchendev",
                displayName: "Robert Chen",
                imageUrl: "https://avatars.githubusercontent.com/u/66714443?v=4s",
                github: "robchendev",
                discord: "chend#1234",
              },
              { id: "128728912746712892", username: "someguy123" },
              { id: "128728912746712893", username: "someguy123" },
              { id: "128728912746712894", username: "someguy123" },
              { id: "128728912746712895", username: "someguy123" },
              { id: "128728912746712896", username: "someguy123" },
            ].map((member: MemberInfo) => (
              <Avatar key={member.id} name={member.displayName} src={member.imageUrl} />
            ))}
          </AvatarGroup>
          <Wrap pt="2">
            {[
              { label: "TypeScript", color: "blue" },
              { label: "React", color: "cyan" },
              { label: "Go", color: "teal" },
              { label: "Python", color: "orange" },
            ].map((tech: TechTag, index) => (
              <Tag key={index} size="sm" variant="solid" borderRadius="sm" colorScheme={tech.color}>
                {tech.label}
              </Tag>
            ))}
            {[
              {
                label: "Website",
                color: "blackAlpha",
                url: "https://github.com/VikeLabs/vikelabs.ca",
              },
              {
                label: "GitHub",
                color: "purple",
                url: "https://github.com/VikeLabs/vikelabs.ca",
              },
              {
                label: "Android",
                color: "green",
                url: "https://github.com/VikeLabs/vikelabs.ca",
              },
              {
                label: "iOS",
                color: "blue",
                url: "https://github.com/VikeLabs/vikelabs.ca",
              },
            ].map((link: LinkTag, index) => (
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
        <Box>
          <VStack>
            <IconButton
              aria-label={`Edit ${project.title}`}
              icon={<EditIcon />}
              onClick={onEditor}
            />
            <IconButton
              aria-label={`View ${project.title}`}
              icon={<ViewIcon />}
              onClick={onPreview}
            />
            <Popover placement="left-end">
              <PopoverTrigger>
                <IconButton aria-label={`${project.title} Metadata`} icon={<InfoOutlineIcon />} />
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Text fontSize="sm">Project ID: {id}</Text>
                    <Text fontSize="sm">Version ID: {project.id}</Text>
                    <Text fontSize="sm">Order: TODO</Text>
                    <Text fontSize="sm">Updated by: {project.updatedBy}</Text>
                    <Text fontSize="sm">Updated at: TODO</Text>
                    <Text fontSize="sm">Approved by: {project.approvedBy}</Text>
                    <Text fontSize="sm">Approved at: TODO</Text>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
          </VStack>
        </Box>
      </Flex>
    </CardBody>
  );
};

export default ProjectLeadView;
