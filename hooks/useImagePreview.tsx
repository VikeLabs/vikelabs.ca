import { useQuery } from "@tanstack/react-query";
import { config } from "../config/config";
import { ImageInfo } from "../types";

export function useImagePreviews(value: (string | File)[], id: number) {
  return useQuery<ImageInfo[]>({
    queryKey: [value, id, "projectImages"],
    queryFn: async () => {
      if (value.length === 0) {
        return [];
      }
      // create the previews
      const mappedImagePreview: ImageInfo[] = value.map((image: string | File) => ({
        file: typeof image === "string" ? undefined : image,
        url:
          typeof image === "string"
            ? `${config.buckets.projects}/${id}/${image}`
            : URL.createObjectURL(image),
        name: typeof image === "string" ? image : image.name?.toLowerCase()?.replaceAll(" ", "_"),
      }));
      return mappedImagePreview;
    },
    retry: 3,
  });
}
