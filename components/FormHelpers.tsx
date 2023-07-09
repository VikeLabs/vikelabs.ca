import { Control, Controller } from "react-hook-form";

export const Label = ({ text }: { text: string }) => (
  <label className="block mb-1 font-semibold">{text}</label>
);

export const Editable = ({
  label,
  controlName,
  control,
  rules,
  isEditing,
  placeholder,
}: {
  label: string;
  controlName: string;
  control: Control<any, any>;
  rules?: any;
  isEditing: boolean;
  placeholder?: string;
}) => (
  <div>
    <Label text={label} />
    <Controller
      control={control}
      name={controlName}
      rules={rules}
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
