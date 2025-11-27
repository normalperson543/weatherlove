"use client";

import { SearchIcon } from "lucide-react";
import { useState } from "react";
import SearchBarResults from "./search-bar-results";
import { useDebouncedCallback } from "use-debounce";
import { searchLocationsByName } from "@/lib/data";
import { WeatherLocationResult } from "@/lib/types";
export default function SearchBar({ onSelect }: {onSelect: (result: WeatherLocationResult) => void}) {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<WeatherLocationResult[]>()
  const debounceSearch = useDebouncedCallback(async () => {
    setSearchResults(await searchLocationsByName(searchText))
  }, 2000)
  function handleChangeSearchText(newSearchText: string) {
    setSearchText(newSearchText)
    debounceSearch()
  }
  
  function handleSelectResult(result: WeatherLocationResult) {
    setSearchResults([])
    onSelect(result)
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
