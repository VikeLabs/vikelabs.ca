import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorMessage, GetProjectEditViewResponse } from "../../../../../types";
import { supabase } from "../../../../../supabase-client";
import { getUserRole } from "../../../../../utils/api/user";
import {
  getProjectFromLeadId,
  getProjectInfo,
  getProjectMembers,
} from "../../../../../utils/api/project";

const usage = "GET /api/project/[id]";

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
      res.status(401).json({ message: "Team lead does not have any projects" });
      return;
    }

    switch (req.method) {
      case "GET":
        res.status(200).json({
          id: project.id,
          live: await getProjectInfo(project.liveId),
          draft: project.draftId ? await getProjectInfo(project.draftId) : null,
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
