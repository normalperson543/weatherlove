"use client";

import { SearchIcon } from "lucide-react";
import { useState } from "react";
import SearchBarResults from "./search-bar-results";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { searchLocationsByName } from "@/lib/data";
import { WeatherLocationResult } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "next/navigation";
import { saveSearchHistory, searchHistory } from "@/lib/storage";
export default function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<WeatherLocationResult[]>()
  const debounceSearch = useDebouncedCallback(async () => {
    setSearchResults(await searchLocationsByName(searchText))
  }, 2000)
  function handleChangeSearchText(newSearchText: string) {
    setSearchText(newSearchText)
    debounceSearch()
  }
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const { replace } = useRouter();
  function handleSelectResult(result: WeatherLocationResult) {
    console.log("propagated correctly")
    const params = new URLSearchParams(searchParams);
    params.set("lat", result.lat.toString())
    params.set("lon", result.lon.toString())
    replace(`${pathname}?${params.toString()}`);
    setSearchResults([])
    const hist = searchHistory()
    hist.push(result)
    if (hist.length > 5) hist.splice(0, 1)
    saveSearchHistory(hist)
  }
  return (
    <div>
      <div className="flex flex-row gap-2 items-center">
        <SearchIcon width={16} height={16} />
        <input
          type="text"
          value={searchText}
          onChange={(e) => handleChangeSearchText(e.target.value)}
          placeholder="Search for a city"
        />
      </div>
      <SearchBarResults searchResults={searchResults} onSelect={handleSelectResult} />
    </div>
  );
}
