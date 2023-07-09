import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorMessage, ProjectLiveView } from "../../../types/index";
import { getApprovedProjectsFiltered } from "../../../utils/api/project";

const usage = "GET /api/project/lives";

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
        data = await getApprovedProjectsFiltered();
        res.status(200).json(data);
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

export default projectLivesEndpoint;
