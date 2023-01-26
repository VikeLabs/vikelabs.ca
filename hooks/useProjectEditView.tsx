import { useQuery } from "@tanstack/react-query";
import { GetProjectEditViewResponse } from "../types";

// TODO: Only team leads should be able to use this query
// all other users will get an error from the backend
export function useProjectInfo(id: string, token: string) {
  return useQuery<GetProjectEditViewResponse>(["project", id], async () => {
    const response = await fetch(`/api/projects/${id}/lead`, {
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
