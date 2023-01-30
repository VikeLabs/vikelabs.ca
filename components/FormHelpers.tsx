import { Control, Controller } from "react-hook-form";
import { UserEditorForm } from "../types";

export const Label = ({ text }: { text: string }) => (
  <label className="block mb-1 font-semibold">{text}</label>
);

export const Editable = ({
  label,
  controlName,
  control,
  isEditing,
  placeholder,
}: {
  label: string;
  controlName: keyof UserEditorForm;
  control: Control<UserEditorForm, any>;
  isEditing: boolean;
  placeholder?: string;
}) => (
  <div>
    <Label text={label} />
    <Controller
      control={control}
      name={controlName}
      render={({ field: { onChange, value } }) => (
        <input
          className="block w-full py-2 px-3 rounded-md border-solid border-black border-2 disabled:p-0 disabled:border-none"
          onChange={onChange}
          value={value}
          disabled={!isEditing}
          placeholder={placeholder}
        />
      )}
    />
  </div>
);
