'use server'

import { env } from "process"
import { WeatherData, WeatherForecastData, WeatherLocationResult } from "./types"

export async function getWeatherData(lat: number, lon: number, units?: number) {
  console.log("===== PING")
  const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${env.OWM_API_KEY}&units=${units === 0 ? "metric" : "imperial"}`)
  const respJson = await resp.json()
  return respJson as WeatherData
}
export async function searchLocationsByName(searchTerm: string) {
  const resp = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${env.OWM_API_KEY}`)
  if (!resp.ok) return [];
  const respJson = await resp.json()
  return respJson as WeatherLocationResult[]
}
export async function getForecast(lat: number, lon: number, units?: number) {
  console.log("====== PONG")
  const resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${env.OWM_API_KEY}&units=${units === 0 ? "metric" : "imperial"}`)
  const respJson = await resp.json()
  return respJson as WeatherForecastData
}