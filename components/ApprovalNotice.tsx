import React, { ReactElement, ReactNode } from "react";
import { FormState } from "react-hook-form";

export type RestrictedField = {
  label: string;
  controlName: string;
};

const formatList = (elements: ReactElement[]): ReactNode =>
  elements.map((element, i) => (
    <React.Fragment key={element.key}>
      {i === 0 ? null : i === elements.length - 1 ? " and " : ", "}
      {element}
    </React.Fragment>
  ));

const ApprovalNotice = ({
  isEditing,
  fieldNames,
  formState,
  onEdit,
  onCancel,
  onSubmit,
}: {
  isEditing: boolean;
  fieldNames: RestrictedField[];
  formState: FormState<any>;
  onEdit: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}) => {
  const fieldsThatRequireApproval = [];
  for (const fieldName of fieldNames) {
    if (formState.dirtyFields?.[fieldName.controlName]) {
      fieldsThatRequireApproval.push(
        <strong key={fieldName.controlName}>{fieldName.label}</strong>
      );
    }
  }

  switch (isEditing) {
    case true:
      return (
        <>
          {fieldsThatRequireApproval.length !== 0 && (
            <div>
              Since you edited {formatList(fieldsThatRequireApproval)}, your changes must be
              approved before they can go public.
            </div>
          )}
          <button className="p-4 bg-red-400" onClick={onCancel}>
            Cancel Editing
          </button>
          <button className="p-4 bg-green-400" onClick={onSubmit}>
            {fieldsThatRequireApproval.length !== 0 ? "Submit for Approval" : "Save Changes"}
          </button>
        </>
      );
    case false:
      return (
        <button className="p-4 bg-orange-400" onClick={onEdit}>
          Edit Profile
        </button>
      );
  }
};

export default ApprovalNotice;
