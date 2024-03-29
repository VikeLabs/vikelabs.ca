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
  hasDraft = false,
  isDraft = false,
}: {
  id: number;
  project: ProjectInfoLeadView;
  hasDraft?: boolean;
  isDraft?: boolean;
}) => {
  const [isPreview, setPreview] = useState(false);
  const [isEditing, setEditing] = useState(false);

  // TODO: order of these conditions need to be changed later
  return (
    <Card>
      {isEditing && !hasDraft ? (
        <ProjectEditor
          id={id}
          project={project}
          members={project.members as MemberInfo[]}
          onEditor={() => {
            setEditing(false);
            setPreview(false);
          }}
          onPreview={() => setPreview(!isPreview)}
          isPreview={isPreview}
          isDraft={isDraft}
        />
      ) : (
        <ProjectLeadView
          id={id}
          project={project}
          members={project.members as MemberInfo[]}
          onEditor={() => setEditing(true)}
          onPreview={() => setPreview(true)}
          isPreview={isPreview}
          hasDraft={hasDraft}
          isDraft={isDraft}
        />
      )}
    </Card>
  );
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
        <Card>
          <CardHeader>
            <Heading size="md">Projects</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              {live && (
                <Box>
                  <ProjectHeader heading="Live Info" text="This info is public on the website" />
                  <ProjectCard id={project.data?.id} project={live} hasDraft={!!draft} />
                </Box>
              )}
              {draft && (
                <Box>
                  <ProjectHeader
                    heading="Draft Info"
                    text="This info is pending approval from the admins, any edits you make will overwrite the previous draft."
                  />
                  <ProjectCard id={project.data?.id} project={draft} isDraft />
                </Box>
              )}
            </Stack>
          </CardBody>
        </Card>
      )}
      {project.isError && !project.data && (
        <div>Error loading project info for user id: {user?.id}</div>
      )}
    </DashboardWrapper>
  );
};

export default Lead;
