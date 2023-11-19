"use client";

import { useRouter } from "next/navigation";

export default function Button({
  text,
  to,
  type,
  submit,
}: {
  text: string;
  to?: string | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  submit?: () => void;
}) {
  const router = useRouter();

  const handleClick = () => {
    if (to) {
      router.push(to!);
    }
    if (submit) {
      submit();
    }
  };

  return (
    <button
      type={type ? type : undefined}
      onClick={to ? handleClick : undefined}
      className="px-4 py-2 text-xs font-bold text-white uppercase transition-all duration-150 bg-teal-500 rounded shadow outline-none active:bg-teal-600 hover:shadow-md focus:outline-none ease"
    >
      {text}
    </button>
  );
}
