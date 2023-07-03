import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Project, ProjectInfo } from "@prisma/client";
import { ErrorMessage, ProjectUpdateData } from "../../../types/index";
import { supabase } from "../../../supabase-client";

const prisma = new PrismaClient();
const usage = "GET /api/project/all";

async function getUserRole(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user.role;
}

async function getAllProjects() {
  const projects = await prisma.project.findMany({});
  return projects;
}

// TODO: Create req types
const projectDraftsEndpoint = async (
  req: NextApiRequest,
  res: NextApiResponse<any | ErrorMessage>
  // res: NextApiResponse
) => {
  try {
    console.log("TOKEN", req.headers.authorization);

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

    let data: Project[];
    switch (req.method) {
      case "GET":
        data = await getAllProjects();
        res.status(200).json(data);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default projectDraftsEndpoint;
