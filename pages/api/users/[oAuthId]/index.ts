import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import {
  ErrorMessage,
  GetLoggedInUserResponse,
  LoggedInUserEditForm,
} from "../../../../types";
import NextCors from "nextjs-cors";

const prisma = new PrismaClient();
const usage = "GET or POST /api/users/[oAuthId]";

export async function getUser(oAuthId: string) {
  const user = await prisma.user.findUnique({
    where: {
      oAuthId,
    },
  });
  return user;
}

export async function updateUser(oAuthId: string, data: LoggedInUserEditForm) {
  const user = await prisma.user.update({
    where: {
      oAuthId,
    },
    data,
  });
  return user;
}

export default async (
  req: NextApiRequest,
  // res: NextApiResponse<GetLoggedInUserResponse | ErrorMessage>
  res: NextApiResponse
) => {
  // await NextCors(req, res, {
  //   // Options
  //   methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  //   origin: "*",
  //   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  // });
  // TODO: I don't think we need both id (cuid) and oAuthId
  switch (req.method) {
    case "GET":
      try {
        const user = await getUser(req.query.oAuthId as string);
        res.status(200).json({
          ...user,
        });
      } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: e.message });
      }
      break;
    case "POST":
      try {
        const user = await updateUser(
          req.query.userId as string,
          JSON.parse(req.body)
        );
        res.status(200).json({
          ...user,
          headers: req.headers,
        });
      } catch (e) {
        console.error(e.message, req.headers);
        res.status(500).json({ message: e.message });
      }
      break;
    default:
      res.status(405).json({
        message: `Usage: ${usage}, you used ${req.method}`,
      });
  }
};
