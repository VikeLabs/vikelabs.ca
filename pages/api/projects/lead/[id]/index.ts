import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { ErrorMessage, GetProjectEditViewResponse, MemberInfo } from "../../../../../types";
import { supabase } from "../../../../../supabase-client";

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
    if (member.isCredited) {
      const memberInfo = await prisma.user.findUnique({
        where: {
          id: member.memberId,
        },
      });
      const { id, username, displayName, imageUrl, github, discord } = memberInfo;
      memberInfos.push({
        id,
        username,
        displayName,
        imageUrl,
        github,
        discord,
      });
    }
  }
  return memberInfos;
}

export async function getProjectInfo(id: string) {
  const project = await prisma.projectInfo.findUnique({
    where: {
      id,
    },
  });
  // remove approvedBy info for team lead
  // eslint-disable-next-line
  const { approvedBy, ...projectEdit } = project;
  return projectEdit;
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
    if (!project) {
      res.status(401).json({ message: "User is not this project's team lead" });
      return;
    }

    switch (req.method) {
      case "GET":
        res.status(200).json({
          id: project.id,
          live: await getProjectInfo(project.liveId),
          draft: await getProjectInfo(project.draftId),
          members: await getProjectMembers(project.id),
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
