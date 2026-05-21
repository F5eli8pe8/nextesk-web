"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTasks } from "./services/api";
import { Task } from "./types/Task";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    setUserName(localStorage.getItem("userName") || "");
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const initial = saved || "dark";
    setTheme(initial);
    document.body.className = initial;

    getTasks()
      .then((data) => {
        setTasks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/auth/login");
      });
  }, []);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    router.push("/auth/login");
  }

  function handleTaskCreated(task: Task) {
    setTasks((prev) => [...prev, task]);
  }

  function handleTaskUpdated(updated: Task) {
    setTasks((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  }

  function handleTaskDeleted(id: number) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  if (loading) return null;

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Nextesk</h1>
        <div className={styles.headerRight}>
          <span className={styles.userName}>Olá, {userName}!</span>
          <button onClick={toggleTheme} className={styles.themeButton}>
            {theme === "light" ? "Modo escuro" : "Modo claro"}
          </button>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Sair
          </button>
        </div>
      </div>
      <p className={styles.subtitle}>Gerencie suas tarefas com simplicidade</p>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList
        tasks={tasks}
        onTaskUpdated={handleTaskUpdated}
        onTaskDeleted={handleTaskDeleted}
      />
    </main>
  );
}