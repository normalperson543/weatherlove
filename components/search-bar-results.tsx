"use client";

import { WeatherLocationResult } from "@/lib/types";

export default function SearchBarResults({
  searchResults,
  onSelect,
}: {
  searchResults?: WeatherLocationResult[];
  onSelect: (lat: number, lon: number) => void;
}) {

  return (
    <div className="fixed z-10 flex flex-col bg-gray-100 w-72 top-8">
      {searchResults.map((res) => (
        <button className="w-full" key={res.lat} onClick={() => onSelect(res.lat, res.lon)}>{res.name}</button>
      ))}
    </div>
  );
}
