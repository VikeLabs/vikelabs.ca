import { Card, CardBody } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { ProjectLiveView } from "../types";

const ProjectPreview = ({ project }: { project: ProjectLiveView }) => {
  return (
    <Card>
      {/* <div>Project ID: {project.id}</div>
      <div>Project order: {project.order}</div> */}
      <Image
        height={0}
        width={0}
        style={{ width: "auto", height: "400px" }}
        alt={project.projectInfo.imageUrls[0]}
        src={`https://mvhzkbtvqchhjmqkqokr.supabase.co/storage/v1/object/public/projects/${
          project.id
        }/live/${project.projectInfo.imageUrls[0] as string}`}
      />
      <CardBody>
        <div>{project.projectInfo.title}</div>
        <div>{project.projectInfo.description}</div>
      </CardBody>
    </Card>
  );
};

export default ProjectPreview;
