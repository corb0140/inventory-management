import React from "react";

type FormInputProps = {
  label: string;
  htmlFor: string;
  type: string;
  name: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

const FormInput = ({
  label,
  htmlFor,
  type,
  name,
  placeholder,
  value,
  onChange,
  required = false,
}: FormInputProps) => {
  const labelCssStyles = "block text-gray-700 text-sm font-medium";
  const inputCssStyles =
    "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

  return (
    <div>
      <label htmlFor={htmlFor} className={labelCssStyles}>
        {label}
      </label>

      <input
        name={name}
        onChange={onChange}
        value={value}
        className={inputCssStyles}
        required={required}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
