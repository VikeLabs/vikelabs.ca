import React from "react";
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
} from "@chakra-ui/react";
import { EditIcon, InfoOutlineIcon, LinkIcon, ViewIcon } from "@chakra-ui/icons";
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

type TechTag = {
  label: string;
  color: string;
};

type LinkTag = TechTag & {
  url: string;
};

const ProjectCard = ({
  heading,
  subheading,
  projectInfo,
  projectId,
}: {
  heading: string;
  subheading: string;
  projectInfo: ProjectInfo;
  projectId: number;
}) => (
  <Box>
    <Heading size="xs" textTransform="uppercase">
      {heading}
    </Heading>
    <Text py="2" fontSize="sm">
      {subheading}
    </Text>
    <Card>
      <CardBody>
        <Flex>
          <Box>
            <HStack>
              <Heading size="xs">{projectInfo.title}</Heading>
              <Badge colorScheme="cyan">recruiting</Badge>
            </HStack>
            <AvatarGroup pt="2" size="md" max={5}>
              <Avatar
                name="Robert Chen"
                src="https://avatars.githubusercontent.com/u/66714443?v=4s"
              />
              <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
              <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
              <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
              <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
              <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
            </AvatarGroup>
            {/* {project.data?.members.map((member: MemberInfo) => (
                              <div key={member.id}>
                                <Avatar
                                  name={member.displayName ?? member.username}
                                  src={member.imageUrl}
                                />
                              </div>
                            ))} */}
            {/* <Text>{project.data?.members}</Text> */}
            <HStack pt="2">
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
            </HStack>
            <Text pt="1" noOfLines={1}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et sapien justo. Integer
              bibendum odio a arcu eleifend dignissim. Integer ullamcorper lacinia velit a porta.
            </Text>
          </Box>
          <Spacer />
          <Box>
            <VStack>
              <IconButton aria-label={`Edit ${projectInfo.title}`} icon={<EditIcon />} />
              <IconButton aria-label={`View ${projectInfo.title}`} icon={<ViewIcon />} />
              <Popover placement="left-end">
                <PopoverTrigger>
                  <IconButton
                    aria-label={`${projectInfo.title} Metadata`}
                    icon={<InfoOutlineIcon />}
                  />
                </PopoverTrigger>
                <Portal>
                  <PopoverContent>
                    <PopoverCloseButton />
                    <PopoverBody>
                      <Text fontSize="sm">Project ID: {projectId}</Text>
                      <Text fontSize="sm">Version ID: {projectInfo.id}</Text>
                      <Text fontSize="sm">Order: TODO</Text>
                      <Text fontSize="sm">Updated by: {projectInfo.updatedBy}</Text>
                      <Text fontSize="sm">Updated at: TODO</Text>
                      <Text fontSize="sm">Approved by: {projectInfo.approvedBy}</Text>
                      <Text fontSize="sm">Approved at: TODO</Text>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>
            </VStack>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  </Box>
);

// TODO: If a draft exists, grey out the live data controls
const Lead = () => {
  const { user } = useAuthContext();
  const project = useProjectEditView(user?.id, user?.token);

  const live = project.data?.live;
  const draft = project.data?.draft;

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
                <ProjectCard
                  heading="Live Info"
                  subheading="This project info is live"
                  projectInfo={live}
                  projectId={project.data?.id}
                />
              )}
              {draft && (
                <ProjectCard
                  heading="Draft Info"
                  subheading="This project info is pending approval from the admins"
                  projectInfo={draft}
                  projectId={project.data?.id}
                />
              )}
            </Stack>
          </CardBody>
        </Card>
      )}
    </DashboardWrapper>
  );
};

export default Lead;
