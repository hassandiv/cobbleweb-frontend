export default function Input({
  label,
  type,
  name,
  value,
  placeholder,
  required,
  onChange,
}: {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <label htmlFor={label}>
        {label} {required && "*"}
      </label>
      <input
        type={type}
        name={name}
        id={label}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="border border-teal-600 rounded p-1 mt-1 outline-none"
      />
    </>
  );
}
