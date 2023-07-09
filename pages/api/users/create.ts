import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import { ErrorMessage, GetLoggedInUserResponse } from "../../../types";
import { supabase } from "../../../supabase-client";
import { createNewUser, getUserIfExist } from "../../../utils/api/user";

const usage = "POST /api/users/[id]";

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
      res.status(500).json({
        message: "An account with the same ID as the user already exists.",
      });
      return;
    }

    let user: User;
    let userFromInput: any;
    switch (req.method) {
      case "POST":
        userFromInput = JSON.parse(req.body);
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
