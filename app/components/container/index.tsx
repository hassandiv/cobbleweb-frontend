export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-full" style={{ width: "820px" }}>
      {children}
    </div>
  );
}
