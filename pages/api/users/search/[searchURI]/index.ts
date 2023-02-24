import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { ErrorMessage, UserSearchResult } from "../../../../../types";
import { supabase } from "../../../../../supabase-client";

const prisma = new PrismaClient();
const usage = "GET /api/users/search/[searchURI]";

async function getUserSearchResults(search: string) {
  const userSearchResults: UserSearchResult[] = await prisma.user.findMany({
    where: {
      OR: [
        { username: { contains: search, mode: "insensitive" } },
        { displayName: { contains: search, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      username: true,
      displayName: true,
      imageUrl: true,
    },
  });
  return userSearchResults;
}

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
        searchResults = await getUserSearchResults(req.query.searchURI as string);
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
