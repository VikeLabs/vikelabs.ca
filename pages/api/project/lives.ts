import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Project, ProjectInfo } from "@prisma/client";
import { ErrorMessage, ProjectLiveView } from "../../../types/index";

const prisma = new PrismaClient();
const usage = "GET /api/project/lives";

async function getLiveProjects() {
  const projectMasterRecord = await prisma.project.findMany({});
  const approvedProjects = await prisma.projectInfo.findMany({
    where: {
      status: "approved",
    },
  });
  // Filter out items from approvedProjects whose ids are included in each projectMasterRecord's liveId
  const approvedProjectsFiltered = projectMasterRecord
    .sort((a, b) => (a.order > b.order ? 1 : -1))
    .map((pmr: Project) => ({
      id: pmr.id,
      order: pmr.order,
      projectInfo: approvedProjects.find((project: ProjectInfo) => project.id === pmr.liveId),
    }));
  return approvedProjectsFiltered;
}

// TODO: Create req types
const projectLivesEndpoint = async (
  req: NextApiRequest,
  res: NextApiResponse<any | ErrorMessage>
  // res: NextApiResponse
) => {
  try {
    let data: ProjectLiveView[];
    switch (req.method) {
      case "GET":
        data = await getLiveProjects();
        res.status(200).json(data);
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export default projectLivesEndpoint;
