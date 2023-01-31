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
      imageUrls: project.imageUrls,
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

  const navigationKeys = ["ArrowUp", "ArrowDown", "Escape"];
  const MenuInput = (props) => {
    const { role, ...rest } = useMenuItem(props);
    return (
      <Box px="3" role={role}>
        <Input
          mb="2"
          placeholder="Enter technology"
          size="sm"
          {...rest}
          onKeyDown={(e) => {
            if (!navigationKeys.includes(e.key)) {
              e.stopPropagation();
            }
          }}
        />
      </Box>
    );
  };

  //
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
            {!isPreview && (
              <Menu placement="right-start">
                <MenuButton as={Button}>Add New</MenuButton>
                <MenuList>
                  <MenuInput
                    type="title"
                    onChange={(e) => setTechSearch(e.target.value)}
                    value={techSearch}
                  />

                  {/* Custom Tech Tag */}
                  <MenuItem onClick={onTechCustomizerOpen}>
                    <TechTagCustomizer
                      label={!techSearch.length ? "" : techSearch}
                      finalRef={techCustomizerRef}
                      isOpen={isTechCustomizerOpen}
                      onSubmit={(item: TechTag) => addTag("stack", item)}
                      onClose={onTechCustomizerClose}
                    />
                    <Tag
                      size="sm"
                      variant="solid"
                      borderRadius="sm"
                      bgColor="#333"
                      cursor="pointer"
                    >
                      {!techSearch.length ? "Custom" : techSearch}
                    </Tag>
                  </MenuItem>

                  {/* Preset Tech Tag */}
                  {mockData.presetStack.map((techPreset: TechTag, index: number) => {
                    if (techPreset.label.toLowerCase().includes(techSearch.toLowerCase())) {
                      return (
                        <MenuItem key={index} onClick={() => addTag("stack", techPreset)}>
                          <Tag
                            size="sm"
                            variant="solid"
                            borderRadius="sm"
                            colorScheme={techPreset.color}
                            cursor="pointer"
                          >
                            {techPreset.label}
                          </Tag>
                        </MenuItem>
                      );
                    }
                  })}
                </MenuList>
              </Menu>
            )}
            <Controller
              control={control}
              name="stack"
              render={({ field: { value } }) =>
                isPreview ? (
                  <Wrap pt="2">
                    {(value ? (value as TechTag[]) : []).map((tech: TechTag, index) => (
                      <Tag
                        key={index}
                        size="sm"
                        variant="solid"
                        borderRadius="sm"
                        colorScheme={tech.color.includes("#") ? undefined : tech.color}
                        bgColor={tech.color.includes("#") ? tech.color : undefined}
                      >
                        {tech.label}
                      </Tag>
                    ))}
                  </Wrap>
                ) : (
                  <DragAndDrop
                    pt={3}
                    direction="horizontal"
                    type="stack"
                    items={value as TechTag[]}
                    onDragEnd={(result: any) => onDragEnd("stack", result)}
                    onRemoveItem={(index: number) => removeTag("stack", index)}
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
            {!isPreview && (
              <Menu placement="right-start">
                <MenuButton as={Button}>Add New</MenuButton>
                <MenuList>
                  <MenuInput
                    type="title"
                    onChange={(e) => setLinkSearch(e.target.value)}
                    value={linkSearch}
                  />

                  {/* Custom Link Tag */}
                  <MenuItem onClick={onLinkCustomizerOpen}>
                    <LinkTagCustomizer
                      label={!linkSearch.length ? "" : linkSearch}
                      colorScheme={linkColor}
                      url=""
                      finalRef={linkCustomizerRef}
                      isOpen={isLinkCustomizerOpen}
                      onSubmit={(item: LinkTag) => {
                        addTag("links", item);
                        setLinkColor("blackAlpha");
                      }}
                      onClose={() => {
                        onLinkCustomizerClose();
                        setLinkColor("blackAlpha");
                      }}
                    />
                    <Tag
                      size="sm"
                      variant="subtle"
                      borderRadius="sm"
                      colorScheme={linkColor}
                      cursor="pointer"
                    >
                      {!linkSearch.length ? "Custom" : linkSearch}
                    </Tag>
                  </MenuItem>

                  {/* Preset Link Tag */}
                  {mockData.presetLinks.map((linkPreset: LinkTag, index: number) => {
                    if (linkPreset.label.toLowerCase().includes(linkSearch.toLowerCase())) {
                      return (
                        <MenuItem
                          key={index}
                          onClick={() => {
                            setLinkSearch(linkPreset.label);
                            setLinkColor(linkPreset.color);
                            onLinkCustomizerOpen();
                            // addTag("links", linkPreset);
                          }}
                        >
                          <Tag
                            size="sm"
                            variant="subtle"
                            borderRadius="sm"
                            colorScheme={linkPreset.color}
                            cursor="pointer"
                          >
                            {linkPreset.label}
                          </Tag>
                        </MenuItem>
                      );
                    }
                  })}
                </MenuList>
              </Menu>
            )}
            <Controller
              control={control}
              name="links"
              render={({ field: { value } }) =>
                isPreview ? (
                  <Wrap pt="2">
                    {/* THIS IS NOT AN ARRAY??? */}
                    {(!!(value as LinkTag[]).length ? (value as LinkTag[]) : []).map(
                      (link: LinkTag, index) => (
                        <Link href={link.url} key={index} lineHeight={1} isExternal>
                          <Tag
                            key={index}
                            size="sm"
                            variant="subtle"
                            borderRadius="sm"
                            colorScheme={link.color.includes("#") ? undefined : link.color}
                            bgColor={
                              link.color.includes("#") ? hexToRgbA(link.color, 0.3) : undefined
                            }
                            textColor={
                              link.color.includes("#") ? colorShade(link.color, -100) : undefined
                            }
                          >
                            <TagLeftIcon boxSize={2.5} as={LinkIcon} />
                            <TagLabel ml={-1}>{link.label}</TagLabel>
                          </Tag>
                        </Link>
                      )
                    )}
                  </Wrap>
                ) : (
                  <DragAndDrop
                    pt={3}
                    direction="horizontal"
                    type="links"
                    items={value as LinkTag[]}
                    onDragEnd={(result: any) => onDragEnd("links", result)}
                    onRemoveItem={(index: number) => removeTag("links", index)}
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
        {!isPreview ? (
          <div>
            <Button onClick={() => console.log("should open FileCustomizerModal")}>Add New</Button>
            <FileUploader />
            <div>TODO: Image reorder/previewer</div>
          </div>
        ) : (
          <div>
            <ScrollContainer className="list mt-4 mb-1 flex overflow-auto" hideScrollbars={false}>
              {mockData.images.map((image: ImageInfo, index: number) => (
                <div
                  key={index}
                  className="mr-2 flex-shrink-0 overflow-hidden rounded bg-placeholder-light dark:bg-placeholder-dark"
                >
                  {/* Should set height to 400 and calculate width based off height of image */}
                  <Image
                    loading="eager"
                    src={image.url}
                    height={400}
                    width={400}
                    alt={image.aria}
                  />
                </div>
              ))}
            </ScrollContainer>
          </div>
        )}
      </Section>

      <Section
        label="Project Members"
        isPreview={isPreview}
        error={[!!formState.errors.members, "Project Members are required"]}
        noPt
      >
        {!isPreview ? (
          <div>TODO</div>
        ) : (
          <SimpleGrid pt="2" spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
            {}
            {members.map((member: MemberInfo) => (
              // TODO: members does not have users where isCredited is false
              // TODO: Need to change backend to return info to the lead about members
              // TODO: We only need the isCredited for public project view endpoint
              <Card size="sm" key={member.id}>
                <CardBody>
                  <Flex>
                    <Avatar src={member.imageUrl} name={member.displayName ?? member.username} />
                    <Box ml="3">
                      <Text fontWeight="bold">{member.displayName ?? member.username}</Text>
                      <Text fontSize="sm">Member</Text>
                    </Box>
                  </Flex>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </Section>
    </CardBody>
  );
};

export default ProjectEditor;
