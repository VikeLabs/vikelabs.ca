import React from "react";
import { CardBody, Box, Flex, Spacer, Wrap } from "@chakra-ui/react";
import { MemberInfo, ProjectInfoLeadView } from "../types";
import { ProjectInfo } from "@prisma/client";
import { ImageInfo, LinkTag, TechTag } from "../types";
import ProjectSideButtons from "./ProjectSideButtons";
import { Controller, useForm } from "react-hook-form";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Edit } from "./ProjectEditor/Edit/_index";
import { View } from "./ProjectEditor/Preview/_index";
import Section from "./ProjectEditor/Section";

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
  const { formState, control, watch, getValues, setValue } = useForm<ProjectEditorForm>({
    defaultValues: {
      title: project.title,
      recruiting: project.recruiting,
      recruitingFor: project.recruitingFor as string[],
      description: project.description,
      stack: project.stack as TechTag[],
      links: project.links as LinkTag[],
      imageUrls: project.imageUrls as ImageInfo[],
      members,
    },
  });
  const watchRecruiting = watch("recruiting");
  const watchStack = watch("stack");
  const watchLinks = watch("links");
  const watchImages = watch("imageUrls");
  const watchMembers = watch("members");

  const onSubmit = (data: ProjectEditorForm) => {
    const descriptionHtml = editor.getHTML();
    console.log(descriptionHtml);
    console.log("Form submitted: ", data);

    // TODO: Find files in project.imageUrls that are not in data.imageUrls, and delete from Supabase storage
    // TODO: Find files in data.imageUrls that are not in project.imageUrls, and upload to Supabase storage

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

  return (
    <CardBody>
      <Flex>
        <Box width="100%" mr="5">
          <Wrap align="center" m="-1" p="1" spacing="2">
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
                rules={{ required: true }}
                render={({ field: { onChange, value } }) =>
                  isPreview ? (
                    <View.Title value={value} />
                  ) : (
                    <Edit.Title value={value} onChange={onChange} />
                  )
                }
              />
            </Section>
            <Section label="Recruiting?" isPreview={isPreview} noPt noHeading>
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
            label="Open Positions"
            isPreview={isPreview}
            error={[
              !!formState.errors.recruitingFor,
              "This is required since you set your 'Recruiting?' switch to on.",
            ]}
            noHeading
            hidden={!watchRecruiting}
          >
            <Controller
              control={control}
              name="recruitingFor"
              rules={{
                validate: {
                  requiredWhenRecruiting: (value) =>
                    !getValues().recruiting ||
                    (getValues().recruiting && (value as string[]).length > 0),
                },
              }}
              render={({ field: { value } }) =>
                watchRecruiting &&
                (isPreview ? (
                  <View.RecruitingFor value={value ? (value as string[]) : []} />
                ) : (
                  <Edit.RecruitingFor
                    value={value as string[]}
                    getValues={getValues}
                    setPositions={(items: string[]) => setValue("recruitingFor", items)}
                  />
                ))
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
              rules={{ required: true }}
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
            disabled={(watchStack ? (watchStack as TechTag[]) : []).length === 0}
            noPb={(watchStack ? (watchStack as TechTag[]) : []).length === 0}
          >
            <Controller
              control={control}
              name="stack"
              render={({ field: { value } }) =>
                isPreview ? (
                  <View.Stack value={value ? (value as TechTag[]) : []} />
                ) : (
                  <Edit.Stack
                    value={value ? (value as TechTag[]) : []}
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
            disabled={(watchLinks ? (watchLinks as LinkTag[]) : []).length === 0}
            noPb={(watchLinks ? (watchLinks as LinkTag[]) : []).length === 0}
          >
            <Controller
              control={control}
              name="links"
              render={({ field: { value } }) =>
                isPreview ? (
                  <View.Links value={value ? (value as LinkTag[]) : []} />
                ) : (
                  <Edit.Links
                    value={value ? (value as LinkTag[]) : []}
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
        disabled={(watchImages ? (watchImages as ImageInfo[]) : []).length === 0}
      >
        <Controller
          control={control}
          name="imageUrls"
          render={({ field: { value } }) =>
            isPreview ? (
              <View.Images value={value ? (value as ImageInfo[]) : []} />
            ) : (
              <Edit.Images
                value={value ? (value as ImageInfo[]) : []}
                getValues={getValues}
                setImages={(items: ImageInfo[]) => setValue("imageUrls", items)}
              />
            )
          }
        />
      </Section>
      <Section
        label="Project Members"
        isPreview={isPreview}
        error={[!!formState.errors.members, "Project Members are required"]}
        disabled={(watchMembers ? (watchMembers as MemberInfo[]) : []).length === 0}
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
