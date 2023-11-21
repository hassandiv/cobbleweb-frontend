import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="mb-5 text-2xl">Home</div>
      <Image src="/3184468.jpg" alt="home page" width={1300} height={1300} />
    </>
  );
}
