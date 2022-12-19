import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoggedInUserEditForm } from "../types";
import { useToken } from "./useToken";

export function useEditUserMutation(oAuthId: string, token: string) {
  const queryClient = useQueryClient();
  return useMutation(async (data: LoggedInUserEditForm) => {
    const response = await fetch(`/api/users/${oAuthId}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        // "Content-Type": "application/json",
        Authorization: token,
      },
    });
    queryClient.invalidateQueries(["user"]);
    return response;
  });
}
