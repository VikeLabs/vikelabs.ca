import { useMutation, useQueryClient } from "@tanstack/react-query";
import imageCompression from "browser-image-compression";
import { blobToWebP, srcToWebP } from "webp-converter-browser";
import { supabase } from "../supabase-client";
import { ProjectUpdateData } from "../types";

// import { CreateUserRequest } from "../types";

// Send project head ID (int) here. Draft/live ID will be made in backend
export function useProjectUpdateMutation(
  id: number,
  token: string,
  setImagesToAddCount: (count: number) => void,
  setImageAddingIndex: (count: number) => void
) {
  const queryClient = useQueryClient();
  return useMutation(async (data: ProjectUpdateData) => {
    const { imageFilesToAdd, imageUrlsToDelete, ...projectData } = data;

    // Compress images before uploading
    setImagesToAddCount(imageFilesToAdd.length);
    for (let i = 0; i < imageFilesToAdd.length; i++) {
      setImageAddingIndex(i + 1);
      const imageFile = imageFilesToAdd[i];
      console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
      console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
      try {
        // console.log(compressedWebp);

        const compressedFile = await imageCompression(imageFile, {
          maxWidthOrHeight: 1600,
          useWebWorker: true,
        });
        const compressedWebp = await blobToWebP(compressedFile, {
          quality: 70,
        });
        console.log("compressedFile instanceof Blob", compressedFile instanceof Blob); // true
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

        // TODO: Set policies so that only team leads that have leadership over project ID of ${id} can use upload/delete

        const { data, error } = await supabase.storage
          .from("projects")
          .upload(
            `${id}/${compressedFile.name.toLowerCase().replaceAll(" ", "_")}`,
            compressedWebp,
            {
              cacheControl: "0",
              upsert: false,
              contentType: compressedWebp.type,
            }
          );
        if (data) {
          // console.log(data);
        } else {
          // TODO: Show toast for these errors (ex duplicate image exists)
          console.error(error);
        }
      } catch (error) {
        // TODO: Show toast for these errors
        console.log(error);
      }
    }

    // TODO: Set policies so that only team leads that have leadership over project ID of ${id} can use upload/delete

    // Delete images
    const imageUrls: string[] = imageUrlsToDelete.map(
      (imageUrl) => `${id}/${imageUrl.split("/").pop()}`
    );
    await supabase.storage.from("projects").remove(imageUrls);

    // eslint-disable-next-line
    console.log("project data", projectData);
    const response = await fetch(`/api/project/${id}/lead/update`, {
      method: "POST",
      body: JSON.stringify(projectData),
      headers: {
        // "Content-Type": "application/json",
        Authorization: token,
      },
    });
    queryClient.invalidateQueries(["project", "projectImages"]);
    queryClient.removeQueries({ queryKey: ["project", "projectImages"], exact: true });
    return response;
  });
}
