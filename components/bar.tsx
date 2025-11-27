'use client'
export default function Bar({ percentage, height = 24 }: {percentage: number, height?: number}) {
  return (
    <div
      className={`w-1 h-${height} flex-none`}
      style={{
        background: `linear-gradient(to bottom, #000 ${percentage}%, #999 ${percentage}%)`,
      }}
    ></div>
  )
}