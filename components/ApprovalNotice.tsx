import React from "react";
import { FormState } from "react-hook-form";

export type RestrictedField = {
  label: string;
  controlName: string;
};

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
  let fieldNamesHtml = "";
  for (const fieldName of fieldNames) {
    if (formState.dirtyFields?.[fieldName.controlName]) {
      fieldsThatRequireApproval.push(`<strong>${fieldName.label}</strong>`);
    }
  }
  if (fieldsThatRequireApproval.length > 1) {
    const fieldNameLast = fieldsThatRequireApproval.pop();
    if (fieldsThatRequireApproval.length > 0) {
      fieldNamesHtml += fieldsThatRequireApproval.join(", </span>");
    }
    fieldNamesHtml += " and " + fieldNameLast;
  } else if (fieldsThatRequireApproval.length === 1) {
    fieldNamesHtml += `<strong>${fieldsThatRequireApproval[0]}</strong>`;
  }

  switch (isEditing) {
    case true:
      return (
        <>
          {fieldNamesHtml.length !== 0 && (
            <div>
              Since you edited <span dangerouslySetInnerHTML={{ __html: fieldNamesHtml }} />, your
              changes must be approved before they can go public.
            </div>
          )}
          <button className="p-4 bg-red-400" onClick={onCancel}>
            Cancel Editing
          </button>
          <button className="p-4 bg-green-400" onClick={onSubmit}>
            {fieldNamesHtml.length !== 0 ? "Submit for Approval" : "Save Changes"}
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
