import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, ProjectInfo, Status } from "@prisma/client";
import {
  ErrorMessage,
  LinkTag,
  ProjectUpdateData,
  ProjectUpdateDataNoImages,
  TechTag,
} from "../../../../../types";
import { supabase } from "../../../../../supabase-client";
import { deepDirtyCheckerServerside } from "../../../../../utils/needApproval";

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
  status: "submitted" | "saved"
) {
  const data: Omit<ProjectInfo, "id" | "updatedAt" | "managedBy" | "managedAt" | "managerMemo"> = {
    title: projectInfo.title,
    status, // TODO: fix this, I put this here randomly for testing
    description: projectInfo.description,
    links: projectInfo.links,
    stack: projectInfo.stack,
    imageUrls: projectInfo.imageUrls,
    recruiting: projectInfo.recruiting,
    recruitingFor: projectInfo.recruitingFor,
    members: projectInfo.members,
    updatedBy: userId,
  };

  const createdProjectInfo = await prisma.projectInfo.create({
    data,
  });

  await prisma.project.update({
    where: {
      id,
    },
    data: {
      draftId: createdProjectInfo.id,
    },
  });

  return createdProjectInfo;
}

async function isDraft(draftId: string) {
  const projectDraftVersion = await prisma.project.findUnique({
    where: {
      draftId,
    },
  });
  if (projectDraftVersion) {
    return true;
  }
  return false;
}

async function updateProjectDraftInfo(
  projectInfo: ProjectUpdateDataNoImages,
  userId: string,
  status: "submitted" | "saved"
) {
  const data: Omit<ProjectInfo, "id" | "updatedAt" | "managedBy" | "managedAt" | "managerMemo"> = {
    status,
    title: projectInfo.title,
    description: projectInfo.description,
    links: projectInfo.links,
    stack: projectInfo.stack,
    imageUrls: projectInfo.imageUrls,
    recruiting: projectInfo.recruiting,
    recruitingFor: projectInfo.recruitingFor,
    members: projectInfo.members,
    updatedBy: userId,
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
      res.status(400).json({
        message: `Project ID is not a number. Received type '${typeof projectId}'`,
      });
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

    // validate user is the team lead for the project
    const project = await getProjectFromLeadId(userFromToken.id);
    if (project?.id !== Number(projectId)) {
      res.status(401).json({ message: "User is not this project's team lead" });
      return;
    }

    let data: ProjectUpdateData;
    let updatedData: ProjectInfo;
    let type: "submitted" | "re-submitted";
    switch (req.method) {
      case "POST":
        data = JSON.parse(req.body);
        if (await isDraft(data.id)) {
          type = "re-submitted";
          updatedData = await updateProjectDraftInfo(data, userFromToken.id, "submitted");
        } else {
          type = "submitted";
          updatedData = await createProjectInfo(project.id, data, userFromToken.id, "submitted");
        }

        res.status(200).json({ updatedData, type });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default projectUpdateEndpoint;
