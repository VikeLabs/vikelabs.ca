import { Project } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export function useProjectMasterRecord(token: string) {
  return useQuery<Project[]>({
    queryKey: ["allProjects"],
    queryFn: async () => {
      const response = await fetch("/api/project/all", {
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
