'use client'
import { jetbrainsMono } from "@/lib/fonts"
import SearchBar from "./search-bar"

export default function Header() {
  return (
    <div className={`${jetbrainsMono.className} flex flex-row gap-2 p-1 bg-gray-100 h-8 items-center`}>
      <b>Weather❤️</b>
      <SearchBar />
    </div>
  )
}