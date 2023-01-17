import { useQuery } from "@tanstack/react-query";
import { GetLoggedInUserResponse } from "../types";

/**
 * CAUTION:
 *  Only logged in user should access their own info
 *  Other users should only see data from useUser
 * @param userId
 * @returns
 */
export function useLoggedInUser(id: string, token: string) {
  return useQuery<GetLoggedInUserResponse>(["user", id], async () => {
    const response = await fetch(`/api/users/${id}`, {
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
