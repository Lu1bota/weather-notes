"use client";
import React, { useState } from "react";
import styles from "./SearchForm.module.css";

type Props = {
  onSearch: (city: string) => void;
  loading?: boolean;
};

export default function SearchForm({ onSearch, loading }: Props) {
  const [city, setCity] = useState("");

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!city.trim()) return;

    onSearch(city.trim());
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        aria-label="city"
      />

      <button className={styles.button} type="submit" disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
