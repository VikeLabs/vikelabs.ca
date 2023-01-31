import React, { useState } from "react";
import {
  Card,
  CardBody,
  Heading,
  Box,
  Text,
  Badge,
  Tag,
  Flex,
  Spacer,
  TagLabel,
  TagLeftIcon,
  Avatar,
  Link,
  Wrap,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Switch,
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuItem,
  useMenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";
import { MemberInfo, ProjectInfoLeadView } from "../types";
import { ProjectInfo } from "@prisma/client";
import ScrollContainer from "react-indiana-drag-scroll";
import Image from "next/image";
import { ImageInfo, LinkTag, TechTag } from "../types";
import ProjectSideButtons from "./ProjectSideButtons";
import { mockData } from "../utils/mockData";
import { Controller, useForm } from "react-hook-form";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TechTagCustomizer from "./TechTagCustomizer";
import DragAndDrop from "./DragAndDrop";
import LinkTagCustomizer from "./LinkTagCustomizer";
import { colorShade, hexToRgbA } from "../utils/colorHelpers";
import * as DOMPurify from "dompurify";
import FileUploader from "./FileUploader";
import SectionLabel from "./ProjectEditor/SectionLabel";
import Section from "./ProjectEditor/Section";
import { Edit } from "./ProjectEditor/Edit/_index";
import { View } from "./ProjectEditor/Preview/_index";
import PresetMenu, {
  CustomLinkTag,
  CustomTechTag,
  PresetLinkTags,
  PresetTechTags,
} from "./ProjectEditor/PresetMenu";

export type ProjectEditorForm = Omit<
  ProjectInfo,
  "id" | "updatedBy" | "updatedAt" | "approvedBy" | "approvedAt"
> & {
  members: MemberInfo[];
};

const ProjectEditor = ({
  id,
  project,
  members,
  onEditor,
  onPreview,
  isPreview = false,
}: {
  id: number;
  project: ProjectInfoLeadView;
  members: MemberInfo[];
  onEditor?: () => void;
  onPreview?: () => void;
  isPreview?: boolean;
}) => {
  // TODO: When modified, disable the editor button. previewer now uses the edited project values
  // TODO: If the user edits, it should replace the current draft if it hasnt been approved
  // const [projectInfo, setProjectInfo] = useState(project);
  const { formState, control, getValues, setValue } = useForm<ProjectEditorForm>({
    defaultValues: {
      title: project.title,
      description: project.description,
      links: project.links as LinkTag[],
      stack: project.stack as TechTag[], // this should be an array
      // stack: project.stack,
      imageUrls: project.imageUrls as ImageInfo[],
      recruiting: project.recruiting,
      recruitingFor: project.recruitingFor,
      members,
    },
  });

  const onSubmit = (data: ProjectEditorForm) => {
    const descriptionHtml = editor.getHTML();
    console.log(descriptionHtml);
    console.log("Form submitted: ", data);
    // editUserMutation.mutate(data, {
    //   onSuccess: (response) => {
    //     if (response.ok) {
    //       console.log("editUserMutation succeeded!");
    //       setIsEditing(false);
    //     } else {
    //       console.log("editUserMutation failed!");
    //       if (response.status === 401) {
    //         dispatch({ type: "logout" });
    //       }
    //     }
    //   },
    // });
  };

  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "py-2.5 px-4 rounded-md mr-4 border",
      },
    },
    content: formState.defaultValues.description,
  });

  // react-dnd
  const reorder = (list: TechTag[] | LinkTag[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (type: "stack" | "links", result: any) => {
    const items = getValues()?.[type];
    if (!result.destination) {
      return;
    }
    switch (type) {
      case "stack":
        setValue(
          "stack",
          reorder(items as TechTag[], result.source.index, result.destination.index)
        );
        break;
      case "links":
        setValue(
          "links",
          reorder(items as LinkTag[], result.source.index, result.destination.index)
        );
        break;
    }
  };

  const removeTag = (type: "stack" | "links", index: number) => {
    const items = getValues()?.[type];
    switch (type) {
      case "stack":
        (items as TechTag[]).splice(index, 1);
        setValue("stack", items);
        setTechSearch("");
        break;
      case "links":
        (items as LinkTag[]).splice(index, 1);
        setValue("links", items);
        setLinkSearch("");
        break;
    }
  };

  const addTag = (type: "stack" | "links", itemToAdd: TechTag | LinkTag) => {
    const items = getValues()?.[type];
    switch (type) {
      case "stack":
        console.log(items);
        (items as TechTag[]).push(itemToAdd as TechTag);
        setValue("stack", items);
        setTechSearch("");
        break;
      case "links":
        (items as LinkTag[]).push(itemToAdd as LinkTag);
        setValue("links", items);
        setLinkSearch("");
        break;
    }
    console.log(getValues()?.[type]);
  };

  const [techSearch, setTechSearch] = useState("");
  const [linkSearch, setLinkSearch] = useState("");
  const [linkColor, setLinkColor] = useState("blackAlpha");

  const {
    isOpen: isTechCustomizerOpen,
    onOpen: onTechCustomizerOpen,
    onClose: onTechCustomizerClose,
  } = useDisclosure();
  const techCustomizerRef = React.useRef(null);

  const {
    isOpen: isLinkCustomizerOpen,
    onOpen: onLinkCustomizerOpen,
    onClose: onLinkCustomizerClose,
  } = useDisclosure();
  const linkCustomizerRef = React.useRef(null);

  return (
    <CardBody>
      <Flex>
        <Box width="100%">
          <Wrap align="center" m="-1" p="1" mr="4" spacing="2">
            <Section
              label="Title"
              isPreview={isPreview}
              error={[!!formState.errors.title, "Title is required"]}
              noPt
              noHeading
            >
              <Controller
                control={control}
                name="title"
                render={({ field: { onChange, value } }) =>
                  isPreview ? (
                    <View.Title value={value} />
                  ) : (
                    <Edit.Title value={value} onChange={onChange} />
                  )
                }
              />
            </Section>

            <Section
              label="Recruiting"
              isPreview={isPreview}
              error={[!!formState.errors.recruiting, "Recruiting is required"]}
              noPt
              noHeading
            >
              <Controller
                control={control}
                name="recruiting"
                render={({ field: { onChange, value } }) =>
                  isPreview ? (
                    <View.Recruiting value={value} />
                  ) : (
                    <Edit.Recruiting value={value} onChange={onChange} />
                  )
                }
              />
            </Section>
          </Wrap>

          <Section
            label="Recruiting For"
            isPreview={isPreview}
            error={[!!formState.errors.recruiting, "Recruiting For is required"]}
            noPt
            noHeading
          >
            <Controller
              control={control}
              name="recruitingFor"
              render={({ field: {} }) =>
                isPreview ? <View.RecruitingFor /> : <Edit.RecruitingFor />
              }
            />
          </Section>

          <Section
            label="Description"
            isPreview={isPreview}
            error={[!!formState.errors.description, "Description is required"]}
          >
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) =>
                isPreview ? (
                  <View.Description value={value} />
                ) : (
                  <Edit.Description editor={editor} value={value} onChange={onChange} />
                )
              }
            />
          </Section>

          <Section
            label="Stack"
            isPreview={isPreview}
            error={[!!formState.errors.description, "Stack is required"]}
          >
            <Controller
              control={control}
              name="stack"
              render={({ field: { value } }) =>
                isPreview ? (
                  <View.Stack value={value ? (value as TechTag[]) : []} />
                ) : (
                  <Edit.Stack
                    value={value as TechTag[]}
                    getValues={getValues}
                    setStack={(items: TechTag[]) => setValue("stack", items)}
                  />
                )
              }
            />
          </Section>

          <Section
            label="Links"
            isPreview={isPreview}
            error={[!!formState.errors.description, "Stack is required"]}
          >
            <Controller
              control={control}
              name="links"
              render={({ field: { value } }) =>
                isPreview ? (
                  <View.Links value={!!(value as LinkTag[]).length ? (value as LinkTag[]) : []} />
                ) : (
                  <Edit.Links
                    value={value as LinkTag[]}
                    getValues={getValues}
                    setLinks={(items: LinkTag[]) => setValue("links", items)}
                  />
                )
              }
            />
          </Section>
        </Box>
        <Spacer />
        <ProjectSideButtons
          id={id}
          project={project}
          members={members}
          onEditor={onEditor}
          onPreview={onPreview}
          isEditing
          isPreview={isPreview}
        />
      </Flex>

      <Section
        label="Images"
        isPreview={isPreview}
        error={[!!formState.errors.imageUrls, "Images are required"]}
        noPt
      >
        <Controller
          control={control}
          name="imageUrls"
          render={({ field: { value } }) =>
            isPreview ? (
              <View.Images value={value ? (value as ImageInfo[]) : []} />
            ) : (
              <Edit.Images />
            )
          }
        />
      </Section>

      <Section
        label="Project Members"
        isPreview={isPreview}
        error={[!!formState.errors.members, "Project Members are required"]}
        noPt
      >
        <Controller
          control={control}
          name="members"
          render={({ field: { value } }) =>
            isPreview ? (
              <View.Members value={value ? (value as MemberInfo[]) : []} />
            ) : (
              <Edit.Members />
            )
          }
        />
      </Section>
    </CardBody>
  );
};

export default ProjectEditor;
