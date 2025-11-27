import { WeatherLocationResult } from "./types"

export function searchHistory() {
  const h = localStorage.getItem("history")
  if (!h) {
    localStorage.setItem("history", "[]")
    return []
  }
  return JSON.parse(h) as WeatherLocationResult[]
}
export function saveSearchHistory(history: WeatherLocationResult[]) {
  const stringified = JSON.stringify(history)
  localStorage.setItem("history", stringified)
  return stringified;
}