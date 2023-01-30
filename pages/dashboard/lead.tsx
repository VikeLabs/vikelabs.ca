import React, { useState } from "react";
import { useAuthContext } from "../../components/AuthContextProvider";
import DashboardWrapper from "../../components/DashboardWrapper";
import Loading from "../../components/Loading";
import { useProjectEditView } from "../../hooks/useProjectEditView";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  Box,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { MemberInfo, ProjectInfoLeadView } from "../../types";
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
  project: ProjectInfoLeadView;
  members: MemberInfo[];
}) => {
  const [isPreview, setPreview] = useState(false);
  const [isEditing, setEditing] = useState(false);

  // TODO: order of these conditions need to be changed later
  return (
    <Card>
      {isEditing ? (
        <ProjectEditor
          id={id}
          project={project}
          members={members}
          onEditor={() => setEditing(false)}
          onPreview={() => setPreview(!isPreview)}
          isPreview={isPreview}
        />
      ) : (
        <>
          {isPreview ? (
            <Project
              id={id}
              project={project}
              members={members}
              onEditor={() => setEditing(true)}
              onPreview={() => setPreview(false)}
              isPreview={isPreview}
            />
          ) : (
            <ProjectLeadView
              id={id}
              project={project}
              members={members}
              onEditor={() => setEditing(true)}
              onPreview={() => setPreview(true)}
              isPreview={isPreview}
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
