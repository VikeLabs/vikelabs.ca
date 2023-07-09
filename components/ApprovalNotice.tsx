import { Box, Button, HStack, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { FormState, UseFormGetValues } from "react-hook-form";
import { deepDirtyChecker, FieldDirtyChecker } from "../utils/needApproval";

export type RestrictedField = {
  label: string;
  controlName: string;
  deepCheck?: boolean;
};

const formatList = (elements: string[]): ReactNode =>
  elements.map((element, i) => (
    <span key={i}>
      {i === 0 ? null : i === elements.length - 1 ? " and " : ", "}
      <b>{element}</b>
    </span>
  ));

const ApprovalNotice = ({
  isEditing,
  disabled = false,
  onEdit,
  onCancel,
  onSubmit,
}: {
  isEditing: boolean;
  disabled?: boolean;
  onEdit?: () => void;
  onCancel?: () => void;
  onSubmit: () => void;
}) => {
  // const fieldsThatRequireApproval = deepDirtyChecker(fieldNames, formState, getValues);

  switch (isEditing) {
    case true:
      return (
        <Box>
          <Text>Your changes must be approved before they can go public.</Text>
          {onCancel && (
            <button className="p-4 bg-red-400" onClick={onCancel}>
              Cancel Editing (Move this to side buttons)
            </button>
          )}
          <HStack pt="3" spacing="3">
            {/* <Button>Save Draft</Button> */}
            <Button colorScheme="teal" onClick={onSubmit} isDisabled={disabled}>
              Submit for Approval
            </Button>
          </HStack>
        </Box>
      );
    case false:
      return (
        <Box pt="3">
          <Button className="p-4 bg-orange-400" onClick={onEdit}>
            Edit Profile (Move this to side buttons)
          </Button>
        </Box>
      );
  }
};

export default ApprovalNotice;
