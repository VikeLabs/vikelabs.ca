import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoggedInUserEditForm, UserMutation } from "../types";

export function useEditUserMutation(oAuthId: string) {
  const queryClient = useQueryClient();
  return useMutation(async ({ data, token }: UserMutation) => {
    const response = await fetch(`/api/users/${oAuthId}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    queryClient.invalidateQueries(["user"]);
    return response;
  });
}
