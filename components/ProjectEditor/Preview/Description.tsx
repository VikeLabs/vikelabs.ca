import { sanitize } from "dompurify";
import React from "react";

const Description = ({ value }: { value: string }) => (
  <div dangerouslySetInnerHTML={{ __html: sanitize(value) }} />
);

export default Description;
