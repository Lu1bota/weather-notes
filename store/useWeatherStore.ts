import { create } from "zustand";
import { persist } from "zustand/middleware";

type WeatherSummary = {
  city: string;
  lat: number;
  lon: number;
  temp: number | null;
  description?: string;
  icon?: string;
  timestamp: number;
};

type State = {
  notes: Record<string, string>;
  cached: Record<string, WeatherSummary>;
  selectedCity?: string;
  setNote: (city: string, note: string) => void;
  setCached: (city: string, summary: WeatherSummary) => void;
  setSelectedCity: (city?: string) => void;
};

export const useWeatherStore = create<State>()(
  persist(
    (set) => ({
      notes: {},
      cached: {},
      selectedCity: undefined,
      setNote: (city, note) =>
        set((s) => ({ notes: { ...s.notes, [city.toLowerCase()]: note } })),
      setCached: (city, summary) =>
        set((s) => ({
          cached: { ...s.cached, [city.toLowerCase()]: summary },
        })),
      setSelectedCity: (city) => set(() => ({ selectedCity: city })),
    }),
    {
      name: "weather-notes-storage",
      partialize: (state) => ({ notes: state.notes, cached: state.cached }),
    }
  )
);

export type { WeatherSummary };
