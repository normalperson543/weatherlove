'use client'

import { WeatherData } from "@/lib/types"

export default function AppUI({ weatherData }: {weatherData?: WeatherData}) {
  if (!weatherData) {
    return <div>
      <p>No weather data!</p>
    </div>
  }
  console.log(weatherData)
  return (
    <div>
      
    </div>
  )
}