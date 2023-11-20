export default function Input({
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <label htmlFor={label}>{label}:</label>
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
