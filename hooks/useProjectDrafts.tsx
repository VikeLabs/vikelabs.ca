import { ProjectInfo } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export function useProjectDrafts(token: string) {
  return useQuery<ProjectInfo[]>({
    queryKey: ["draftProjects", token],
    queryFn: async () => {
      const response = await fetch("/api/project/drafts", {
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
      // eslint-disable-next-line
      return await response.json();
    },
    retry: 3,
  });
}
