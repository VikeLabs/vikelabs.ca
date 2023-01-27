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
import { LinkTag, MemberInfo, TechTag } from "../../types";
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
import Project from "../../components/Project";
import ProjectLeadView from "../../components/ProjectLeadView";
import ProjectEditor from "../../components/ProjectEditor";

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
  const [editor, setEditor] = useState(false);

  // TODO: order of these conditions need to be changed later
  return (
    <Card>
      {editor ? (
        <ProjectEditor
          id={id}
          project={project}
          members={members}
          onEditor={() => setEditor(false)}
          preview={preview}
          onPreview={() => setPreview(!preview)}
          isPreview
        />
      ) : (
        <>
          {preview ? (
            <Project
              id={id}
              project={project}
              members={members}
              onEditor={() => setEditor(true)}
              preview={preview}
              onPreview={() => setPreview(false)}
              isPreview
            />
          ) : (
            <ProjectLeadView
              id={id}
              project={project}
              members={members}
              onEditor={() => setEditor(true)}
              preview={preview}
              onPreview={() => setPreview(true)}
            />
          )}
        </>
      )}
    </Card>
  );
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
