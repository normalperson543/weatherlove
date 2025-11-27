import {
  CloudDrizzleIcon,
  CloudFogIcon,
  CloudLightningIcon,
  CloudRainIcon,
  CloudSnowIcon,
  CloudSunIcon,
  CloudyIcon,
  SunIcon
} from "lucide-react"
export default function WeatherIcon({ id, width, height }: { id: number, width: number, height: number }) {
  return (
    <>
      {id.toString().substring(0, 1) === "2" && (
        <CloudLightningIcon width={width} height={height} />
      )}
      {id.toString().substring(0, 1) === "3" && (
        <CloudDrizzleIcon width={width} height={height} />
      )}
      {id.toString().substring(0, 1) === "5" && (
        <CloudRainIcon width={width} height={height} />
      )}
      {id.toString().substring(0, 1) === "6" && (
        <CloudSnowIcon width={width} height={height} />
      )}
      {id.toString().substring(0, 1) === "7" && (
        <CloudFogIcon width={width} height={height} />
      )}
      {id === 800 && (
        <SunIcon width={width} height={height} />
      )}
      {id >= 801 &&
        id <= 803 && (
          <CloudSunIcon width={width} height={height} />
        )}
      {id === 804 && (
        <CloudyIcon width={width} height={height} />
      )}
    </>
  )
}