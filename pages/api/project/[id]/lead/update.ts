import type { NextApiRequest, NextApiResponse } from "next";
import { ProjectInfo } from "@prisma/client";
import { ErrorMessage, ProjectUpdateData } from "../../../../../types";
import { supabase } from "../../../../../supabase-client";
import { getUserRole } from "../../../../../utils/api/user";
import {
  createProjectInfo,
  getProjectFromLeadId,
  isProjectDraft,
  updateProjectInfoDraft,
} from "../../../../../utils/api/project";

const usage = "POST /api/project/[id]/lead/update";

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
        if (await isProjectDraft(data.id)) {
          type = "re-submitted";
          updatedData = await updateProjectInfoDraft(data, userFromToken.id, "submitted");
        } else {
          type = "submitted";
          updatedData = await createProjectInfo(project.id, data, userFromToken.id, "submitted");
        }
        res.status(200).json({ updatedData, type });
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
