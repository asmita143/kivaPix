// FieldItemTitle.tsx
type FieldItemTitleProps = {
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  isTextArea?: boolean;
  row?: number;
  type?: string;
  children: React.ReactNode;
};

const FieldItemTitle: React.FC<FieldItemTitleProps> = ({
  name,
  value,
  onChange,
  placeholder,
  isTextArea = false,
  row = 3,
  type = "text", // Default to "text" if no 'type' is passed
}) => {
  if (isTextArea) {
    return (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={row}
        className="block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 focus:outline-indigo-600 sm:text-sm"
      />
    );
  }

  return (
    <input
      type={type} // Now using the 'type' prop here
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="block w-full rounded-md bg-gray-200 px-3 py-1.5 text-base text-gray-900 focus:outline-indigo-600 sm:text-sm"
    />
  );
};

export default FieldItemTitle;
