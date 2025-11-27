"use client";

import { WeatherData } from "@/lib/types";
import WeatherIcon from "./weather-icon";
import { settings } from "@/lib/storage";
import { DropletIcon } from "lucide-react";

export default function MiniWeatherTile({
  weatherData,
}: {
  weatherData: WeatherData;
}) {
  const se = settings();
  const date = new Date(weatherData.dt * 1000).toLocaleDateString();
  const time = new Date(weatherData.dt * 1000).toLocaleTimeString();
  return (
    <div className="flex-none">
      <div className="flex flex-col gap-2 items-center w-16">
        <div className="flex flex-col items-center">
          <p className="text-gray-500">
            {date.split("/")[0]}/{date.split("/")[1]}
          </p>
          <p className="text-gray-500">
            {time.split(":")[0]} {time.split(" ")[1]}
          </p>
        </div>
        <WeatherIcon width={24} height={24} id={weatherData.weather[0].id} />
        <p>
          {Math.floor(weatherData.main.temp)}°{se.units === 0 ? "C" : "F"}
        </p>
        <div className="text-gray-500 flex flex-row gap-1 items-center">
          <DropletIcon width={16} height={16} />
          {weatherData.rain ? Math.floor(weatherData.rain["3h"]) : "0"}%
        </div>
      </div>
    </div>
  );
}
