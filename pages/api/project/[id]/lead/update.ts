import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Project, ProjectInfo } from "@prisma/client";
import {
  ErrorMessage,
  GetProjectEditViewResponse,
  ImageToAdd,
  ImageToDelete,
  MemberInfo,
  ProjectEditorForm,
  ProjectUpdateData,
  ProjectUpdateDataNoImages,
} from "../../../../../types";
import { supabase } from "../../../../../supabase-client";
import { deepDirtyChecker, deepDirtyCheckerServerside } from "../../../../../utils/needApproval";

const prisma = new PrismaClient();
const usage = "POST /api/project/[id]/lead/update";

// TODO: refactor commonly used functions

export async function getUserRole(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user.role;
}

export async function getProjectFromLeadId(id: string) {
  const userIsLeadFor = await prisma.user
    .findUnique({
      where: {
        id,
      },
    })
    .isLeadFor()
    .project();
  return userIsLeadFor;
}

async function createProjectInfo(
  id: number,
  projectInfo: Omit<ProjectUpdateDataNoImages, "id">,
  userId: string,
  needApproval: boolean
) {
  const data: Omit<ProjectInfo, "id" | "updatedAt"> = {
    title: projectInfo.title,
    description: projectInfo.description,
    links: projectInfo.links,
    stack: projectInfo.stack,
    imageUrls: projectInfo.imageUrls,
    recruiting: projectInfo.recruiting,
    recruitingFor: projectInfo.recruitingFor,
    members: projectInfo.members,
    updatedBy: userId,
    approvedBy: undefined,
    approvedAt: undefined,
    requireApproval: needApproval,
  };

  const createdProjectInfo = await prisma.projectInfo.create({
    data,
  });

  await prisma.project.update({
    where: {
      id,
    },
    data: {
      ...(needApproval ? { draftId: createdProjectInfo.id } : { liveId: createdProjectInfo.id }),
    },
  });

  return { savedAsType: needApproval ? "draft" : "live", createdProjectInfo };
}

async function isDraft(projectInfo: ProjectUpdateDataNoImages) {
  const projectDraftVersion = await prisma.project.findUnique({
    where: {
      draftId: projectInfo.id,
    },
  });
  if (projectDraftVersion) {
    return true;
  }
  return false;
}

async function updateProjectDraftInfo(projectInfo: ProjectUpdateDataNoImages, userId: string) {
  const data: Omit<ProjectInfo, "id" | "updatedAt"> = {
    title: projectInfo.title,
    description: projectInfo.description,
    links: projectInfo.links,
    stack: projectInfo.stack,
    imageUrls: projectInfo.imageUrls,
    recruiting: projectInfo.recruiting,
    recruitingFor: projectInfo.recruitingFor,
    members: projectInfo.members,
    updatedBy: userId,
    approvedBy: undefined,
    approvedAt: undefined,
    requireApproval: undefined, // This is undefined so it wont update
  };
  const updatedProjectDraft = await prisma.projectInfo.update({
    where: {
      id: projectInfo.id,
    },
    data,
  });
  return updatedProjectDraft;
}

export async function getProjectInfo(id: string) {
  const project = await prisma.projectInfo.findUnique({
    where: {
      id,
    },
  });
  // remove approvedBy info for team lead
  // eslint-disable-next-line
  return project; // Careful! This version of projectInfo gets the info for approvedBy
}

// TODO: Create req types
const projectUpdateEndpoint = async (
  req: NextApiRequest,
  res: NextApiResponse<any | ErrorMessage>
  // res: NextApiResponse
) => {
  try {
    const dataFromToken = await supabase.auth.getUser(req.headers.authorization);
    const userFromToken = dataFromToken.data.user;
    const projectId = Number(req.query.id);

    if (isNaN(Number(projectId))) {
      res
        .status(400)
        .json({ message: `Project ID is not a number. Received type '${typeof projectId}'` });
    }

    // validate token was given by supabase
    if (!userFromToken) {
      res.status(401).json({ message: "invalid token signature" });
      return;
    }

    // validate user's role is lead or admin
    const userRole = await getUserRole(userFromToken.id);
    if (userRole !== "lead" && userRole !== "admin") {
      res.status(401).json({ message: "User is not a team lead nor admin" });
      return;
    }

    // validate user's auth id is the same as the queried id
    // allow admins through
    if (userFromToken.id !== req.query.id && userRole !== "admin") {
      res.status(401).json({ message: "URL parameter of user ID does not match user ID" });
      return;
    }

    // TODO: Check if is needed to be updated as a draft that requires approval, or go live.

    // TODO: Check that the images as they're uploading do not exceed the maximum size.

    // validate user is the team lead for the project
    const project = await getProjectFromLeadId(userFromToken.id);
    if (project?.id !== Number(projectId)) {
      res.status(401).json({ message: "User is not this project's team lead" });
      return;
    }

    switch (req.method) {
      case "POST":
        // This only handles when user edits and submits a change for live version
        const data: ProjectUpdateData = JSON.parse(req.body);

        // We pass in isDraft in req.body, but we verify this for security.
        // If a lead makes a request with isDraft on a live project version, it can overwrite the live version changes.
        // So we check this here, log if this ever happens, and save to draft version as normal.
        // TODO: Create an admin "audit log" where they check suspicious activity such as this case.
        const isProjectDraft = await isDraft(data);
        if (isProjectDraft !== data.isDraft) {
          console.error(
            "Tampering with isDraft is detected, this could've been done in an attempt to overwrite the live version.",
            "The discrepancy was handled, but please take caution with this user.",
            userFromToken,
            data
          );
        }
        if (isProjectDraft) {
          const updateProjectDraftInfoFeedback = await updateProjectDraftInfo(
            data,
            userFromToken.id
          );
          res.status(200).json({
            message: "Project draft updated!",
            updateProjectDraftInfoFeedback,
          });
          break;
        }
        const needApproval = deepDirtyCheckerServerside(
          [
            { controlName: "title" },
            { controlName: "description", deepCheck: true },
            { controlName: "recruitingFor", deepCheck: true },
            { controlName: "stack", deepCheck: true },
            { controlName: "links", deepCheck: true },
            { controlName: "imageUrls", deepCheck: true },
          ],
          await getProjectInfo(project.liveId),
          data
        );
        const updateProjectInfoFeedback = await createProjectInfo(
          projectId,
          data,
          userFromToken.id,
          needApproval.length > 0
        );
        res.status(200).json({
          message: "Project Updated!",
          updateProjectInfoFeedback,
        });
        break;
      default:
        res.status(405).json({
          message: `Usage: ${usage}, you used ${req.method}`,
        });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default projectUpdateEndpoint;
