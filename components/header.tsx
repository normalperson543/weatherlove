"use client";
import { jetbrainsMono } from "@/lib/fonts";
import SearchBar from "./search-bar";
import { HistoryIcon } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [showHistory, setShowHistory] = useState(false)
  return (
    <div
      className={`${jetbrainsMono.className} flex flex-row gap-2 p-1 bg-gray-100 h-8 items-center`}
    >
      <div className="flex-1 flex flex-row gap-2 items-center">
        <b>Weather❤️</b>
        <SearchBar />
      </div>
      <div className="flex flex-row gap-2 justify-right">
        <button className="flex flex-row gap-1 items-center">
          <HistoryIcon width={16} height={16} onClick={() => setShowHistory(!showHistory)}/>
          history
        </button>
      </div>
    </div>
  );
}
