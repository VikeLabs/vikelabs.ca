import React from "react";

const Processing = ({
  imagesAddedCount,
  imagesToAddCount,
}: {
  imagesAddedCount: number;
  imagesToAddCount: number;
}) => {
  return (
    <div>
      Processing {imagesAddedCount}/{imagesToAddCount} - should show something while sending backend
      request
    </div>
  );
};

export default Processing;
