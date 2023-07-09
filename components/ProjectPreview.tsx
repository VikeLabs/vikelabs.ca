import { Card, CardBody, Image } from "@chakra-ui/react";
import React from "react";
import { config } from "../config/config";
import { ProjectLiveView } from "../types";

const ProjectPreview = ({ project }: { project: ProjectLiveView }) => {
  return (
    <Card>
      <Image
        height={0}
        width={0}
        objectFit="contain"
        style={{ width: "auto", height: "200px" }}
        alt={project.projectInfo.imageUrls[0]}
        src={`${config.buckets.projects}/${project.id}/live/${
          project.projectInfo.imageUrls[0] as string
        }`}
      />
      <CardBody>
        <div>{project.projectInfo.title}</div>
        <div>{project.projectInfo.description}</div>
      </CardBody>
    </Card>
  );
};

export default ProjectPreview;
