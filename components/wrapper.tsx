"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
export default function LayoutWrapper({
  children,
}: {
  children?: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // lol, next.js docs say to do this
  }, []);

  let dark = false;
  if (isClient) {
    dark =
      Number(searchParams.get("cs")) === 2 ||
      (Number(searchParams.get("cs")) === 0 &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
  } else {
    dark = false;
  }
  return (
    <div
      className={`${
        dark ? "dark" : ""
      } flex flex-col w-full h-full bg-white dark:bg-black text-black dark:text-gray-200`}
      style={{
        colorScheme: dark ? "dark" : "light",
      }}
    >
      {children}
    </div>
  );
}
