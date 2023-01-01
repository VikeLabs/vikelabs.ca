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

export async function verifySignature(authToken: string) {
  const verifySignature = await supabase.auth.getUser(authToken);
  if (verifySignature.data.user) {
    return true;
  }
  return false;
}

const editUser = async (
  req: NextApiRequest,
  res: NextApiResponse<GetLoggedInUserResponse | ErrorMessage>
  // res: NextApiResponse
) => {
  try {
    if (!(await verifySignature(req.headers.authorization))) {
      res.status(401).json({ message: "invalid token signature" });
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
