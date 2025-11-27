"use client";

import { WeatherLocationResult } from "@/lib/types";

export default function SearchBarResults({
  searchResults,
  onSelect,
}: {
  searchResults?: WeatherLocationResult[];
  onSelect: (lat: number, lon: number) => void;
}) {
  if (!searchResults) return;
  return (
    <div className="fixed z-10 flex flex-col bg-gray-100 w-72 top-8">
      {searchResults.map((res) => (
        <button
          className="w-full text-left"
          key={res.lat}
          onClick={() => onSelect(res.lat, res.lon)}
        >
          <b>{res.name}</b> ({res.state}, {res.country})
        </button>
      ))}
    </div>
  );
}
