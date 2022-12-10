import { useQuery } from "@tanstack/react-query";
import { GetLoggedInUserResponse } from "../types";

/**
 * CAUTION:
 *  Only logged in user should access their own info
 *  Other users should only see data from useUser
 * @param userId
 * @returns
 */
export function useLoggedInUser(userId: string) {
  return useQuery<GetLoggedInUserResponse>(["user", userId], async () => {
    const response = await fetch(`/api/users/${userId}`, {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      //   Authorization: `Bearer auth token?`,
      // },
    });
    if (!response.ok) {
      console.error("Error!", response.statusText);
      throw new Error(response.statusText);
    }
    return await response.json();
  });
}
