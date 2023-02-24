import { Input } from "@chakra-ui/react";
import React from "react";

const Title = ({ value, onChange }: { value: string; onChange: () => void }) => (
  <Input type="title" value={value} onChange={onChange} minWidth={300} />
);

export default Title;
