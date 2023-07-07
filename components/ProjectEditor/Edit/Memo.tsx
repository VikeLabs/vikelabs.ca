import { Input } from "@chakra-ui/react";
import React from "react";

const Memo = ({ value, onChange }: { value: string; onChange: () => void }) => (
  <Input type="text" value={value} onChange={onChange} minWidth={300} />
);

export default Memo;
