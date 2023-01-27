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
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Switch,
} from "@chakra-ui/react";
import { EditIcon, InfoOutlineIcon, LinkIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { GetProjectEditViewResponse, MemberInfo } from "../types";
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
import { Controller, useForm } from "react-hook-form";

export type ProjectEditorForm = Omit<
  ProjectInfo,
  "id" | "updatedBy" | "updatedAt" | "approvedBy" | "approvedAt"
> & {
  members: MemberInfo[];
};

const ProjectEditor = ({
  id,
  project,
  members,
  onEditor,
  preview,
  onPreview,
  isPreview = false,
}: {
  id: number;
  project: ProjectInfo;
  members: MemberInfo[];
  onEditor?: () => void;
  preview: boolean;
  onPreview?: () => void;
  isPreview?: boolean;
}) => {
  // TODO: When modified, disable the editor button. previewer now uses the edited project values
  // TODO: If the user edits, it should replace the current draft if it hasnt been approved
  // const [projectInfo, setProjectInfo] = useState(project);
  const { formState, handleSubmit, control, reset } = useForm<ProjectEditorForm>({
    defaultValues: {
      title: project.title,
      description: project.description,
      links: project.links,
      stack: project.stack,
      imageUrls: project.imageUrls,
      recruiting: project.recruiting,
      recruitingFor: project.recruitingFor,
      members,
    },
  });

  const onSubmit = (data: ProjectEditorForm) => {
    console.log("Form submitted: ", data);
    // editUserMutation.mutate(data, {
    //   onSuccess: (response) => {
    //     if (response.ok) {
    //       console.log("editUserMutation succeeded!");
    //       setIsEditing(false);
    //     } else {
    //       console.log("editUserMutation failed!");
    //       if (response.status === 401) {
    //         dispatch({ type: "logout" });
    //       }
    //     }
    //   },
    // });
  };

  return (
    <CardBody>
      <Flex>
        <Box>
          <Wrap align="center" m="-1" p="1" mr="4" spacing="5">
            <FormControl isInvalid={!!formState.errors.title} width="auto">
              {!preview && <FormLabel>Title</FormLabel>}
              <Controller
                control={control}
                name="title"
                render={({ field: { onChange, value } }) => (
                  <>
                    {preview ? (
                      <Heading>{value}</Heading>
                    ) : (
                      <Input type="title" value={value} onChange={onChange} minWidth={300} />
                    )}
                  </>
                )}
              />
              {!formState.errors.title && <FormErrorMessage>Title is required.</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!formState.errors.title} width="auto">
              {!preview && <FormLabel>Recruiting</FormLabel>}
              <Controller
                control={control}
                name="recruiting"
                render={({ field: { onChange, value } }) => (
                  <>
                    {preview ? (
                      <>{value && <Badge colorScheme="cyan">recruiting</Badge>}</>
                    ) : (
                      <Switch size="lg" isChecked={value} onChange={onChange} />
                    )}
                  </>
                )}
              />
              {!formState.errors.title && <FormErrorMessage>Title is required.</FormErrorMessage>}
            </FormControl>
          </Wrap>
          <Heading pt="5">Description</Heading>
          <Text pt="2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et sapien justo. Integer
            bibendum odio a arcu eleifend dignissim. Integer ullamcorper lacinia velit a porta.
          </Text>
        </Box>
        <Spacer />
        {isPreview && (
          <ProjectSideButtons
            id={id}
            project={project}
            members={members}
            onEditor={onEditor}
            preview={preview}
            onPreview={onPreview}
            isPreview
          />
        )}
      </Flex>
      <Box pt="5">
        <Heading>Stack</Heading>
        <Wrap pt="2">
          {mockData.stack.map((tech: TechTag, index) => (
            <Tag key={index} size="sm" variant="solid" borderRadius="sm" colorScheme={tech.color}>
              {tech.label}
            </Tag>
          ))}
        </Wrap>
      </Box>
      <Box pt="5">
        <Heading>Links</Heading>
        <Wrap pt="2">
          {mockData.links.map((link: LinkTag, index) => (
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
            {mockData.images.map((image: ImageInfo, index: number) => (
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

export default ProjectEditor;
