import { Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { ImageInfo } from "../../../types";

const Images = ({ value }: { value: ImageInfo[] }) => {
  const [imagePreviewInfo, setImagePreviewInfo] = useState<ImageInfo[]>([]);

  useEffect(() => {
    if (value.length === 0) {
      setImagePreviewInfo([]);
      return;
    }

    // create the previews
    const mappedImagePreviewInfo: ImageInfo[] = value.map((image: ImageInfo) => ({
      label: image.label,
      file: image.file,
      url: image.url ?? URL.createObjectURL(image.file),
      isPending: image.url ? false : true,
    }));
    setImagePreviewInfo(mappedImagePreviewInfo);

    // free memory when ever this component is unmounted
    return () => {
      for (const mappedImagePreviewInfoItem of mappedImagePreviewInfo) {
        if (mappedImagePreviewInfoItem.isPending) {
          URL.revokeObjectURL(mappedImagePreviewInfoItem.url);
        }
      }
    };
  }, [value]);

  return (
    <ScrollContainer className="list mt-2 mb-1 flex overflow-auto" hideScrollbars={false}>
      {imagePreviewInfo.map((image: ImageInfo, index: number) => (
        <div
          key={index}
          className="mr-2 flex-shrink-0 overflow-hidden rounded bg-placeholder-light dark:bg-placeholder-dark"
        >
          <Image
            loading="eager"
            src={image.url}
            alt={image.label}
            height={0}
            width={0}
            style={{ width: "auto", height: "400px" }}
          />
        </div>
      ))}
    </ScrollContainer>
  );
};

export default Images;
