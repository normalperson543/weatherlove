import AppUI from "@/components/app-ui";
import { getWeatherData } from "@/lib/data";

export default async function Home(props: {
  searchParams?: Promise<{
    lat: number,
    lon: number
  }>;
}) {
  const searchParams = await props.searchParams;
  
  let weatherData;
  if (searchParams && searchParams.lat && searchParams.lon) {
    weatherData = await getWeatherData(searchParams.lat, searchParams.lon);
  }
  return (
    <AppUI weatherData={weatherData} />
  );
}
