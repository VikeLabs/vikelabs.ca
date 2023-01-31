import { Switch } from "@chakra-ui/react";
import React from "react";

const Recruiting = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
  <Switch ml="2" size="lg" isChecked={value} onChange={onChange} />
);

export default Recruiting;
