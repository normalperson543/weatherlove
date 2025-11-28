"use client";
export default function Bar({
  percentage,
  height = 96,
}: {
  percentage: number;
  height?: number;
}) {
  return (
    <div
      className={`w-1 flex-none`}
      style={{
        background: `linear-gradient(to bottom, light-dark(#000, #ddd) ${percentage}%, light-dark(#999, #777) ${percentage}%)`,
        height: `${height}px`,
      }}
    ></div>
  );
}
