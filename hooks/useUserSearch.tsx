import { useQuery } from "@tanstack/react-query";
import { UserSearchResult } from "../types";

type GetUserSearchResponse = {
  data: UserSearchResult[];
};

export function useUserSearch(search: string, token: string) {
  return useQuery<GetUserSearchResponse["data"]>({
    queryKey: ["userSearch", search],
    queryFn: async () => {
      const searchURI = encodeURIComponent(search?.trim());
      const response = await fetch(`/api/users/search/${searchURI}`, {
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
