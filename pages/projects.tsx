import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import Loading from "../components/Loading";
import ProjectPreview from "../components/ProjectPreview";
import Wrapper from "../components/Wrapper";
import { useProjectLives } from "../hooks/useProjectLives";
import { ProjectLiveView } from "../types";

const Projects = () => {
  const projects = useProjectLives();
  console.log(projects);
  return (
    <Wrapper>
      <Box
        className="p-4 mx-auto md:w-8/12 fixed md:relative md:flex md:justify-between md:items-center md:text-center"
        display="block"
      >
        <div>
          Projects are the heart and soul of VikeLabs. Here you'll find the various projects our
          members are currently working on and previous projects we've taken on.
        </div>
        <div>
          <Text>Projects</Text>
          <div>{projects.isLoading && <Loading />}</div>
          <div>
            {projects.data &&
              projects.data.map((project: ProjectLiveView) => (
                <ProjectPreview project={project} key={project.id} />
              ))}
          </div>
        </div>
      </Box>
    </Wrapper>
  );
};

export default Projects;
