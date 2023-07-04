import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminReviewRequest } from "../types";

export function useProjectModerateMutation(token: string) {
  const queryClient = useQueryClient();
  return useMutation(async (data: AdminReviewRequest) => {
    const response = await fetch("/api/project/moderate/update", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        // "Content-Type": "application/json",
        Authorization: token,
      },
    });
    queryClient.invalidateQueries(["project", "draftProjects", "allProjects"]);
    return response;
  });
}
