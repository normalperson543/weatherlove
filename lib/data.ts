'use server'

import { env } from "process"
import { WeatherData, WeatherLocationResult } from "./types"

export async function getWeatherData(lat: number, lon: number) {
  const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${env.OWM_API_KEY}`)
  const respJson = await resp.json()
  return respJson as WeatherData
}
export async function searchLocationsByName(searchTerm: string) {
  const resp = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&limit=5&appid=${env.OWM_API_KEY}`)
  const respJson = await resp.json()
  return respJson as WeatherLocationResult[]
}