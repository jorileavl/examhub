"use client";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function FormulaireReinitialisation() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [motDePasse, setMotDePasse] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [voirMotDePasse, setVoirMotDePasse] = useState(false);
  const [message, setMessage] = useState("");
  const [envoi, setEnvoi] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (motDePasse !== confirmation) {
      setMessage("Les deux mots de passe ne correspondent pas");
      return;
    }

    setEnvoi(true);
    setMessage("");

    const res = await fetch("/api/reinitialiser-mot-de-passe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, motDePasse }),
    });
    const data = await res.json();

    setEnvoi(false);
    if (res.ok) {
      setMessage("Mot de passe mis a jour ! Redirection...");
      setTimeout(() => router.push("/connexion"), 2000);
    } else {
      setMessage(data.erreur || "Erreur");
    }
  }

  if (!token) {
    return <p className="text-gray-500">Lien invalide. Refaites une demande depuis la page "Mot de passe oublie".</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md w-full space-y-4">
      <h1 className="text-2xl font-bold mb-4">Nouveau mot de passe</h1>
      <div className="relative">
        <input
          type={voirMotDePasse ? "text" : "password"}
          placeholder="Nouveau mot de passe"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          className="border p-2 w-full rounded pr-10"
          required
        />
        <button type="button" onClick={() => setVoirMotDePasse(!voirMotDePasse)} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
          {voirMotDePasse ? "Cacher" : "Voir"}
        </button>
      </div>
      <input
        type={voirMotDePasse ? "text" : "password"}
        placeholder="Confirmer le mot de passe"
        value={confirmation}
        onChange={(e) => setConfirmation(e.target.value)}
        className="border p-2 w-full rounded"
        required
      />
      <button type="submit" disabled={envoi} className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 disabled:opacity-50">
        {envoi ? "Mise a jour..." : "Changer le mot de passe"}
      </button>
      {message && <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{message}</p>}
    </form>
  );
}

export default function ReinitialiserMotDePasse() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <Suspense fallback={<p>Chargement...</p>}>
        <FormulaireReinitialisation />
      </Suspense>
    </main>
  );
}
