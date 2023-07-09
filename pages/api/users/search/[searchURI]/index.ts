import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorMessage, UserSearchResult } from "../../../../../types";
import { supabase } from "../../../../../supabase-client";
import { getSearchUsers } from "../../../../../utils/api/user";

const usage = "GET /api/users/search/[searchURI]";

const searchUsers = async (
  req: NextApiRequest,
  res: NextApiResponse<UserSearchResult[] | ErrorMessage>
) => {
  try {
    const dataFromToken = await supabase.auth.getUser(req.headers.authorization);
    const userFromToken = dataFromToken.data.user;

    // validate token was given by supabase
    if (!userFromToken) {
      res.status(401).json({ message: "invalid token signature" });
      return;
    }

    let searchResults: UserSearchResult[];
    switch (req.method) {
      case "GET":
        searchResults = await getSearchUsers(req.query.searchURI as string);
        res.status(200).json(searchResults);
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

export default searchUsers;
