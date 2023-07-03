import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Project, ProjectInfo } from "@prisma/client";
import { ErrorMessage, ProjectUpdateData } from "../../../../types/index";
import { supabase } from "../../../../supabase-client";
import { AdminReviewRequest } from "../../../../types";

const prisma = new PrismaClient();
const usage = "POST /api/project/moderate/update";

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
      managerMemo: result.feedback,
    },
  });

  const projectMasterRecord = await prisma.project.update({
    where: {
      id: result.projectId,
    },
    data: {
      liveId: result.draftId,
      draftId: undefined,
    },
  });

  return { projectDraft, projectMasterRecord };
}

async function rejectProject(result: AdminReviewRequest) {
  const projectDraft = await prisma.projectInfo.update({
    where: {
      id: result.draftId,
    },
    data: {
      status: "rejected",
      managerMemo: result.feedback,
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
    const adminReview: AdminReviewRequest = req.body;
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
