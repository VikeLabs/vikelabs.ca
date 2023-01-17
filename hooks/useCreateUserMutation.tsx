import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateUserRequest } from "../types";

export function useCreateUserMutation(token: string) {
  const queryClient = useQueryClient();
  return useMutation(async (data: CreateUserRequest) => {
    const response = await fetch("/api/users/create", {
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
