"use client";

import { WeatherLocationResult } from "@/lib/types";
import FloatingMenuWrapper from "./floating-menu-wrapper";

export default function SearchBarResults({
  searchResults,
  onSelect,
}: {
  searchResults?: WeatherLocationResult[];
  onSelect: (result: WeatherLocationResult) => void;
}) {
  if (!searchResults) return;
  return (
    <FloatingMenuWrapper>
      {searchResults.map((res) => (
        <button
          className="w-full text-left"
          key={res.lat}
          onClick={() => onSelect(res.lat, res.lon)}
        >
          <b>{res.name}</b> ({res.state}, {res.country})
        </button>
      ))}
    </FloatingMenuWrapper>
  );
}
