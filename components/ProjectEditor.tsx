import React, { useState } from "react";
import { CardBody, Box, Flex, Spacer, Wrap } from "@chakra-ui/react";
import { MemberInfo, ProjectEditorForm, ProjectInfoLeadView, ProjectUpdateData } from "../types";
import { ImageInfo, LinkTag, TechTag } from "../types";
import ProjectSideButtons from "./ProjectSideButtons";
import { Controller, useForm } from "react-hook-form";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Edit } from "./ProjectEditor/Edit/_index";
import { View } from "./ProjectEditor/Preview/_index";
import Section from "./ProjectEditor/Section";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import ApprovalNotice from "../components/ApprovalNotice";
import { deepDirtyChecker } from "../utils/needApproval";
import { useProjectUpdateMutation } from "../hooks/useProjectUpdateMutation";
import { useAuthContext } from "./AuthContextProvider";
import { Prisma } from "@prisma/client";
import { useImagePreviews } from "../hooks/useImagePreview";
import { config } from "../config/config";
import Processing from "./ProjectEditor/Processing";

const ProjectEditor = ({
  id,
  project,
  members,
  onEditor,
  onPreview,
  isPreview = false,
  isDraft,
}: {
  id: number;
  project: ProjectInfoLeadView;
  members: MemberInfo[];
  onEditor?: () => void;
  onPreview?: () => void;
  isPreview?: boolean;
  isDraft: boolean;
}) => {
  const { formState, control, handleSubmit, watch, getValues, setValue } =
    useForm<ProjectEditorForm>({
      defaultValues: {
        title: project.title,
        recruiting: project.recruiting,
        recruitingFor: project.recruitingFor,
        description: project.description,
        stack: project.stack,
        links: project.links,
        imageUrls: project.imageUrls,
        members,
      },
    });
  watch("recruitingFor"); // for form dirtying purposes
  const watchRecruiting = watch("recruiting");
  const watchStack = watch("stack");
  const watchLinks = watch("links");
  const watchImages = watch("imageUrls");
  const watchMembers = watch("members");
  const { user, dispatch } = useAuthContext();
  const [imagesToAddCount, setImagesToAddCount] = useState(0);
  const [imagesAddedCount, setImageAddingIndex] = useState(0);
  const projectUpdate = useProjectUpdateMutation(
    id,
    user?.token,
    setImagesToAddCount,
    setImageAddingIndex
  );
  const imagePreviews = useImagePreviews(watchImages as (string | File)[], id, isDraft);
  const editor = useEditor({
    extensions: [StarterKit, Underline, Subscript, Superscript],
    editorProps: {
      attributes: {
        class: "py-2.5 px-4 rounded-md mr-4 border desc",
      },
    },
    onUpdate: ({ editor }) => {
      setValue("description", editor.getHTML());
    },
    content: formState.defaultValues.description,
  });
  const isDirty =
    deepDirtyChecker(config.deepDirtyChecker.isDirty, formState, getValues).length > 0;
  const onSubmit = (data: ProjectEditorForm) => {
    const needApproval =
      deepDirtyChecker(config.deepDirtyChecker.needsApproval, formState, getValues).length > 0;
    const imageUrlsToDelete: string[] = [];
    const imageFilesToAdd: File[] = [];
    for (const image of data.imageUrls as (string | File)[]) {
      if (typeof image !== "string") {
        imageFilesToAdd.push(image);
      }
    }
    for (const imageUrl of formState.defaultValues.imageUrls as string[]) {
      if (!(data.imageUrls as (string | File)[]).includes(imageUrl)) {
        imageUrlsToDelete.push(imageUrl);
      }
    }
    const { imageUrls: imageData, ...rest } = data;
    const imageUrls = (imageData as ImageInfo[]).map((image: ImageInfo) =>
      typeof image === "string" ? image : image.name.toLowerCase().replaceAll(" ", "_")
    );
    const projectUpdateData: ProjectUpdateData = {
      id: project.id,
      isDraft,
      needApproval,
      defaultImages: project.imageUrls as string[],
      ...rest,
      imageUrls,
      imageFilesToAdd,
      imageUrlsToDelete,
    };
    projectUpdate.mutate(projectUpdateData, {
      onSuccess: (response) => {
        if (response.ok) {
          console.log("projectUpdate mutation succeeded!");
          onEditor();
        } else {
          console.log("projectUpdate mutation failed!");
          // TODO: toast error
          if (response.status === 401) {
            dispatch({ type: "logout" });
          }
        }
      },
    });
  };

  return (
    <CardBody>
      <Flex>
        <Box width="100%" mr="5">
          <Wrap align="center" m="-1" p="1" spacing="4">
            <Section
              label="Title"
              isPreview={isPreview}
              error={[!!formState.errors.title, config.formError.title]}
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
            error={[!!formState.errors.recruitingFor, config.formError.recruiting]}
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
            error={[!!formState.errors.description, config.formError.description]}
            noHeading
          >
            <Controller
              control={control}
              name="description"
              rules={{
                required: true,
                validate: {
                  descriptionNotEmpty: (value) => value !== "<p></p>",
                },
              }}
              render={() =>
                isPreview ? (
                  <View.Description value={editor.getHTML()} />
                ) : (
                  <Edit.Description editor={editor} />
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
          isDirty={isDirty}
        />
      </Flex>
      <Section
        label="Images"
        isPreview={isPreview}
        error={[!!formState.errors.imageUrls, config.formError.images]}
        disabled={(watchImages ? (watchImages as unknown as ImageInfo[]) : []).length === 0}
      >
        <Controller
          control={control}
          name="imageUrls"
          render={() =>
            isPreview ? (
              <View.Images value={imagePreviews.data ?? []} />
            ) : (
              <Edit.Images
                value={imagePreviews.data ?? []}
                getValues={getValues}
                setImages={(items: ImageInfo[]) => setValue("imageUrls", items as Prisma.JsonValue)}
              />
            )
          }
        />
      </Section>
      <Section
        label="Project Members"
        isPreview={isPreview}
        error={[!!formState.errors.members, config.formError.members]}
        disabled={(watchMembers ? (watchMembers as MemberInfo[]) : []).length === 0}
      >
        <Controller
          control={control}
          name="members"
          render={({ field: { value } }) =>
            isPreview ? (
              <View.Members value={value ? (value as MemberInfo[]) : []} />
            ) : (
              <Edit.Members
                value={value ? (value as MemberInfo[]) : []}
                getValues={getValues}
                setMembers={(items: MemberInfo[]) => setValue("members", items)}
              />
            )
          }
        />
      </Section>
      <Section
        label=""
        isPreview={isPreview}
        error={[Object.keys(formState.errors).length > 0, config.formError.submit]}
        disabled={(watchMembers ? (watchMembers as MemberInfo[]) : []).length === 0}
        noHeading
      >
        {projectUpdate.isLoading ? (
          <Processing imagesToAddCount={imagesToAddCount} imagesAddedCount={imagesAddedCount} />
        ) : (
          <ApprovalNotice
            isEditing={true}
            fieldNames={config.deepDirtyChecker.needsApproval}
            getValues={getValues}
            formState={formState}
            onSubmit={handleSubmit(onSubmit)}
          />
        )}
      </Section>
    </CardBody>
  );
};

export default ProjectEditor;
