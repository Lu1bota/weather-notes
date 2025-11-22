"use client";
import React, { useEffect, useState } from "react";
import styles from "./NoteEditor.module.css";
import { useWeatherStore } from "../store/useWeatherStore";
import toast from "react-hot-toast";

type Props = { city: string };

export default function NoteEditor({ city }: Props) {
  const key = city.toLowerCase();
  const save = useWeatherStore((s) => s.setNote);
  const notes = useWeatherStore((s) => s.notes);
  const [text, setText] = useState("");

  useEffect(() => {
    setText(notes[key] || "");
  }, [key, notes]);

  const handleSave = () => {
    const previous = notes[key] || "";

    if (previous !== text) {
      save(city, text);
      toast.success("Add new note");
    }
  };

  return (
    <div className={styles.wrap}>
      <label className={styles.label}>Your note for {city}:</label>
      <textarea
        className={styles.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
      />
      <div>
        <button className={styles.save} onClick={handleSave}>
          Save note
        </button>
      </div>
    </div>
  );
}
