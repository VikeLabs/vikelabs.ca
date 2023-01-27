import React, { useCallback, useState } from "react";
import { useAuthContext } from "../../components/AuthContextProvider";
import DashboardWrapper from "../../components/DashboardWrapper";
import Loading from "../../components/Loading";
import { useProjectEditView } from "../../hooks/useProjectEditView";
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
import { MemberInfo } from "../../types";
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

type TechTag = {
  label: string;
  color: string;
};

type LinkTag = TechTag & {
  url: string;
};

const ProjectHeader = ({ heading, text }: { heading: string; text: string }) => (
  <>
    <Heading size="xs" textTransform="uppercase">
      {heading}
    </Heading>
    <Text py="2" fontSize="sm">
      {text}
    </Text>
  </>
);

const ProjectCard = ({
  id,
  project,
  members,
}: {
  id: number;
  project: ProjectInfo;
  members: MemberInfo[];
}) => {
  const [preview, setPreview] = useState(false);

  return (
    <Card>
      {preview ? (
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et sapien justo.
                Integer bibendum odio a arcu eleifend dignissim. Integer ullamcorper lacinia velit a
                porta.
              </Text>
            </Box>
            <Spacer />
            <Box>
              <VStack>
                <IconButton aria-label={`Edit ${project.title}`} icon={<EditIcon />} />
                <IconButton
                  aria-label={`View ${project.title}`}
                  colorScheme="teal"
                  icon={<ViewOffIcon />}
                  onClick={() => setPreview(false)}
                />
                <Popover placement="left-end">
                  <PopoverTrigger>
                    <IconButton
                      aria-label={`${project.title} Metadata`}
                      icon={<InfoOutlineIcon />}
                    />
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
          <Box pt="5">
            <Heading>Stack</Heading>
            <Wrap pt="2">
              {[
                { label: "TypeScript", color: "blue" },
                { label: "React", color: "cyan" },
                { label: "Go", color: "teal" },
                { label: "Python", color: "orange" },
              ].map((tech: TechTag, index) => (
                <Tag
                  key={index}
                  size="sm"
                  variant="solid"
                  borderRadius="sm"
                  colorScheme={tech.color}
                >
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
      ) : (
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
                  <Tag
                    key={index}
                    size="sm"
                    variant="solid"
                    borderRadius="sm"
                    colorScheme={tech.color}
                  >
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et sapien justo.
                Integer bibendum odio a arcu eleifend dignissim. Integer ullamcorper lacinia velit a
                porta.
              </Text>
            </Box>
            <Spacer />
            <Box>
              <VStack>
                <IconButton aria-label={`Edit ${project.title}`} icon={<EditIcon />} />
                <IconButton
                  aria-label={`View ${project.title}`}
                  icon={<ViewIcon />}
                  onClick={() => setPreview(true)}
                />
                <Popover placement="left-end">
                  <PopoverTrigger>
                    <IconButton
                      aria-label={`${project.title} Metadata`}
                      icon={<InfoOutlineIcon />}
                    />
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
      )}
    </Card>
  );
};

type ImageInfo = {
  aria: string;
  url: string;
};

// TODO: If a draft exists, grey out the live data controls
const Lead = () => {
  const { user } = useAuthContext();
  const project = useProjectEditView(user?.id, user?.token);

  const live = project.data?.live;
  const draft = project.data?.draft;

  // Mock data
  const mockMembers: MemberInfo[] = [
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
  ];

  // TODO: Need to get ProjectHasMembers' role property sorted out

  return (
    <DashboardWrapper title="Team Lead">
      {project.isLoading && <Loading />}
      {project.data && (
        <Card>
          <CardHeader>
            <Heading size="md">Projects</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              {/* Consider refactoring */}
              {live && (
                <Box>
                  <ProjectHeader heading="Live Info" text="This info is public on the website" />
                  <ProjectCard id={project.data?.id} project={live} members={mockMembers} />
                </Box>
              )}
              {draft && (
                <Box>
                  <ProjectHeader
                    heading="Draft Info"
                    text="This info is pending approval from the admins"
                  />
                  <ProjectCard id={project.data?.id} project={draft} members={mockMembers} />
                </Box>
              )}
            </Stack>
          </CardBody>
        </Card>
      )}
    </DashboardWrapper>
  );
};

export default Lead;
