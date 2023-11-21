import Image from "next/image";

export default function About() {
  return (
    <>
      <div className="mb-5 text-2xl">About</div>
      <Image src="/8287758.jpg" alt="about page" width={1300} height={1300} />
    </>
  );
}
