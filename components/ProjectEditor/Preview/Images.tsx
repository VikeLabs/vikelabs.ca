import { Image } from "@chakra-ui/react";
import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { ImageInfo } from "../../../types";

const Images = ({ value }: { value: ImageInfo[] }) => {
  return (
    <ScrollContainer className="list mt-2 mb-1 flex overflow-auto" hideScrollbars={false}>
      {value.map((image: ImageInfo, index: number) => (
        <div
          key={index}
          className="mr-2 flex-shrink-0 overflow-hidden rounded bg-placeholder-light dark:bg-placeholder-dark"
        >
          <Image
            loading="eager"
            src={image.url}
            alt={image.name}
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
