"use client";

import { useState } from "react";
import { register } from "../../services/api";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await register(name, email, password);
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userName", response.name);
        router.push("/");
      } else {
        setError("Erro ao cadastrar. Tente novamente.");
      }
    } catch {
      setError("Erro ao cadastrar. Email já pode estar em uso.");
    }

    setLoading(false);
  }

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Nextesk</h1>
        <p className={styles.subtitle}>Crie sua conta</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
          />
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
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <p className={styles.link}>
          Já tem conta?{" "}
          <a href="/auth/login">Entrar</a>
        </p>
      </div>
    </main>
  );
}