import { useMutation, useQueryClient } from "@tanstack/react-query";
import imageCompression from "browser-image-compression";
import { blobToWebP } from "webp-converter-browser";
import { supabase } from "../supabase-client";
import { ProjectUpdateData } from "../types";

// import { CreateUserRequest } from "../types";
interface FileObject {
  name: string;
  bucket_id: string;
  owner: string;
  id: string;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
  metadata: Record<string, any>;
  buckets: any;
}
// Send project head ID (int) here. Draft/live ID will be made in backend
export function useProjectUpdateMutation(
  id: number,
  token: string,
  setImagesToAddCount: (count: number) => void,
  setImageAddingIndex: (count: number) => void
) {
  const queryClient = useQueryClient();
  return useMutation(async (data: ProjectUpdateData) => {
    const { imageFilesToAdd, imageUrlsToDelete, defaultImages, ...projectData } = data;

    // sync /draft folder with /live folder if not in sync
    const { data: supaImageList } = await supabase.storage.from("projects").list(`${id}/draft`, {
      limit: 20,
      offset: 0,
      sortBy: { column: "name", order: "asc" }, // already sorted
    });

    const supaImageUrlList = supaImageList.map((fileObject: FileObject) => fileObject.name);
    const dataImageUrlsList = projectData.imageUrls as string[];
    const difference = dataImageUrlsList.filter((imageUrl) => !supaImageUrlList.includes(imageUrl));

    // If isDraft is FALSE this is a new draft, so sync images.
    // There may be existing files in /draft, so this check is necessary.
    if (!data.isDraft) {
      // synchronize image directories
      const placeholderIndex = supaImageUrlList.indexOf(".emptyFolderPlaceholder");
      if (placeholderIndex >= 0) {
        supaImageUrlList.splice(placeholderIndex, 1);
      }
      for (let i = 0; i < difference.length; i++) {
        if (!defaultImages.includes(difference[i])) {
          continue;
        }
        console.log(difference[i]);

        // TODO: Fix resource not found error
        const { error } = await supabase.storage
          .from("projects")
          .copy(`${id}/live/${difference[i]}`, `${id}/draft/${difference[i]}`);
        if (error) {
          throw Error(error.message);
        }
      }
    }

    // Now check if there are extra images leftover that shouldn't be stored
    const { data: supaImageList2 } = await supabase.storage.from("projects").list(`${id}/draft`, {
      limit: 20,
      offset: 0,
      sortBy: { column: "name", order: "asc" }, // already sorted
    });
    const supaImageUrlList2 = supaImageList2.map((fileObject: FileObject) => fileObject.name);
    const difference2 = supaImageUrlList2.filter(
      (imageUrl) => !dataImageUrlsList.includes(imageUrl)
    );
    const imagesToPurge = difference2.map((imageUrl: string) => `${id}/draft/${imageUrl}`);
    console.log("images to purge:", imagesToPurge);
    if (imagesToPurge.length > 0) {
      const { error } = await supabase.storage.from("projects").remove(imagesToPurge);
      if (error) {
        throw Error(error.message);
      }
    }

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

        // Images should NEVER be added to /live/ without approval from admins
        // TODO: This currently saves the compressed WEBP file as JPG. Fix this.
        const { error } = await supabase.storage
          .from("projects")
          .upload(
            `${id}/draft/${compressedFile.name.toLowerCase().replaceAll(" ", "_")}`,
            compressedWebp,
            {
              cacheControl: "0",
              upsert: true,
              contentType: compressedWebp.type,
            }
          );
        if (error) {
          throw Error(error.message);
        }
      } catch (error) {
        throw Error(error);
      }
    }

    // TODO: Deleting an image still makes the needApproval true. We need to check if an image deletion was done.
    const imageUrls: string[] = imageUrlsToDelete.map(
      (imageUrl) =>
        `${id}/${data.isDraft || data.needApproval ? "draft" : "live"}/${imageUrl.split("/").pop()}`
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
    queryClient.invalidateQueries(["project"]);
    queryClient.invalidateQueries(["projectImages"]);
    // queryClient.removeQueries({
    //   queryKey: ["project", "projectImages"],
    //   exact: true,
    // });
    return response;
  });
}
