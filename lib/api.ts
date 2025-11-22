import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

function requireApiKey(): string {
  if (!API_KEY) {
    throw new Error(
      "Missing OpenWeatherMap API key. Set NEXT_PUBLIC_OPENWEATHER_API_KEY in your .env"
    );
  }
  return API_KEY;
}

export async function getCoordinates(city: string) {
  const key = requireApiKey();
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    city
  )}&limit=1&appid=${key}`;
  const res = await axios.get(url);
  return res.data;
}

export async function getForecast(
  lat: number,
  lon: number,
  units = "metric",
  lang = "en"
) {
  const key = requireApiKey();
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&lang=${lang}&units=${units}`;
  const res = await axios.get(url);
  return res.data;
}

export type ForecastResponse = ReturnType<typeof getForecast>;
