import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";
import {
  CreateUserInput,
  ErrorMessage,
  GetLoggedInUserResponse,
  LoggedInUserEditForm,
} from "../../../types";
import { supabase } from "../../../supabase-client";

const prisma = new PrismaClient();
const usage = "POST /api/users/[id]";

export async function getUserIfExist(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (e) {
    // user does not exist
    return undefined;
  }
}

// TODO: Please dont use any
export async function createNewUser(id: string, userFromInput: CreateUserInput) {
  const data: User = {
    id,
    vId: userFromInput.vId,
    username: userFromInput.username,
    displayName: userFromInput.displayName,
    firstName: userFromInput.firstName,
    lastName: userFromInput.lastName,
    github: userFromInput.github,
    imageUrl: userFromInput.imageUrl,
    role: "member",
  };
  const createdUser = await prisma.user.create({
    data,
  });
  return createdUser;
}

const createUser = async (
  req: NextApiRequest,
  res: NextApiResponse<GetLoggedInUserResponse | ErrorMessage>
  // res: NextApiResponse
) => {
  try {
    const token = req.headers.authorization;

    const dataFromToken = await supabase.auth.getUser(token);
    const userFromToken = dataFromToken.data.user;

    // token must have been given by supabase itself
    if (!userFromToken) {
      res.status(401).json({ message: "invalid token signature" });
      return;
    }

    // user must not already have an account
    const checkUserExists = await getUserIfExist(userFromToken.id);
    if (checkUserExists) {
      res.status(500).json({ message: "An account with the same ID as the user already exists." });
      return;
    }

    let user: User;
    switch (req.method) {
      case "POST":
        const userFromInput = req.body;
        user = await createNewUser(userFromToken.id, userFromInput);
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

export default createUser;
