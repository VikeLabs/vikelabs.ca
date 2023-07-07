import { Button, Card } from "@chakra-ui/react";
import { Project, ProjectInfo } from "@prisma/client";
import React from "react";
import { useAuthContext } from "../../../components/AuthContextProvider";
import DashboardWrapper from "../../../components/DashboardWrapper";
import Loading from "../../../components/Loading";
import ProjectAdminView from "../../../components/ProjectAdminView";
import { useProjectDrafts } from "../../../hooks/useProjectDrafts";
import { useProjectMasterRecord } from "../../../hooks/useProjectMasterRecord";

const ProjectAdminCard = ({
  masterRecord,
  project,
}: {
  masterRecord: Project;
  project: ProjectInfo;
}) => {
  return (
    <Card>
      <ProjectAdminView masterRecord={masterRecord} project={project} />
    </Card>
  );
};

const Admin = () => {
  const { user } = useAuthContext();
  const projects = useProjectDrafts(user?.token);
  const projectMasterRecord = useProjectMasterRecord(user?.token);

  return (
    <DashboardWrapper title="Admin">
      {(projects.isLoading || projectMasterRecord.isLoading) && <Loading />}
      {projects.data && projectMasterRecord.data && (
        <div>
          <div>Projects requesting approval</div>
          {projects.data.map((project: ProjectInfo) => {
            const masterRecord = projectMasterRecord.data.find((p) => p.draftId === project.id);
            return (
              <div key={project.id}>
                <ProjectAdminCard masterRecord={masterRecord} project={project} />
              </div>
            );
          })}
          <div>Project page display order</div>
          {projectMasterRecord.data
            .sort((a, b) => (a.order > b.order ? 1 : -1))
            .map((project: Project) => {
              return <div key={project.id}>{project.order}</div>;
            })}
          <Button colorScheme="teal">Submit order sort</Button>
        </div>
      )}
      <div>Manage banners (temporary sections on home page)</div>
    </DashboardWrapper>
  );
};

export default Admin;
