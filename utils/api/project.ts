import { PrismaClient, ProjectInfo } from "@prisma/client";
import { supabase } from "../../supabase-client";
import { AdminReviewRequest, MemberInfo, ProjectUpdateDataNoImages } from "../../types";

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

export async function deleteProjectVersionFolder(projectId: number, folderName: "draft" | "live") {
  // Get all files in the old folder
  const { data, error } = await supabase.storage
    .from("projects")
    .list(`${projectId}/${folderName}/`);
  if (error) throw error;

  // Once a folder is emptied, supabase auto deletes it
  for (const file of data) {
    const pathToDelete = `${projectId}/${folderName}/${file.name}`;
    const deleteResponse = await supabase.storage.from("projects").remove([pathToDelete]);
    if (deleteResponse.error) throw deleteResponse.error;
  }
}

// Fix the function params to be the same as deleteProjectVersionFolder
export async function duplicateProjectFolder(folderNameOld: string, folderNameNew: string) {
  // Get all files in the old folder
  const { data, error } = await supabase.storage.from("projects").list(folderNameOld);
  if (error) throw error;

  // For each file, copy to new location and delete the old one
  for (const file of data) {
    // Copy to new location
    const oldPath = folderNameOld + file.name;
    const newPath = oldPath.replace(folderNameOld, folderNameNew);
    const copyResponse = await supabase.storage.from("projects").copy(oldPath, newPath);
    if (copyResponse.error) throw copyResponse.error;
  }
}

export async function approveProject(result: AdminReviewRequest) {
  const projectDraft = await prisma.projectInfo.update({
    where: {
      id: result.draftId,
    },
    data: {
      status: "approved",
      feedback: result.feedback,
    },
  });

  const projectMasterRecord = await prisma.project.update({
    where: {
      id: result.projectId,
    },
    data: {
      liveId: result.draftId,
      draftId: null,
    },
  });

  // Supabase does not have dir renaming api, so we need this horror
  // https://github.com/supabase/storage-api/issues/207

  // Delete live folder
  await deleteProjectVersionFolder(result.projectId, "live").catch(console.error);

  // Rename draft folder to live
  await duplicateProjectFolder(`${result.projectId}/draft/`, `${result.projectId}/live/`).catch(
    console.error
  );

  // Delete draft folder
  await deleteProjectVersionFolder(result.projectId, "draft").catch(console.error);

  return { projectDraft, projectMasterRecord };
}

export async function rejectProject(result: AdminReviewRequest) {
  const projectDraft = await prisma.projectInfo.update({
    where: {
      id: result.draftId,
    },
    data: {
      status: "rejected",
      feedback: result.feedback,
    },
  });

  return { projectDraft, projectMasterRecord: undefined };
}
