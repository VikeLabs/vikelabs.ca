import React from "react";
import {
  CardBody,
  Heading,
  Box,
  Text,
  Badge,
  Tag,
  Flex,
  Spacer,
  TagLabel,
  TagLeftIcon,
  AvatarGroup,
  Avatar,
  Link,
  Wrap,
} from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";
import { MemberInfo, ProjectInfoLeadView } from "../types";
import { LinkTag, TechTag } from "../types";
import ProjectSideButtons from "./ProjectSideButtons";
import { mockData } from "../utils/mockData";
import { colorShade, hexToRgbA } from "../utils/colorHelpers";

const ProjectLeadView = ({
  id,
  project,
  members,
  onEditor,
  onPreview,
  isPreview = false,
  hasDraft,
  isDraft,
}: {
  id: number;
  project: ProjectInfoLeadView;
  members: MemberInfo[];
  onEditor: () => void;
  onPreview: () => void;
  isPreview?: boolean;
  hasDraft: boolean;
  isDraft: boolean;
}) => {
  const excerpt = project.description.replaceAll("<p>", "").replaceAll("</p>", " ");
  return (
    <CardBody>
      <Flex>
        <Box pr="2">
          <Wrap align="center">
            <Heading size="xs">{project.title}</Heading>
            {project.recruiting && <Badge colorScheme="cyan">recruiting</Badge>}
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
                  colorScheme={tech.color.includes("#") ? undefined : tech.color}
                  bgColor={tech.color.includes("#") ? tech.color : undefined}
                >
                  {tech.label}
                </Tag>
              )
            )}
            {(!!(project.links as LinkTag[]).length ? (project.links as LinkTag[]) : []).map(
              (link: LinkTag, index) => (
                <Link href={link.url} key={index} lineHeight={1} isExternal>
                  <Tag
                    size="sm"
                    variant="subtle"
                    borderRadius="sm"
                    colorScheme={link.color.includes("#") ? undefined : link.color}
                    bgColor={link.color.includes("#") ? hexToRgbA(link.color, 0.3) : undefined}
                    textColor={link.color.includes("#") ? colorShade(link.color, -100) : undefined}
                  >
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
          onEditor={onEditor}
          onPreview={onPreview}
          isPreview={isPreview}
          hasDraft={hasDraft}
          isDraft={isDraft}
        />
      </Flex>
    </CardBody>
  );
};

export default ProjectLeadView;
