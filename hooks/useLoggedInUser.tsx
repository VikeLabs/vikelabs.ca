import { useQuery } from "@tanstack/react-query";
import { GetLoggedInUserResponse } from "../types";

export function useLoggedInUser(id: string, token: string) {
  return useQuery<GetLoggedInUserResponse>({
    queryKey: ["user", id],
    queryFn: async () => {
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
    },
    retry: 3,
  });
}
