"use client";

import { WeatherData } from "@/lib/types";
import { jetbrainsMono } from "@/lib/fonts";
import { CloudDrizzleIcon, CloudFogIcon, CloudLightningIcon, CloudRainIcon, CloudSnowIcon, CloudSunIcon, CloudyIcon, SunIcon } from "lucide-react";

export default function AppUI({ weatherData }: { weatherData?: WeatherData }) {
  if (!weatherData) {
    return (
      <div>
        <p>No weather data!</p>
      </div>
    );
  }
  console.log(weatherData);
  return (
    <div
      className={`${jetbrainsMono.className} w-full h-full flex flex-col items-center justify-center`}
    >
      <div className="flex flex-row gap-6 items-center">
        <div className="p-12 bg-gray-100">
          {weatherData.weather[0].id.toString().substring(0, 1) === "2" &&
            <CloudLightningIcon width={96} height={96} />
          }
          {weatherData.weather[0].id.toString().substring(0, 1) === "3" &&
            <CloudDrizzleIcon width={96} height={96} />
          }
          {weatherData.weather[0].id.toString().substring(0, 1) === "5" &&
            <CloudRainIcon width={96} height={96} />
          }
          {weatherData.weather[0].id.toString().substring(0, 1) === "6" &&
            <CloudSnowIcon width={96} height={96} />
          }
          {weatherData.weather[0].id.toString().substring(0, 1) === "7" &&
            <CloudFogIcon width={96} height={96} />
          }
          {weatherData.weather[0].id === 800 &&
            <SunIcon width={96} height={96} />
          }
          {weatherData.weather[0].id >= 801 && weatherData.weather[0].id <= 803 &&
            <CloudSunIcon width={96} height={96} />
          }
          {weatherData.weather[0].id === 804 &&
            <CloudyIcon width={96} height={96} />
          }
        </div>
        <div className="flex flex-col gap-3 justify-start">
          <p>
            Weather in <b>{weatherData.name}</b>
          </p>
          <div className="flex flex-row items-start">
            <p className="text-8xl font-bold">
              {Math.floor(weatherData.main.temp - 273.15)}
            </p>
            <p className="text-3xl">°C</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold text-2xl">{weatherData.weather[0].main}</p>
          </div>
          <div className="flex flex-row gap-2">
            <b>Lo: </b>
            <p>{Math.floor(weatherData.main.temp_min - 273.15)} °C</p>
            <div className="w-0.5 h-full bg-gray-600"></div>
            <b>Hi: </b>
            <p>{Math.floor(weatherData.main.temp_max - 273.15)} °C</p>
          </div>
        </div>
      </div>
    </div>
  );
}
