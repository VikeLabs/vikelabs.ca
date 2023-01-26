import React from "react";

const InfoHeader = ({ heading, children }: { heading: string; children?: React.ReactNode }) => {
  return (
    <div>
      <h2>{heading}</h2>
      <p className="pb-4">{children}</p>
    </div>
  );
};

export default InfoHeader;
