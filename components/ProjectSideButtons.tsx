import {
  CloseIcon,
  EditIcon,
  ExternalLinkIcon,
  InfoOutlineIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
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
import { MemberInfo, ProjectInfoLeadView } from "../types";

const ProjectSideButtons = ({
  id,
  project,
  members,
  onEditor,
  preview,
  onPreview,
  isPreview = false,
  isEditing = false,
}: {
  id: number;
  project: ProjectInfoLeadView;
  members: MemberInfo[];
  onEditor?: () => void;
  preview: boolean;
  onPreview?: () => void;
  isPreview?: boolean;
  isEditing?: boolean;
}) => {
  return (
    <Box>
      <VStack>
        {isEditing ? (
          <>
            <IconButton
              aria-label={`Edit ${project.title}`}
              colorScheme={isEditing ? "red" : "gray"}
              icon={isEditing ? <CloseIcon /> : <EditIcon />}
              onClick={() => {
                if (preview) onPreview();
                onEditor();
              }}
            />
            <IconButton
              aria-label={preview ? "Exit preview" : `View ${project.title}`}
              colorScheme={preview ? "teal" : "gray"}
              icon={preview ? <ViewOffIcon /> : <ViewIcon />}
              onClick={onPreview}
            />
          </>
        ) : (
          <>
            <IconButton
              aria-label={`Edit ${project.title}`}
              icon={<EditIcon />}
              onClick={onEditor}
            />
            <IconButton
              aria-label={`Visit project page for ${project.title}`}
              colorScheme="gray"
              icon={<ExternalLinkIcon />}
              onClick={() => console.log("TODO: Navigate to project page via the project id", id)}
            />
          </>
        )}

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
                {/* <Text fontSize="sm">Approved by: {project.approvedBy}</Text> */}
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
