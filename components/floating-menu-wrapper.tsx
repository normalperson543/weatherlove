'use client'

export default function FloatingMenuWrapper({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="fixed z-10 flex flex-col bg-gray-100 w-72 top-8">
      {children}
    </div>
  );
}
