import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Project, ProjectInfo } from "@prisma/client";
import { ErrorMessage } from "../../../../types/index";
import { supabase } from "../../../../supabase-client";
import { AdminReviewRequest } from "../../../../types";

const prisma = new PrismaClient();
const usage = "POST /api/project/moderate/update";

async function deleteProjectVersionFolder(projectId: number, folderName: "draft" | "live") {
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
async function duplicateProjectFolder(folderNameOld: string, folderNameNew: string) {
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

async function getUserRole(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user.role;
}

async function approveProject(result: AdminReviewRequest) {
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

async function rejectProject(result: AdminReviewRequest) {
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

// TODO: Create req types
const moderateUpdateProjectEndpoint = async (
  req: NextApiRequest,
  res: NextApiResponse<any | ErrorMessage>
  // res: NextApiResponse
) => {
  try {
    const dataFromToken = await supabase.auth.getUser(req.headers.authorization);
    const userFromToken = dataFromToken.data.user;

    // validate token was given by supabase
    // TODO: Change to throw and catch and the end that defaults to 500 if no error code
    if (!userFromToken) {
      res.status(401).json({ message: "invalid token signature" });
      return;
    }

    // validate user's role is admin
    const userRole = await getUserRole(userFromToken.id);
    if (userRole !== "admin") {
      res.status(401).json({ message: "User is not an admin" });
      return;
    }

    let data: {
      projectDraft: ProjectInfo;
      projectMasterRecord: Project | undefined;
    };
    const adminReview: AdminReviewRequest = JSON.parse(req.body);
    switch (req.method) {
      case "POST":
        if (adminReview.approved) {
          data = await approveProject(adminReview);
        } else {
          if (!adminReview.feedback) {
            res.status(500).json({ message: "Rejection requires feedback" });
          }
          data = await rejectProject(adminReview);
        }
        res.status(200).json(data);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default moderateUpdateProjectEndpoint;
