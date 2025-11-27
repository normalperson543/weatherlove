"use client";

import { WeatherData, WeatherForecastData } from "@/lib/types";
import { jetbrainsMono } from "@/lib/fonts";
import {
  ArrowUpIcon,
  CloudRainIcon,
  CloudyIcon,
  EyeIcon,
  WavesIcon,
  WindIcon,
} from "lucide-react";
import Header from "./header";
import WeatherIcon from "./weather-icon";
import MiniWeatherTile from "./mini-weather-tile";
import { useSearchParams } from "next/navigation";
import { getWeatherData, getForecast } from "@/lib/data";
import { useState, useEffect } from "react";
import Bar from "./bar";

export default function AppUI() {
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>();
  const [forecast, setForecast] = useState<WeatherForecastData | undefined>();
  const searchParams = useSearchParams();

  async function fetchWeather() {
    if (searchParams && searchParams.get("lat") && searchParams.get("lon")) {
      const wd = await getWeatherData(
        Number(searchParams.get("lat")),
        Number(searchParams.get("lon")),
      );
      setWeatherData(wd);
      const wf = await getForecast(
        Number(searchParams.get("lat")),
        Number(searchParams.get("lon")),
      );
      setForecast(wf);
    }
  }

  useEffect(() => {
    (async () => {
      fetchWeather();
    })();
  }, [searchParams]);

  if (!weatherData || !forecast) {
    return (
      <div>
        <p>No weather data!</p>
      </div>
    );
  }
  console.log(weatherData);
  const tempPercent =
    ((weatherData.main.temp_max - weatherData.main.temp) /
      (weatherData.main.temp_max - weatherData.main.temp_min)) *
    100;
  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <div className="flex flex-col w-full h-full items-center justify-center">
        <div
          className={`${jetbrainsMono.className} max-w-120 h-full flex flex-col justify-center gap-8 -p-8`}
        >
          <div className="flex flex-row gap-6 items-center">
            <div className="p-12 bg-gray-100">
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
                    {Math.floor(weatherData.main.temp - 273.15)}
                  </p>
                  <p className="text-3xl">°C</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-bold text-2xl">
                  {weatherData.weather[0].main}
                </p>
                <p>{weatherData.weather[0].description}</p>
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
          <div className="flex flex-row flex-wrap gap-8 items-center justify-center">
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
                  <ArrowUpIcon width={16} height={16} style={{rotate: `${weatherData.wind.deg}deg`}} />

                  <p className="text-lg">m/s</p>
                </div>
              </div>
              {weatherData.wind.gust && (
                <p>
                  <b>Gust</b> {weatherData.wind.gust} m/s
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
                  {weatherData.rain ? weatherData.rain["1h"] : "0"}
                </p>
                <p className="text-lg">mm/h</p>
              </div>
              <p>in the last hour</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2 items-center">
                <WavesIcon width={16} height={16} />
                <p className="font-bold tracking-wide">Humidity</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Bar percentage={weatherData.main.humidity} height={12} />
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
                <Bar percentage={weatherData.visibility / 100} height={12} />
                <div className="flex flex-row gap-2 items-end">
                  <p className="text-6xl font-bold tracking-tighter">
                    {weatherData.visibility / 1000}
                  </p>
                  <p className="text-lg">km</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2 items-center">
                <CloudyIcon width={16} height={16} />
                <p className="font-bold tracking-wide">Cloud cover</p>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Bar percentage={weatherData.clouds.all} height={12} />
                <div className="flex flex-row gap-2 items-end">
                  <p className="text-6xl font-bold tracking-tighter">
                    {weatherData.clouds.all}
                  </p>
                  <p className="text-lg">%</p>
                </div>
              </div>
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
    </div>
  );
}
