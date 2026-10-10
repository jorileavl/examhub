"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FILIERES } from "@/lib/constantes";

export default function Inscription() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [voirMotDePasse, setVoirMotDePasse] = useState(false);
  const [chargement, setChargement] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (chargement) return;
    setMessage("");
    setChargement(true);

    const formData = new FormData(e.target);
    const nom = formData.get("nom");
    const email = formData.get("email");
    const motDePasse = formData.get("motDePasse");
    const filiere = formData.get("filiere");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, email, motDePasse, filiere }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("Compte cree ! Connexion automatique...");
        await signIn("credentials", { email, motDePasse, redirect: false });
        router.push("/epreuves");
      } else {
        setMessage(data.erreur || "Erreur lors de la creation du compte");
        setChargement(false);
      }
    } catch {
      setMessage("Une erreur est survenue. Reessayez.");
      setChargement(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <form onSubmit={handleSubmit} className="max-w-md w-full space-y-4">
        <h1 className="text-2xl font-bold mb-4">Creer un compte</h1>
        <input name="nom" placeholder="Nom complet" className="border p-2 w-full rounded" required />
        <input name="email" type="email" placeholder="Email" className="border p-2 w-full rounded" required />
        <select name="filiere" className="border p-2 w-full rounded" required defaultValue="">
          <option value="" disabled>Votre filiere a HECM</option>
          {FILIERES.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
        <div className="relative">
          <input
            name="motDePasse"
            type={voirMotDePasse ? "text" : "password"}
            placeholder="Mot de passe"
            className="border p-2 w-full rounded pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setVoirMotDePasse(!voirMotDePasse)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
          >
            {voirMotDePasse ? "Cacher" : "Voir"}
          </button>
        </div>
        <button
          type="submit"
          disabled={chargement}
          className="bg-marque-600 text-white px-4 py-2 rounded w-full hover:bg-marque-700 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {chargement && <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
          {chargement ? "Creation du compte..." : "Creer mon compte"}
        </button>
        {message && <p className="text-sm text-gray-700">{message}</p>}
      </form>
    </main>
  );
}
