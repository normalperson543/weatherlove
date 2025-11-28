"use client";

import { Settings, WeatherData, WeatherForecastData } from "@/lib/types";
import { jetbrainsMono } from "@/lib/fonts";
import {
  ArrowUpIcon,
  CloudRainIcon,
  CloudyIcon,
  EyeIcon,
  SunriseIcon,
  SunsetIcon,
  WavesIcon,
  WindIcon,
} from "lucide-react";
import WeatherIcon from "./weather-icon";
import MiniWeatherTile from "./mini-weather-tile";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { getWeatherData, getForecast } from "@/lib/data";
import { useState, useEffect } from "react";
import Bar from "./bar";
import { settings } from "@/lib/storage";
import { MM_TO_IN, M_TO_MI } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
export default function AppUI() {
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>();
  const [forecast, setForecast] = useState<WeatherForecastData | undefined>();
  const searchParams = useSearchParams();
  const se = settings() as Settings;
  const { replace } = useRouter();
  const pathname = usePathname();

  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const units = searchParams.get("units");
  
  async function fetchWeather() {
    if (searchParams && lat && lon) {
      const wd = await getWeatherData(
        Number(lat),
        Number(lon),
        Number(units),
      );
      setWeatherData(wd);
      const wf = await getForecast(
        Number(lat),
        Number(lon),
        Number(units),
      );
      setForecast(wf);
    } else {
      setWeatherData(undefined);
      setForecast(undefined);
    }
  }

  useEffect(() => {
    (async () => {
      fetchWeather();
    })();
  }, [lat, lon, units]); // eslint-disable-line react-hooks/exhaustive-deps
  // I'll figure something out about that.

  useEffect(() => {
    if (searchParams.get("units") !== se.units.toString()) {
      const sp = new URLSearchParams(searchParams);
      sp.set("units", se.units.toString());
      replace(`${pathname}?${sp.toString()}`);
    }
  });
  useEffect(() => {
    if (searchParams.get("cs") !== se.colorScheme.toString()) {
      const sp = new URLSearchParams(searchParams);
      sp.set("cs", se.colorScheme.toString());
      replace(`${pathname}?${sp.toString()}`);
    }
  });
  if (!weatherData || !forecast) {
    return (
      <div className="flex flex-col w-full h-full items-center justify-center">
        <div
          className={`${jetbrainsMono.className} max-w-120 h-full flex flex-col items-center justify-center gap-8 -p-8`}
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Weatherlove</h2>
            <p>A minimal weather app based on OpenWeatherMap.</p>
            <p>Start typing a location to see the weather.</p>
            <Link
              href="https://github.com/normalperson543/weatherlove"
              target="_blank"
            >
              <button className="flex flex-row gap-2 items-center text-gray-600 dark:text-gray-300">
                <Image
                  src="/assets/github-mark.svg"
                  width={16}
                  height={16}
                  alt="GitHub icon"
                  className="text-gray-600 dark:text-gray-300"
                />
                github repository
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  const tempPercent =
    ((weatherData.main.temp - weatherData.main.temp_min) /
      (weatherData.main.temp_max - weatherData.main.temp_min)) *
    100;

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div
        className={`${jetbrainsMono.className} max-w-120 h-full flex flex-col justify-center gap-8 -p-8`}
      >
        <div className="flex flex-row gap-6 items-center">
          <div className="p-12 bg-gray-100 dark:bg-gray-900 rounded-sm">
            <WeatherIcon
              width={96}
              height={96}
              id={weatherData.weather[0].id}
            />
          </div>
          <div className="flex flex-col gap-3 justify-start">
            <p>
              Weather in <b>{weatherData.name}</b>
            </p>
            <div className="flex flex-row items-center gap-2 w-full h-full">
              <Bar percentage={tempPercent} />
              <div className="flex flex-row items-start">
                <p className="text-8xl font-bold">
                  {Math.floor(weatherData.main.temp)}
                </p>
                <p className="text-3xl">°{se.units === 0 ? "C" : "F"}</p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-bold text-2xl">
                {weatherData.weather[0].main}
              </p>
              <p>{weatherData.weather[0].description}</p>
            </div>
            <div className="flex flex-row gap-2">
              <b>Lo: </b>
              <p>
                {Math.floor(weatherData.main.temp_min)} °
                {se.units === 0 ? "C" : "F"}
              </p>
              <div className="w-0.5 h-full bg-gray-600"></div>
              <b>Hi: </b>
              <p>
                {Math.floor(weatherData.main.temp_max)} °
                {se.units === 0 ? "C" : "F"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-8 items-start justify-center">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center">
              <WindIcon width={16} height={16} />
              <p className="font-bold tracking-wide">Wind</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <p className="text-6xl font-bold tracking-tighter">
                {weatherData.wind.speed}
              </p>
              <div className="flex flex-col spacing-between h-full">
                <ArrowUpIcon
                  width={16}
                  height={16}
                  style={{ rotate: `${weatherData.wind.deg}deg` }}
                />
                <p className="text-lg">{se?.units === 0 ? "m/s" : "mph"}</p>
              </div>
            </div>
            {weatherData.wind.gust && (
              <p>
                <b>Gust</b> {weatherData.wind.gust}{" "}
                {se?.units === 0 ? "m/s" : "mph"}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center">
              <CloudRainIcon width={16} height={16} />
              <p className="font-bold tracking-wide">Precipitation</p>
            </div>
            <div className="flex flex-row gap-2 items-end">
              <p className="text-6xl font-bold tracking-tighter">
                {weatherData.rain
                  ? se.units === 0
                    ? weatherData.rain["1h"]
                    : Math.round(weatherData.rain["1h"] * MM_TO_IN * 100) / 100
                  : "0"}
              </p>
              <p className="text-lg">{se.units === 0 ? "mm/h" : "in/h"}</p>
            </div>
            <p>in the last hour</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center">
              <WavesIcon width={16} height={16} />
              <p className="font-bold tracking-wide">Humidity</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Bar percentage={weatherData.main.humidity} height={48} />
              <div className="flex flex-row gap-2 items-end">
                <p className="text-6xl font-bold tracking-tighter">
                  {weatherData.main.humidity}
                </p>
                <p className="text-lg">%</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center">
              <EyeIcon width={16} height={16} />
              <p className="font-bold tracking-wide">Visibility</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Bar percentage={weatherData.visibility / 100} height={48} />
              <div className="flex flex-row gap-2 items-end">
                <p className="text-6xl font-bold tracking-tighter">
                  {se.units === 0 && weatherData.visibility / 1000}
                  {se.units === 1 &&
                    Math.round(weatherData.visibility * M_TO_MI * 100) / 100}
                </p>
                <p className="text-lg">{se.units === 0 ? "km" : "mi"}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center">
              <CloudyIcon width={16} height={16} />
              <p className="font-bold tracking-wide">Cloud cover</p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Bar percentage={weatherData.clouds.all} height={48} />
              <div className="flex flex-row gap-2 items-end">
                <p className="text-6xl font-bold tracking-tighter">
                  {weatherData.clouds.all}
                </p>
                <p className="text-lg">%</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center gap-4">
          <div className="flex flex-row gap-2 items-center">
            <SunriseIcon width={16} height={16} />
            <b>Sunrise</b>
            <p>
              {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <SunsetIcon width={16} height={16} />
            <b>Sunset</b>
            <p>
              {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-2xl">Next 5 days</h2>
          <div className="flex flex-row overflow-x-auto gap-8">
            {forecast.list.map((data) => (
              <MiniWeatherTile weatherData={data} key={data.dt} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
