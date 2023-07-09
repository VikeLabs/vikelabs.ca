import { PrismaClient, ProjectInfo } from "@prisma/client";
import { MemberInfo, ProjectUpdateDataNoImages } from "../../types";

const prisma = new PrismaClient();

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

export async function getProjectInfo(id: string) {
  const project = await prisma.projectInfo.findUnique({
    where: {
      id,
    },
  });
  return project;
}

export async function createProjectInfo(
  id: number,
  projectInfo: Omit<ProjectUpdateDataNoImages, "id">,
  userId: string,
  status: "submitted" | "saved"
) {
  const data: Omit<ProjectInfo, "id" | "updatedAt" | "managedBy" | "managedAt" | "managerMemo"> = {
    title: projectInfo.title,
    description: projectInfo.description,
    links: projectInfo.links,
    stack: projectInfo.stack,
    imageUrls: projectInfo.imageUrls,
    recruiting: projectInfo.recruiting,
    recruitingFor: projectInfo.recruitingFor,
    members: projectInfo.members,
    updatedBy: userId,
    memo: projectInfo.memo,
    feedback: null,
    status,
  };

  const project = await prisma.projectInfo.create({
    data,
  });

  await prisma.project.update({
    where: {
      id,
    },
    data: {
      draftId: project.id,
    },
  });

  return project;
}

export async function updateProjectInfoDraft(
  projectInfo: ProjectUpdateDataNoImages,
  userId: string,
  status: "submitted" | "saved"
) {
  const data: Omit<ProjectInfo, "id" | "updatedAt" | "managedBy" | "managedAt"> = {
    status,
    title: projectInfo.title,
    description: projectInfo.description,
    links: projectInfo.links,
    stack: projectInfo.stack,
    imageUrls: projectInfo.imageUrls,
    recruiting: projectInfo.recruiting,
    recruitingFor: projectInfo.recruitingFor,
    members: projectInfo.members,
    memo: projectInfo.memo,
    feedback: null,
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

export async function isProjectDraft(id: string) {
  const projectDraftVersion = await prisma.project.findUnique({
    where: {
      draftId: id,
    },
  });
  if (projectDraftVersion) {
    return true;
  }
  return false;
}

export async function getProjectMembers(id: number) {
  const members = await prisma.project
    .findUnique({
      where: {
        id,
      },
    })
    .members();
  const memberInfos: MemberInfo[] = [];
  for (const member of members) {
    const memberInfo = await prisma.user.findUnique({
      where: {
        id: member.memberId,
      },
    });
    const { id, username, displayName, imageUrl, github, discord, isCredited } = memberInfo;
    memberInfos.push({
      id,
      username,
      displayName,
      imageUrl,
      github,
      discord,
      isCredited,
    });
  }
  return memberInfos;
}
