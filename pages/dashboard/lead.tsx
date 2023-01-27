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

type TechTag = {
  label: string;
  color: string;
};

type LinkTag = TechTag & {
  url: string;
};

const Lead = () => {
  const { user } = useAuthContext();
  const project = useProjectEditView(user?.id, user?.token);

  const live = project.data?.live;
  const draft = project.data?.draft;

  return (
    <DashboardWrapper title="Team Lead">
      {project.isLoading && <Loading />}
      {project.data && (
        <div>
          <Card>
            <CardHeader>
              <Heading size="md">Projects</Heading>
            </CardHeader>
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                {/* Consider refactoring */}
                {live && (
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Live Data
                    </Heading>
                    <Text py="2" fontSize="sm">
                      This info is public on the site.
                    </Text>
                    <Card>
                      <CardBody>
                        <Flex>
                          <Box>
                            <HStack>
                              <Heading size="xs">{live.title}</Heading>
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
                                  <Tag
                                    size="sm"
                                    variant="subtle"
                                    borderRadius="sm"
                                    colorScheme={link.color}
                                  >
                                    <TagLeftIcon boxSize={2.5} as={LinkIcon} />
                                    <TagLabel ml={-1}>{link.label}</TagLabel>
                                  </Tag>
                                </Link>
                              ))}
                            </HStack>
                            <Text pt="1" noOfLines={1}>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et sapien
                              justo. Integer bibendum odio a arcu eleifend dignissim. Integer
                              ullamcorper lacinia velit a porta.
                            </Text>
                          </Box>
                          <Spacer />
                          <Box>
                            <VStack>
                              <IconButton aria-label={`Edit ${live.title}`} icon={<EditIcon />} />
                              <IconButton aria-label={`View ${live.title}`} icon={<ViewIcon />} />
                              <Popover placement="left-end">
                                <PopoverTrigger>
                                  <IconButton
                                    aria-label={`${live.title} Metadata`}
                                    icon={<InfoOutlineIcon />}
                                  />
                                </PopoverTrigger>
                                <Portal>
                                  <PopoverContent>
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                      <Text fontSize="sm">Project ID: {project.data?.id}</Text>
                                      <Text fontSize="sm">Version ID: {live.id}</Text>
                                      <Text fontSize="sm">Order: TODO</Text>
                                      <Text fontSize="sm">Updated by: {live.updatedBy}</Text>
                                      <Text fontSize="sm">Updated at: TODO</Text>
                                      <Text fontSize="sm">Approved by: {live.approvedBy}</Text>
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
                )}
                {draft && (
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Draft Data
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      This info is pending approval from the admins.
                    </Text>
                  </Box>
                )}
              </Stack>
            </CardBody>
          </Card>
          <h2>Live Data</h2>
          {/* <div>ImageURLs: {project.data?.live.imageUrls.toString()}</div>
          <div>RecruitingFor: {project.data?.live.recruitingFor}</div>
          <br />
          <h2>Draft Data</h2>
          <div>ID: {project.data?.draft.id}</div>
          <div>Title: {project.data?.draft.title}</div>
          <div>Desc: {project.data?.draft.description.toString()}</div>
          <div>ImageURLs: {project.data?.draft.imageUrls.toString()}</div>
          <div>Links: {project.data?.draft.links.toString()}</div>
          <div>Stack: {project.data?.draft.stack.toString()}</div>
          <div>UpdatedBy: {project.data?.draft.updatedBy}</div>
          <div>Recruiting: {project.data?.draft.recruiting ? "true" : "false"}</div>
          <div>RecruitingFor: {project.data?.draft.recruitingFor}</div> */}
        </div>
      )}
      <div>
        Your projects:
        {/* Link is /dashboard/teams/teamName */}
        {/* Each project has two edit buttons:
              1. Edit project details
              2. Edit project team members (based on the members existing in DB)
        */}
        <div>CourseUp</div>
        <div>Vikelabs.ca</div>
        <h2>Edit Project</h2>
        <li>Title</li>
        <li>Description</li>
        <li>
          Stack / Technologies - There's a preset list of technologies and colors, but the user can
          add a custom technology + color
        </li>
        <li>Repository link</li>
        <li>Deployment links</li>
        <li>Screenshots</li>
        <li>
          Team members - choose from a list of users in vikelabs that are registered on the site -
          can choose whether to show pfp or not - add by github, with their preferred name and
          github username
        </li>
        <p>They can also see the info</p>
        <li>Order in /projects page</li>
        <li>Preview of what the project preview on /projects page looks like</li>
        <p>
          In this page, users can see preview of their project page and enable editing for each
          section on the same page. There's also a "submit for approval" button to alert admins of
          approval request and a "Save Draft" button to simply save.
        </p>
      </div>
    </DashboardWrapper>
  );
};

export default Lead;
