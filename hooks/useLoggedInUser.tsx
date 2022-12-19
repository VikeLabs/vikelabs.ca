import { useQuery } from "@tanstack/react-query";
import { GetLoggedInUserResponse } from "../types";
import { useToken } from "./useToken";

/**
 * CAUTION:
 *  Only logged in user should access their own info
 *  Other users should only see data from useUser
 * @param userId
 * @returns
 */
export function useLoggedInUser(oAuthId: string, token: string) {
  return useQuery<GetLoggedInUserResponse>(["user", oAuthId], async () => {
    const response = await fetch(`/api/users/${oAuthId}`, {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (!response.ok) {
      console.error("Error!", response.statusText);
      throw new Error(response.statusText);
    }
    return await response.json();
  });
}
