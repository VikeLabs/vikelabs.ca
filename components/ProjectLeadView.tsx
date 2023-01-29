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
import { MemberInfo, ProjectInfoLeadView } from "../types";
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
  project: ProjectInfoLeadView;
  members: MemberInfo[];
  onEditor: () => void;
  preview: boolean;
  onPreview: () => void;
}) => {
  const excerpt = project.description.replaceAll("<p>", "").replaceAll("</p>", " ");
  return (
    <CardBody>
      <Flex>
        <Box pr="2">
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
            {(!!(project.stack as TechTag[]).length ? (project.stack as TechTag[]) : []).map(
              (tech: TechTag, index) => (
                <Tag
                  key={index}
                  size="sm"
                  variant="solid"
                  borderRadius="sm"
                  colorScheme={tech.color}
                >
                  {tech.label}
                </Tag>
              )
            )}
            {(!!(project.links as LinkTag[]).length ? (project.links as LinkTag[]) : []).map(
              (link: LinkTag, index) => (
                <Link href={link.url} key={index} lineHeight={1} isExternal>
                  <Tag size="sm" variant="subtle" borderRadius="sm" colorScheme={link.color}>
                    <TagLeftIcon boxSize={2.5} as={LinkIcon} />
                    <TagLabel ml={-1}>{link.label}</TagLabel>
                  </Tag>
                </Link>
              )
            )}
          </Wrap>
          {/* This cuts out only <p></p> not <i> <b> <strong> etc */}
          <Text pt={1} noOfLines={1}>
            {excerpt}
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
