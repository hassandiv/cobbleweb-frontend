export default function ImageInput({
  label,
  name,
  id,
  btnText,
  multiple,
  required,
  onChange,
}: {
  label: string;
  name: string;
  id: string;
  btnText: string;
  multiple?: boolean;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <label
        className="block mb-1 text-md text-gray-900 dark:text-black"
        htmlFor={id}
      >
        {label} {required && "*"}
      </label>
      <input
        type="file"
        name={name}
        id={id}
        onChange={onChange}
        className="absolute inset-0 w-32 opacity-0 cursor-pointer"
        multiple={multiple || false}
      />
      <div className="bg-blue-500 text-white text-sm text-center py-2 rounded-md shadow-md w-32">
        {btnText}
      </div>
    </>
  );
}
