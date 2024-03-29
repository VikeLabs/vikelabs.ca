import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import { ErrorMessage, GetLoggedInUserResponse } from "../../../../types";
import { supabase } from "../../../../supabase-client";
import { getUser, updateUser } from "../../../../utils/api/user";

const usage = "GET or POST /api/users/[id]";

const userEndpoint = async (
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
    // TODO: admins should be able to view this
    if (userFromToken.id !== req.query.id) {
      res.status(401).json({ message: "URL parameter of user ID does not match user ID" });
      return;
    }

    let user: User;
    switch (req.method) {
      case "GET":
        user = await getUser(req.query.id);
        res.status(200).json(user);
        break;
      case "POST":
        user = await updateUser(req.query.id, JSON.parse(req.body));
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

export default userEndpoint;
