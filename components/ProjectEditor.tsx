import React, { useCallback, useState } from "react";
import { useAuthContext } from "../components/AuthContextProvider";
import DashboardWrapper from "../components/DashboardWrapper";
import Loading from "../components/Loading";
import { useProjectEditView } from "../hooks/useProjectEditView";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Box,
  StackDivider,
  Text,
  Badge,
  HStack,
  Tag,
  Flex,
  Spacer,
  TagLabel,
  TagRightIcon,
  TagLeftIcon,
  AvatarGroup,
  Avatar,
  IconButton,
  VStack,
  Portal,
  Link,
  Wrap,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Switch,
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuItem,
  useMenuItem,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Modal,
  Center,
} from "@chakra-ui/react";
import {
  AddIcon,
  ChevronDownIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  InfoOutlineIcon,
  LinkIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { GetProjectEditViewResponse, MemberInfo } from "../types";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { ProjectInfo } from "@prisma/client";
import ScrollContainer from "react-indiana-drag-scroll";
import Image from "next/image";
import { ImageInfo, LinkTag, TechTag } from "../types";
import ProjectSideButtons from "./ProjectSideButtons";
import { mockData } from "../utils/mockData";
import { Controller, useForm } from "react-hook-form";
import { EditorContent, Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import HardBreak from "@tiptap/extension-hard-break";
import { Icon } from "@chakra-ui/react";
import { HexColorPicker } from "react-colorful";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TechTagCustomizer from "./TechTagCustomizer";
import DragAndDrop from "./DragAndDrop";
import LinkTagCustomizer from "./LinkTagCustomizer";
import { colorShade, hexToRgbA } from "../utils/colorHelpers";

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
  // TODO: When modified, disable the editor button. previewer now uses the edited project values
  // TODO: If the user edits, it should replace the current draft if it hasnt been approved
  // const [projectInfo, setProjectInfo] = useState(project);
  const { formState, handleSubmit, control, reset, getValues, setValue } =
    useForm<ProjectEditorForm>({
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
  };

  const updateTag = (type: "stack" | "links", itemToUpdate: TechTag | LinkTag, index: number) => {
    const items = getValues()?.[type];
    switch (type) {
      case "stack":
        (items as TechTag[])[index] = itemToUpdate as TechTag;
        setValue("stack", items);
        break;
      case "links":
        (items as LinkTag[])[index] = itemToUpdate as LinkTag;
        setValue("links", items);
        break;
    }
  };

  const [techSearch, setTechSearch] = useState("");
  const [linkSearch, setLinkSearch] = useState("");

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
            <FormControl isInvalid={!!formState.errors.title} width="auto" alignItems="flex-start">
              {!preview && <FormLabel>Title</FormLabel>}
              <Controller
                control={control}
                name="title"
                render={({ field: { onChange, value } }) =>
                  preview ? (
                    <Heading>{value}</Heading>
                  ) : (
                    <Input type="title" value={value} onChange={onChange} minWidth={300} />
                  )
                }
              />
              {!formState.errors.title && <FormErrorMessage>Title is required.</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!formState.errors.title} width="auto">
              {!preview && <FormLabel ml="2">Recruiting</FormLabel>}
              <Controller
                control={control}
                name="recruiting"
                render={({ field: { onChange, value } }) => {
                  if (preview && value) {
                    return (
                      <Badge colorScheme="cyan" display="block">
                        recruiting
                      </Badge>
                    );
                  } else if (!preview) {
                    return <Switch ml="2" size="lg" isChecked={value} onChange={onChange} />;
                  }
                }}
              />
            </FormControl>
          </Wrap>
          <Box pt="5">
            <FormControl isInvalid={!!formState.errors.title} width="auto">
              {preview ? <Heading pb="2">Description</Heading> : <FormLabel>Description</FormLabel>}
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) =>
                  preview ? (
                    <div dangerouslySetInnerHTML={{ __html: editor?.getHTML() }} />
                  ) : (
                    <EditorContent editor={editor} value={value} onChange={onChange} />
                  )
                }
              />
              {!formState.errors.description && (
                <FormErrorMessage>Description is required.</FormErrorMessage>
              )}
            </FormControl>
          </Box>

          <Box pt="5">
            <FormControl isInvalid={!!formState.errors.title} width="100%">
              {preview ? <Heading pb="2">Stack</Heading> : <FormLabel>Stack</FormLabel>}
              {!preview && (
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
                        label={!techSearch.length ? "Custom" : techSearch}
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
                  preview ? (
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
            </FormControl>
          </Box>

          <Box pt="5">
            <FormControl isInvalid={!!formState.errors.title} width="100%">
              {preview ? <Heading pb="2">Links</Heading> : <FormLabel>Links</FormLabel>}
              {!preview && (
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
                        label={!linkSearch.length ? "Custom" : linkSearch}
                        url="https://example.com"
                        finalRef={linkCustomizerRef}
                        isOpen={isLinkCustomizerOpen}
                        onSubmit={(item: LinkTag) => addTag("links", item)}
                        onUpdate={(item: LinkTag, index: number) => updateTag("links", item, index)}
                        onClose={onLinkCustomizerClose}
                      />
                      <Tag
                        size="sm"
                        variant="subtle"
                        borderRadius="sm"
                        bgColor={hexToRgbA("#999999", 0.3)}
                        cursor="pointer"
                      >
                        {!linkSearch.length ? "Custom" : linkSearch}
                      </Tag>
                    </MenuItem>

                    {/* Preset Link Tag */}
                    {mockData.presetLinks.map((linkPreset: LinkTag, index: number) => {
                      if (linkPreset.label.toLowerCase().includes(linkSearch.toLowerCase())) {
                        return (
                          <MenuItem key={index} onClick={() => addTag("links", linkPreset)}>
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
                  preview ? (
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
            </FormControl>
          </Box>

          {/* <Box pt="5">
            <Heading>Links</Heading>
            <Wrap pt="2">
              {mockData.links.map((links: LinkTag, index) => (
                <Link href={links.url} key={index} lineHeight={1} isExternal>
                  <Tag size="sm" variant="subtle" borderRadius="sm" colorScheme={links.color}>
                    <TagLeftIcon boxSize={2.5} as={LinkIcon} />
                    <TagLabel ml={-1}>{links.label}</TagLabel>
                  </Tag>
                </Link>
              ))}
            </Wrap>
          </Box> */}
        </Box>
        <Spacer />
        {isPreview && (
          <ProjectSideButtons
            id={id}
            project={project}
            members={members}
            onEditor={onEditor}
            preview={preview}
            onPreview={onPreview}
            isPreview
          />
        )}
      </Flex>

      <Box pt="5">
        <Heading>Images</Heading>
        <div>
          <ScrollContainer className="list mt-4 mb-1 flex overflow-auto" hideScrollbars={false}>
            {mockData.images.map((image: ImageInfo, index: number) => (
              <div
                key={index}
                className="mr-2 flex-shrink-0 overflow-hidden rounded bg-placeholder-light dark:bg-placeholder-dark"
              >
                <Image loading="eager" src={image.url} height={400} width={400} alt={image.aria} />
              </div>
            ))}
          </ScrollContainer>
        </div>
      </Box>
      <Box pt="5">
        <Heading>Project Members</Heading>
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
      </Box>
    </CardBody>
  );
};

export default ProjectEditor;
