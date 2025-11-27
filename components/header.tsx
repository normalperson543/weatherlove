"use client";
import { jetbrainsMono } from "@/lib/fonts";
import SearchBar from "./search-bar";
import { HistoryIcon } from "lucide-react";
import { useState } from "react";
import { searchHistory } from "@/lib/storage";
import SearchBarResults from "./search-bar-results";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { WeatherLocationResult } from "@/lib/types";
import { saveSearchHistory } from "@/lib/storage";

export default function Header() {
  const [showHistory, setShowHistory] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const history = searchHistory();

  function handleSelectResult(result: WeatherLocationResult) {
    const params = new URLSearchParams(searchParams);
    params.set("lat", result.lat.toString());
    params.set("lon", result.lon.toString());
    replace(`${pathname}?${params.toString()}`);
    const hist = searchHistory();
    hist.push(result);
    if (hist.length > 5) hist.splice(0, 1);
    saveSearchHistory(hist);
    setShowHistory(false);
  }

  return (
    <div
      className={`${jetbrainsMono.className} flex flex-row gap-2 p-1 bg-gray-100 h-8 items-center`}
    >
      <div className="flex-1 flex flex-row gap-2 items-center">
        <b>Weather❤️</b>
        <SearchBar onSelect={handleSelectResult} />
      </div>
      <div className="flex flex-row gap-2 justify-right">
        <button className="flex flex-row gap-1 items-center">
          <HistoryIcon
            width={16}
            height={16}
            onClick={() => setShowHistory(!showHistory)}
          />
          history
        </button>
        {showHistory && (
          <SearchBarResults
            searchResults={history}
            onSelect={handleSelectResult}
          />
        )}
      </div>
    </div>
  );
}
