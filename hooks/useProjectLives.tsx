import { useQuery } from "@tanstack/react-query";
import { ProjectLiveView } from "../types";

export function useProjectLives() {
  return useQuery<ProjectLiveView[]>({
    queryKey: ["liveProjects"],
    queryFn: async () => {
      const response = await fetch("/api/project/lives", {
        method: "GET",
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
