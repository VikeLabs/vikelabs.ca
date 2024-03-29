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
  Button,
  IconButton,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { ProjectInfoLeadView } from "../types";

const ProjectSideButtons = ({
  id,
  project,
  onEditor,
  onPreview,
  isEditing = false,
  isPreview = false,
  isDirty = false,
  hasDraft = false,
  isDraft = false,
}: {
  id: number;
  project: ProjectInfoLeadView;
  onEditor?: () => void;
  onPreview?: () => void;
  isEditing?: boolean;
  isPreview?: boolean;
  isDirty?: boolean;
  hasDraft?: boolean;
  isDraft?: boolean;
}) => {
  return (
    <Box>
      <VStack>
        {isEditing ? (
          <>
            {isDirty ? (
              <Popover placement="left-start">
                <PopoverTrigger>
                  <IconButton aria-label={"Exit editor"} colorScheme={"red"} icon={<CloseIcon />} />
                </PopoverTrigger>
                <Portal>
                  <PopoverContent>
                    <PopoverBody>
                      <Text pb="1">Your unsaved changes will be lost.</Text>
                      <Button colorScheme="red" onClick={() => onEditor()}>
                        Exit without saving
                      </Button>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>
            ) : (
              <Tooltip label="Exit editor" placement="left" bg="gray.200" color="currentColor">
                <IconButton
                  aria-label={"Exit editor"}
                  colorScheme={"red"}
                  icon={<CloseIcon />}
                  onClick={() => {
                    if (isPreview) onPreview();
                    onEditor();
                  }}
                />
              </Tooltip>
            )}
            <Tooltip
              label={isPreview ? "Hide preview" : "Show preview"}
              placement="left"
              bg="gray.200"
              color="currentColor"
            >
              <IconButton
                aria-label={isPreview ? "Exit preview" : `View ${project.title}`}
                colorScheme={isPreview ? "teal" : "gray"}
                icon={isPreview ? <ViewOffIcon /> : <ViewIcon />}
                onClick={onPreview}
              />
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip
              label={hasDraft ? "Cannot edit when draft exists" : "Edit project info"}
              placement="left"
              bg="gray.200"
              color="currentColor"
            >
              <IconButton
                aria-label={`Edit ${project.title}`}
                icon={<EditIcon />}
                onClick={onEditor}
                // isDisabled={hasDraft} // TODO: uncomment later
              />
            </Tooltip>
            <Tooltip
              label={isDraft ? "No project page available for drafts" : "Open project page"}
              placement="left"
              bg="gray.200"
              color="currentColor"
            >
              <IconButton
                aria-label={`Visit project page for ${project.title}`}
                colorScheme="gray"
                icon={<ExternalLinkIcon />}
                onClick={() => console.log("TODO: Navigate to project page via the project id", id)}
                isDisabled={isDraft}
              />
            </Tooltip>
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
