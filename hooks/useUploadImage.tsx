import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { v4 as uuidv4 } from "uuid";

// Prob dont need this as a hook, will upload all images upon submission.
export function useUploadProjectImage(projectId: string, userId: string, file: File) {
  const queryClient = useQueryClient();
  return useMutation<Blob>(["project", projectId], async () => {
    const { data, error } = await supabase.storage.from("projects").upload(uuidv4(), file);
    if (error) {
      throw new Error(error.message);
    }
    queryClient.invalidateQueries(["project"]);
    return data;
  });
}
