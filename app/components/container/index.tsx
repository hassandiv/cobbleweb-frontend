export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-96 max-w-full">{children}</div>;
}
