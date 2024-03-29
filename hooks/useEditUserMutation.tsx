import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserEditorForm } from "../types";

export function useEditUserMutation(id: string, token: string) {
  const queryClient = useQueryClient();
  return useMutation(async (data: UserEditorForm) => {
    const response = await fetch(`/api/users/${id}`, {
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
