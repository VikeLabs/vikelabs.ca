import { ProjectInfo } from "@prisma/client";
import { FormState, UseFormGetValues } from "react-hook-form";
import { RestrictedField } from "../components/ApprovalNotice";
import { ProjectUpdateDataNoImages } from "../types";

const compare = (a, b) => {
  if (a.label < b.label) {
    return -1;
  }
  if (a.label > b.label) {
    return 1;
  }
  return 0;
};

// renaming here because the field isn't restricted for the Dirty checker.
export type FieldDirtyChecker = RestrictedField & { orderMatters?: boolean };

export const deepDirtyChecker = (
  fields: FieldDirtyChecker[],
  formState: FormState<any>,
  getValues: UseFormGetValues<any>
) => {
  const fieldsDirty: string[] = [];
  for (const field of fields) {
    const defaultVal = [].concat(formState.defaultValues?.[field.controlName]);
    const currentVal = [].concat(getValues()?.[field.controlName]);
    if (field.deepCheck) {
      if (Array.isArray(defaultVal) && Array.isArray(currentVal)) {
        if (field.orderMatters) {
          // console.log(field.controlName, JSON.stringify(defaultVal) !== JSON.stringify(currentVal));
          if (JSON.stringify(defaultVal) !== JSON.stringify(currentVal)) {
            fieldsDirty.push(field.label);
          }
        }
        if (JSON.stringify(defaultVal.sort(compare)) !== JSON.stringify(currentVal.sort(compare))) {
          fieldsDirty.push(field.label);
        }
      } else if (typeof formState.defaultValues?.[field.controlName] === "string") {
        if (defaultVal !== currentVal) {
          fieldsDirty.push(field.label);
        }
      } else {
        console.error(
          `UNHANDLED FIELD TYPE '${typeof formState.defaultValues?.[
            field.controlName
          ]}' for controlName '${field.controlName}'`
        );
      }
    } else if (formState.dirtyFields?.[field.controlName]) {
      fieldsDirty.push(field.label);
    }
  }
  return fieldsDirty;
};

export const deepDirtyCheckerServerside = (
  fields: Omit<FieldDirtyChecker, "label">[],
  originalValues: ProjectInfo,
  currentValues: Omit<ProjectUpdateDataNoImages, "id">
) => {
  const fieldsDirty: string[] = [];
  for (const field of fields) {
    const defaultVal = [].concat(originalValues?.[field.controlName]);
    const currentVal = [].concat(currentValues?.[field.controlName]);
    if (field.deepCheck) {
      if (Array.isArray(defaultVal) && Array.isArray(currentVal)) {
        if (field.orderMatters) {
          // console.log(field.controlName, JSON.stringify(defaultVal) !== JSON.stringify(currentVal));
          if (JSON.stringify(defaultVal) !== JSON.stringify(currentVal)) {
            fieldsDirty.push(field.controlName);
          }
        }
        if (JSON.stringify(defaultVal.sort(compare)) !== JSON.stringify(currentVal.sort(compare))) {
          fieldsDirty.push(field.controlName);
        }
      } else if (typeof originalValues?.[field.controlName] === "string") {
        if (defaultVal !== currentVal) {
          fieldsDirty.push(field.controlName);
        }
      } else {
        console.error(
          `UNHANDLED FIELD TYPE '${typeof originalValues?.[field.controlName]}' for controlName '${
            field.controlName
          }'`
        );
      }
    } else if (originalValues?.[field.controlName] !== currentValues?.[field.controlName]) {
      fieldsDirty.push(field.controlName);
    }
  }
  return fieldsDirty;
};
