import React from "react";
import {
  Card,
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
  Avatar,
  Link,
  Wrap,
  SimpleGrid,
} from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";
import { MemberInfo, ProjectInfoLeadView } from "../types";
import ScrollContainer from "react-indiana-drag-scroll";
import Image from "next/image";
import { ImageInfo, LinkTag, TechTag } from "../types";
import ProjectSideButtons from "./ProjectSideButtons";
import { mockData } from "../utils/mockData";
import * as DOMPurify from "dompurify";

const Project = ({
  id,
  project,
  members,
  onEditor,
  onPreview,
  isPreview = false,
}: {
  id: number;
  project: ProjectInfoLeadView; // TODO: make new type ProjectInfoPublicView
  members: MemberInfo[];
  onEditor?: () => void;
  onPreview?: () => void;
  isPreview?: boolean;
}) => {
  return (
    <CardBody p="5">
      <Flex>
        <Box>
          <Wrap align="center">
            <Heading as="h3" size="lg">
              {project.title}
            </Heading>
            {project.recruiting && <Badge colorScheme="cyan">recruiting</Badge>}
          </Wrap>
          <Heading pt="5">Description</Heading>
          <Box
            pt={2}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.description) }}
          />
        </Box>
        <Spacer />
        {isPreview && (
          <ProjectSideButtons
            id={id}
            project={project}
            onEditor={onEditor}
            onPreview={onPreview}
            isPreview
          />
        )}
      </Flex>
      <Box pt="5">
        <Heading>Stack</Heading>
        <Wrap pt="2">
          {(!!(project.stack as TechTag[]).length ? (project.stack as TechTag[]) : []).map(
            (tech: TechTag, index) => (
              <Tag key={index} size="sm" variant="solid" borderRadius="sm" colorScheme={tech.color}>
                {tech.label}
              </Tag>
            )
          )}
        </Wrap>
      </Box>
      <Box pt="5">
        <Heading>Links</Heading>
        <Wrap pt="2">
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
      </Box>
      <Box pt="5">
        <Heading>Images</Heading>
        <div>
          <ScrollContainer className="list mt-4 mb-1 flex overflow-auto" hideScrollbars={false}>
            {/* Onclick should open a lightbox */}
            {mockData.images.map((image: ImageInfo, index: number) => (
              <div
                key={index}
                className="mr-2 flex-shrink-0 overflow-hidden rounded bg-placeholder-light dark:bg-placeholder-dark"
              >
                <Image loading="eager" src={image.url} height={400} width={400} alt={image.aria} />
              </div>
            ))}
          </ScrollContainer>
        </div>
      </Box>
      <Box pt="5">
        <Heading>Project Members</Heading>
        <SimpleGrid pt="2" spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
          {}
          {members.map((member: MemberInfo) => (
            // TODO: members does not have users where isCredited is false
            // TODO: Need to change backend to return info to the lead about members
            // TODO: We only need the isCredited for public project view endpoint
            <Card size="sm" key={member.id}>
              <CardBody>
                <Flex>
                  <Avatar src={member.imageUrl} name={member.displayName ?? member.username} />
                  <Box ml="3">
                    <Text fontWeight="bold">{member.displayName ?? member.username}</Text>
                    <Text fontSize="sm">Member</Text>
                  </Box>
                </Flex>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </CardBody>
  );
};

export default Project;
