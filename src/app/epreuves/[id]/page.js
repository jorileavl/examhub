"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

const LABELS_NIVEAU = {
  CI: "CI", CP: "CP", CE1: "CE1", CE2: "CE2", CM1: "CM1", CM2: "CM2",
  SIXIEME: "6eme", CINQUIEME: "5eme", QUATRIEME: "4eme", TROISIEME: "3eme",
  SECONDE: "Seconde", PREMIERE: "Premiere", TERMINALE: "Terminale",
  UNIVERSITE: "Universite", CONCOURS: "Concours", EXAMEN_NATIONAL: "Examen national",
};

export default function DetailEpreuve() {
  const { id } = useParams();
  const { status } = useSession();
  const [epreuve, setEpreuve] = useState(null);
  const [similaires, setSimilaires] = useState([]);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    fetch("/api/epreuves/" + id + "/detail")
      .then((res) => {
        if (!res.ok) throw new Error("introuvable");
        return res.json();
      })
      .then((data) => {
        setEpreuve(data.epreuve);
        setSimilaires(data.similaires);
      })
      .catch(() => setErreur("Epreuve introuvable ou non encore validee."));
  }, [id]);

  if (erreur) return <main className="max-w-2xl mx-auto p-8"><p className="text-gray-500">{erreur}</p><a href="/epreuves" className="text-blue-600 underline text-sm">Retour aux epreuves</a></main>;
  if (!epreuve) return <main className="max-w-2xl mx-auto p-8"><p>Chargement...</p></main>;

  return (
    <main className="max-w-2xl mx-auto p-8">
      <a href="/epreuves" className="text-blue-600 underline text-sm">Retour aux epreuves</a>

      <h1 className="text-2xl font-bold mt-4 mb-2">{epreuve.titre}</h1>
      <p className="text-gray-600 mb-1">{LABELS_NIVEAU[epreuve.niveau] || epreuve.niveau} - {epreuve.matiere} - {epreuve.annee}{epreuve.filiere ? " - " + epreuve.filiere : ""}</p>
      <p className="text-sm text-gray-400 mb-6">Ajoute par {epreuve.auteur?.nom || "un membre"}</p>

      {status === "authenticated" ? (
        <a href={epreuve.fichierUrl} target="_blank" className="bg-blue-600 text-white px-5 py-2 rounded-lg inline-block hover:bg-blue-700">Telecharger le fichier</a>
      ) : status === "loading" ? (
        <span className="text-sm text-gray-400">...</span>
      ) : (
        <div className="flex gap-3 items-center text-sm bg-gray-50 p-4 rounded">
          <span className="text-gray-600">Connectez-vous pour telecharger :</span>
          <a href="/connexion" className="text-blue-600 underline">Se connecter</a>
          <span className="text-gray-400">ou</span>
          <a href="/inscription" className="text-blue-600 underline">Creer un compte</a>
        </div>
      )}

      {similaires.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-3">Epreuves similaires</h2>
          <div className="space-y-2">
            {similaires.map((s) => (
              <a key={s.id} href={"/epreuves/" + s.id} className="block border rounded p-3 hover:bg-gray-50">
                <p className="font-medium text-sm">{s.titre}</p>
                <p className="text-xs text-gray-500">{LABELS_NIVEAU[s.niveau] || s.niveau} - {s.matiere} - {s.annee}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
