"use client";

import { WeatherLocationResult } from "@/lib/types";
import FloatingMenuWrapper from "./floating-menu-wrapper";

export default function SearchBarResults({
  searchResults,
  onSelect,
  displayPlaceholder = false
}: {
  searchResults?: WeatherLocationResult[];
  onSelect: (result: WeatherLocationResult) => void;
  displayPlaceholder?: boolean
}) {
  return (
    <FloatingMenuWrapper>
      {searchResults && searchResults.map((res) => (
        <button
          className="w-full text-left"
          key={res.lat}
          onClick={() => onSelect(res)}
        >
          <b>{res.name}</b> ({res.state}, {res.country})
        </button>
      ))}
      {((!searchResults || (searchResults && searchResults.length === 0)) && displayPlaceholder) && <p>No results</p> }
    </FloatingMenuWrapper>
  );
}
