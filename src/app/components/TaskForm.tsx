"use client";

import { useState } from "react";
import { createTask } from "../services/api";
import { Task } from "../types/Task";
import styles from "./TaskForm.module.css";

interface Props {
  onTaskCreated: (task: Task) => void;
}

export default function TaskForm({ onTaskCreated }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    const newTask = await createTask({ title, description, completed: false });
    onTaskCreated(newTask);
    setTitle("");
    setDescription("");
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Título da tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
        required
      />
      <input
        type="text"
        placeholder="Descrição (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.input}
      />
      <button type="submit" disabled={loading} className={styles.button}>
        {loading ? "Salvando..." : "Adicionar tarefa"}
      </button>
    </form>
  );
}