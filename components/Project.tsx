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

const Project = ({
  id,
  project,
  members,
  onEditor,
  onExitPreview,
  isPreview = false,
}: {
  id: number;
  project: ProjectInfo;
  members: MemberInfo[];
  onEditor?: () => void;
  onExitPreview?: () => void;
  isPreview?: boolean;
}) => {
  return (
    <CardBody>
      <Flex>
        <Box>
          <Wrap align="center">
            <Heading as="h3" size="lg">
              {project.title}
            </Heading>
            <Badge colorScheme="cyan">recruiting</Badge>
          </Wrap>
          <Heading pt="5">Description</Heading>
          <Text pt="2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et sapien justo. Integer
            bibendum odio a arcu eleifend dignissim. Integer ullamcorper lacinia velit a porta.
          </Text>
        </Box>
        <Spacer />
        {isPreview && (
          <Box>
            <VStack>
              <IconButton
                aria-label={`Edit ${project.title}`}
                icon={<EditIcon />}
                onClick={onEditor}
              />
              <IconButton
                aria-label={`View ${project.title}`}
                colorScheme="teal"
                icon={<ViewOffIcon />}
                onClick={onExitPreview}
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
        )}
      </Flex>
      <Box pt="5">
        <Heading>Stack</Heading>
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
        </Wrap>
      </Box>
      <Box pt="5">
        <Heading>Links</Heading>
        <Wrap pt="2">
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
      </Box>
      <Box pt="5">
        <Heading>Images</Heading>
        <div>
          <ScrollContainer className="list mt-4 mb-1 flex overflow-auto" hideScrollbars={false}>
            {[
              { aria: "grey cat", url: "https://placekitten.com/400/400" },
              { aria: "grey cat", url: "https://placekitten.com/500/400" },
              { aria: "grey cat", url: "https://placekitten.com/400/400" },
            ].map((image: ImageInfo, index: number) => (
              <div
                key={index}
                className="mr-2 flex-shrink-0 overflow-hidden rounded bg-placeholder-light dark:bg-placeholder-dark"
              >
                <Image
                  loading="eager"
                  src={image.url}
                  // height={height}
                  height={400}
                  width={400}
                  // objectFit="cover"
                  alt={image.aria}
                />
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
