"use client";
import React from "react";
import styles from "./WeatherCard.module.css";
import Image from "next/image";

type Props = {
  city: string;
  temp?: number | null;
  description?: string;
  icon?: string;
};

export default function WeatherCard({ city, temp, description, icon }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{city}</h3>
        {icon && (
          <Image
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description || "icon"}
            width={64}
            height={64}
          />
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.temp}>{temp != null ? `${temp}°C` : "—"}</div>
        <div className={styles.desc}>{description || "No description"}</div>
      </div>
    </div>
  );
}
