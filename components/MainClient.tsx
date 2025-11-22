"use client";
import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import WeatherCard from "./WeatherCard";
import NoteEditor from "./NoteEditor";
import { getCoordinates, getForecast } from "../lib/api";
import { useWeatherStore, WeatherSummary } from "../store/useWeatherStore";
import styles from "../app/page.module.css";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  initialCity?: string | null;
};

export default function MainClient({ initialCity }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [current, setCurrent] = useState<WeatherSummary | null>(null);
  const cached = useWeatherStore((s) => s.cached);
  const setCached = useWeatherStore((s) => s.setCached);
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [offlineToastShown, setOfflineToastShown] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    if (!navigator.onLine && !offlineToastShown) {
      toast("Offline mode – showing cached data");
      setOfflineToastShown(true);
    }

    const onOffline = () => {
      if (!offlineToastShown) {
        toast("Offline mode – showing cached data");
        setOfflineToastShown(true);
      }
    };

    window.addEventListener("offline", onOffline);

    return () => window.removeEventListener("offline", onOffline);
  }, [isClient, offlineToastShown]);

  useEffect(() => {
    if (isClient && initialCity) {
      handleSearch(initialCity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCity, isClient]);

  async function handleSearch(city: string) {
    setError(null);
    setLoading(true);
    setCurrent(null);

    try {
      if (!navigator.onLine) {
        const key = city.toLowerCase();

        if (cached[key]) {
          setCurrent(cached[key]);
        } else {
          setError("No cached data available.");
        }

        return;
      }

      const coords = await getCoordinates(city);

      if (!coords || coords.length === 0) {
        setError("City not found");
        return;
      }

      const { lat, lon, name } = coords[0];
      const forecast = await getForecast(lat, lon, "metric", "en");
      const first = forecast.list?.[0];
      const temp = first?.main?.temp ?? null;
      const description = first?.weather?.[0]?.description ?? "";
      const icon = first?.weather?.[0]?.icon ?? "";

      const summary: WeatherSummary = {
        city: name || city,
        lat,
        lon,
        temp,
        description,
        icon,
        timestamp: Date.now(),
      };

      setCached(name || city, summary);
      setCurrent(summary);
    } catch (err: unknown) {
      const message =
        typeof err === "object" && err !== null && "message" in err
          ? (err as { message?: string }).message
          : String(err);

      setError(message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.container}>
      <SearchForm onSearch={handleSearch} loading={loading} />

      {error && <div className={styles.error}>❌ {error}</div>}

      {current ? (
        <>
          <WeatherCard
            city={current.city}
            temp={current.temp}
            description={current.description}
            icon={current.icon}
          />
          <NoteEditor city={current.city} />
        </>
      ) : (
        <div className={styles.hint}>Search for a city to view weather</div>
      )}

      <div style={{ marginTop: 16 }}>
        <button
          onClick={() => router.push("/saved")}
          className={styles.linkButton}
        >
          View saved cities
        </button>
      </div>
    </main>
  );
}
