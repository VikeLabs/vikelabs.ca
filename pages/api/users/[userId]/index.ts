import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { ErrorMessage, GetLoggedInUserResponse } from "../../../../types";

const prisma = new PrismaClient();
const usage = "GET /api/users/[userId]";

export async function getUser(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<GetLoggedInUserResponse | ErrorMessage>
) => {
  switch (req.method) {
    case "GET":
      try {
        const user = await getUser(req.query.userId as string);
        res.status(200).json({
          ...user,
        });
      } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
      }
      break;
    default:
      res.status(405).json({
        message: `Usage: ${usage}`,
      });
  }
};
