import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h2 className="text-2xl my-5">Page Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className="underline">
        Return Home
      </Link>
    </div>
  );
}
