import { Input } from "@chakra-ui/react";
import React from "react";

export const Title = ({ value, onChange }: { value: string; onChange: () => void }) => (
  <Input type="title" value={value} onChange={onChange} minWidth={300} />
);
