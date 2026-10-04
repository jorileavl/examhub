"use client";
import { useState } from "react";

export default function MotDePasseOublie() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [envoi, setEnvoi] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setEnvoi(true);
    setMessage("");

    const res = await fetch("/api/mot-de-passe-oublie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();

    setEnvoi(false);
    if (res.ok) {
      setMessage(data.message);
    } else {
      setMessage(data.erreur || "Erreur");
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <form onSubmit={handleSubmit} className="max-w-md w-full space-y-4">
        <h1 className="text-2xl font-bold mb-2">Mot de passe oublie</h1>
        <p className="text-sm text-gray-500 mb-4">Entrez votre email, nous vous enverrons un lien pour choisir un nouveau mot de passe.</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <button type="submit" disabled={envoi} className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 disabled:opacity-50">
          {envoi ? "Envoi..." : "Envoyer le lien"}
        </button>
        {message && <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{message}</p>}
        <a href="/connexion" className="block text-center text-sm text-blue-600 underline">Retour a la connexion</a>
      </form>
    </main>
  );
}
