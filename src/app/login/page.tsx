"use client"; // <-- This makes the component client-side

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    setError("");
    // TODO: Add your login logic here, e.g. call API
    alert(`Logging in with email: ${email}`);
  };

  return (
    <main style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h1>Login</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "0.5rem", fontSize: "1rem" }}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button
          type="submit"
          style={{ padding: "0.75rem", fontSize: "1rem", cursor: "pointer" }}
        >
          Log In
        </button>
      </form>
    </main>
  );
}
