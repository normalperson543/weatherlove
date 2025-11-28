'use client'
import { WeatherLocationResult, Settings } from "./types"

export function searchHistory() {
  if (typeof window !== 'undefined') {
    const h = localStorage.getItem("history")
    if (!h) {
      localStorage.setItem("history", "[]")
      return []
    }
    return JSON.parse(h) as WeatherLocationResult[]
  } else console.warn("Not on client!")
}
export function saveSearchHistory(history: WeatherLocationResult[]) {
  const stringified = JSON.stringify(history)
  localStorage.setItem("history", stringified)
  return stringified;
}
export function settings() {
  if (typeof window !== 'undefined') {
    const s = localStorage.getItem("settings")
    if (!s) {
      localStorage.setItem("settings", '{"units": 0, "colorScheme": 0}')
      return { "units": 0, "colorScheme": 0 }
    }
    return JSON.parse(s) as Settings
  } else console.warn("Not on client!")
}
export function saveSettings(settings: Settings) {
  console.log("write")
  const stringified = JSON.stringify(settings)
  localStorage.setItem("settings", stringified)
  console.log(stringified)
  return stringified;
}