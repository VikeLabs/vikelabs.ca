import { EditIcon, InfoOutlineIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ProjectInfo } from "@prisma/client";
import React from "react";
import { MemberInfo } from "../types";

const ProjectSideButtons = ({
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
  return (
    <Box>
      <VStack>
        <IconButton aria-label={`Edit ${project.title}`} icon={<EditIcon />} onClick={onEditor} />
        <IconButton
          aria-label={preview ? "Exit preview" : `View ${project.title}`}
          colorScheme={preview ? "teal" : "gray"}
          icon={preview ? <ViewOffIcon /> : <ViewIcon />}
          onClick={onPreview}
        />
        <Popover placement="left-end">
          <PopoverTrigger>
            <IconButton aria-label={`${project.title} Metadata`} icon={<InfoOutlineIcon />} />
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverCloseButton />
              <PopoverBody>
                <Text fontSize="sm">Project ID: {id}</Text>
                <Text fontSize="sm">Version ID: {project.id}</Text>
                <Text fontSize="sm">Order: TODO</Text>
                <Text fontSize="sm">Updated by: {project.updatedBy}</Text>
                <Text fontSize="sm">Updated at: TODO</Text>
                <Text fontSize="sm">Approved by: {project.approvedBy}</Text>
                <Text fontSize="sm">Approved at: TODO</Text>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </VStack>
    </Box>
  );
};

export default ProjectSideButtons;
