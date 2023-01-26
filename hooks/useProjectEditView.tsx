import { useQuery } from "@tanstack/react-query";
import { GetProjectEditViewResponse } from "../types";

export function useProjectEditView(leadId: string, token: string) {
  return useQuery<GetProjectEditViewResponse>(["project", leadId], async () => {
    const response = await fetch(`/api/projects/lead/${leadId}`, {
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
