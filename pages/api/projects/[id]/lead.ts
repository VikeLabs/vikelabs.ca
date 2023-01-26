import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, ProjectInfo } from "@prisma/client";
import { ErrorMessage, GetProjectEditViewResponse } from "../../../../types";
import { supabase } from "../../../../supabase-client";

const prisma = new PrismaClient();
const usage = "GET /api/project/[id]";

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

export async function getUserRole(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user.role;
}

export async function getProject(id: number) {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });
  return project;
}

export async function getProjectInfo(id: string) {
  const project = await prisma.projectInfo.findUnique({
    where: {
      id,
    },
  });
  return project;
}

const userEndpoint = async (
  req: NextApiRequest,
  res: NextApiResponse<GetProjectEditViewResponse | ErrorMessage>
  // res: NextApiResponse
) => {
  try {
    const dataFromToken = await supabase.auth.getUser(req.headers.authorization);
    const userFromToken = dataFromToken.data.user;

    // validate token was given by supabase
    if (!userFromToken) {
      res.status(401).json({ message: "invalid token signature" });
      return;
    }

    // check if projectId is actually a number
    if (isNaN(Number(req.query.id))) {
      res.status(401).json({ message: "project ID is supposed to be a number, received NaN." });
      return;
    }

    // validate user's role is lead
    const userRole = await getUserRole(userFromToken.id);
    if (userRole !== "lead" && userRole !== "admin") {
      res.status(401).json({ message: "User is not a team lead nor admin" });
      return;
    }

    // validate user is the team lead for the project
    const project = await getProjectFromLeadId(userFromToken.id);
    if (project.id !== Number(req.query.id)) {
      res.status(401).json({ message: "User is not this project's team lead" });
      return;
    }

    switch (req.method) {
      case "GET":
        res.status(200).json({
          projectLive: await getProjectInfo(project.liveId),
          projectDraft: await getProjectInfo(project.draftId),
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

export default userEndpoint;
