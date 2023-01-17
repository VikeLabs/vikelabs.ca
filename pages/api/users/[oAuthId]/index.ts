import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";
import { ErrorMessage, GetLoggedInUserResponse, LoggedInUserEditForm } from "../../../../types";
import { supabase } from "../../../../supabase-client";

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

const editUser = async (
  req: NextApiRequest,
  res: NextApiResponse<GetLoggedInUserResponse | ErrorMessage>
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
    // validate user's auth id is the same as the queried id
    // admins should be able to view this
    if (userFromToken.id !== req.query.oAuthId) {
      res.status(401).json({ message: "URL parameter of user ID does not match user ID" });
      return;
    }
    let user: User;
    switch (req.method) {
      case "GET":
        user = await getUser(req.query.oAuthId as string);
        res.status(200).json(user);
        break;
      case "POST":
        user = await updateUser(req.query.oAuthId as string, JSON.parse(req.body));
        res.status(200).json(user);
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

export default editUser;
