"use client";

import { useState } from "react";
import { login } from "../../services/api";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await login(email, password);
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userName", response.name);
        router.push("/");
      } else {
        setError("Email ou senha incorretos.");
      }
    } catch {
      setError("Email ou senha incorretos.");
    }

    setLoading(false);
  }

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Nextesk</h1>
        <p className={styles.subtitle}>Entre na sua conta</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className={styles.link}>
          Não tem conta?{" "}
          <a href="/auth/register">Cadastre-se</a>
        </p>
      </div>
    </main>
  );
}