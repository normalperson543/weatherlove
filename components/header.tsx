"use client";
import { jetbrainsMono } from "@/lib/fonts";
import SearchBar from "./search-bar";
import { HistoryIcon, SettingsIcon } from "lucide-react";
import { useState } from "react";
import { searchHistory } from "@/lib/storage";
import SearchBarResults from "./search-bar-results";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { WeatherLocationResult } from "@/lib/types";
import { saveSearchHistory } from "@/lib/storage";
import SettingsMenu from "./settings-menu";
import Link from "next/link";

export default function Header() {
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const history = searchHistory() as WeatherLocationResult[];

  function handleSelectResult(result: WeatherLocationResult) {
    const params = new URLSearchParams(searchParams);
    params.set("lat", result.lat.toString());
    params.set("lon", result.lon.toString());
    replace(`${pathname}?${params.toString()}`);
    setShowHistory(false);
    const hist = searchHistory() as WeatherLocationResult[];
    const possibleHistIndex = hist.findIndex(
      (histItem) => histItem.lat === result.lat && histItem.lon === result.lon,
    );
    if (possibleHistIndex > -1) {
      hist.splice(possibleHistIndex, 1);
    }
    hist.push(result);
    if (hist.length > 5) hist.splice(0, 1);
    saveSearchHistory(hist);
  }

  return (
    <div
      className={`${jetbrainsMono.className} flex flex-row gap-2 p-1 bg-gray-100 dark:bg-gray-900 text-black dark:text-gray-200 h-8 items-center`}
    >
      <div className="flex-1 flex flex-row gap-2 items-center">
        <Link href="/"><b>Weather❤️</b></Link>
        <SearchBar onSelect={handleSelectResult} />
      </div>
      <div className="flex flex-row gap-2 justify-end">
        <div>
          <button
            className="flex flex-row gap-1 items-center"
            onClick={() => setShowSettings(!showSettings)}
          >
            <SettingsIcon width={16} height={16} />
            settings
          </button>
          {showSettings && (
            <div className="right-72 fixed">
              <SettingsMenu />
            </div>
          )}
        </div>
        <div>
          <button
            className="flex flex-row gap-1 items-center"
            onClick={() => setShowHistory(!showHistory)}
          >
            <HistoryIcon width={16} height={16} />
            history
          </button>
          {showHistory && (
            <div className="right-72 fixed">
              <SearchBarResults
                searchResults={history}
                onSelect={handleSelectResult}
                displayPlaceholder={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
