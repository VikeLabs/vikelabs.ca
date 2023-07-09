import React, { useState } from "react";
import { CardBody, Heading, Box, Text, Badge, Flex, Spacer, Wrap, Input } from "@chakra-ui/react";
import { AdminReviewRequest, LinkTag, MemberInfo, ProjectInfoLeadView, TechTag } from "../types";
import { format } from "date-fns";

import { InfoOutlineIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { View } from "./ProjectEditor/Preview/_index";
import Section from "./ProjectEditor/Section";
import { Project } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";
import { useProjectModerateMutation } from "../hooks/useProjectModerateMutation";
import { useAuthContext } from "./AuthContextProvider";
import { config } from "../config/config";

const ProjectSideButtons = ({
  project,
  onPreview,
  isPreview = false,
}: {
  project: ProjectInfoLeadView;
  onPreview?: () => void;
  isPreview?: boolean;
}) => {
  return (
    <Box>
      <VStack>
        <>
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
        <Popover placement="left-end">
          <PopoverTrigger>
            <IconButton aria-label={`${project.title} Metadata`} icon={<InfoOutlineIcon />} />
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverCloseButton />
              <PopoverBody>
                {/* <Text fontSize="sm">Project ID: {id}</Text> */}
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

const ProjectAdminView = ({
  masterRecord,
  project,
}: {
  masterRecord: Project;
  project: ProjectInfoLeadView;
}) => {
  // Get Project (the master record, not specific ProjectInfo)
  const [isPreview, setIsPreview] = useState(false);
  const onPreview = () => {
    setIsPreview(!isPreview);
  };
  const { control, handleSubmit } = useForm<{
    feedback: string;
  }>({
    defaultValues: {
      feedback: "",
    },
  });
  const { user } = useAuthContext();
  const projectModerateMutation = useProjectModerateMutation(user?.token);

  const onApprove = (data: { feedback: string }) => {
    const payload: AdminReviewRequest = {
      feedback: data.feedback.length ? data.feedback : undefined,
      approved: true,
      projectId: masterRecord.id,
      draftId: project.id,
    };
    projectModerateMutation.mutate(payload, {
      onSuccess: (response) => {
        if (response.ok) {
          console.log("projectUpdateMutation (approve) succeeded!");
          setIsPreview(false);
        } else {
          console.log("projectUpdateMutation (approve) failed!");
        }
      },
    });
  };
  const onReject = (data: { feedback: string }) => {
    const payload: AdminReviewRequest = {
      feedback: data.feedback.length ? data.feedback : undefined,
      approved: false,
      projectId: masterRecord.id,
      draftId: project.id,
    };
    projectModerateMutation.mutate(payload, {
      onSuccess: (response) => {
        if (response.ok) {
          console.log("projectUpdateMutation (reject) succeeded!");
          setIsPreview(false);
        } else {
          console.log("projectUpdateMutation (reject) failed!");
        }
      },
    });
  };

  return (
    <>
      {isPreview ? (
        <CardBody>
          <Flex>
            <Box width="100%" mr="5">
              <Wrap align="center" m="-1" p="1" spacing="4">
                <Section label="Title" noPt isPreview noHeading>
                  <View.Title value={project.title} />
                </Section>
                <View.Recruiting value={project.recruiting} />
              </Wrap>

              <Section
                label={`Open Positions${!project.recruiting && " (Disabled)"}`}
                isPreview
                noHeading
              >
                <View.RecruitingFor
                  value={project.recruitingFor ? (project.recruitingFor as string[]) : []}
                />
              </Section>
              <Section label="Description" isPreview noHeading>
                <View.Description value={project.description} />
              </Section>
              <Section
                label="Stack"
                noPb={(project.stack ? (project.stack as TechTag[]) : []).length === 0}
                isPreview
              >
                <View.Stack value={project.stack ? (project.stack as TechTag[]) : []} />
              </Section>
              <Section
                label="Links"
                noPb={(project.links ? (project.links as LinkTag[]) : []).length === 0}
                isPreview
              >
                <View.Links value={project.links ? (project.links as LinkTag[]) : []} />
              </Section>
            </Box>
            <Spacer />
            <ProjectSideButtons project={project} onPreview={onPreview} isPreview={isPreview} />
          </Flex>
          <Section label="Images" disabled={(project.imageUrls as string[]).length === 0} isPreview>
            <View.Images
              value={(project.imageUrls as string[]).map((imageUrl: string) => ({
                // TODO: Put this long url somewhere else
                url: `${config.buckets.projects}/${masterRecord.id}/draft/${imageUrl}`,
              }))}
            />
          </Section>
          <Section label="Project Members" isPreview>
            <View.Members
              value={project.members ? (project.members as MemberInfo[]) : []}
              isReview
            />
          </Section>
          <Section label="Admin Panel" isPreview>
            <Text>Submitted: {format(new Date(project.updatedAt), "MMM Io, yyyy, h:mmaaa")}</Text>
            <Text noOfLines={1}>Description of changes: {project.memo}</Text>
            <Controller
              control={control}
              name="feedback"
              render={({ field: { value, onChange } }) => (
                <>
                  <Input
                    value={value}
                    placeholder="Give feedback (mandatory for reject)"
                    onChange={onChange}
                  />
                  <Button
                    colorScheme="red"
                    onClick={handleSubmit(onReject)}
                    isDisabled={value?.length === 0}
                  >
                    Reject
                  </Button>
                  <Button colorScheme="green" onClick={handleSubmit(onApprove)}>
                    Approve
                  </Button>
                </>
              )}
            />
          </Section>
        </CardBody>
      ) : (
        <CardBody>
          <Flex>
            <Box pr="2">
              <Wrap align="center">
                <Heading size="xs">{project.title}</Heading>
                {project.recruiting && <Badge colorScheme="cyan">recruiting</Badge>}
              </Wrap>
              <Text>Submitted: {format(new Date(project.updatedAt), "MMM Io, yyyy, h:mmaaa")}</Text>
              <Text noOfLines={1}>Description of changes: {project.memo}</Text>
            </Box>
            <Spacer />
            <ProjectSideButtons project={project} onPreview={onPreview} isPreview={isPreview} />
          </Flex>
        </CardBody>
      )}
    </>
  );
};

export default ProjectAdminView;
