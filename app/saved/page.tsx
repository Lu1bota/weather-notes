"use client";
import React from "react";
import { useWeatherStore } from "../../store/useWeatherStore";
import styles from "./saved.module.css";
import { useRouter } from "next/navigation";

export default function SavedPage() {
  const cached = useWeatherStore((s) => s.cached);

  const router = useRouter();

  const items = Object.values(cached || {});

  if (!items.length) {
    return (
      <main className={styles.container}>
        <h2>Saved cities</h2>
        <div>No cached cities yet.</div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <h2>Saved cities</h2>

      <ul className={styles.list}>
        {items.map((it) => (
          <li key={it.city} className={styles.item}>
            <div>
              <div className={styles.city}>{it.city}</div>
              <div className={styles.temp}>
                {it.temp != null ? `${it.temp}°C` : "—"}
              </div>
            </div>
            <div>
              <button
                className={styles.view}
                onClick={() =>
                  router.push(`/?city=${encodeURIComponent(it.city)}`)
                }
              >
                View
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
