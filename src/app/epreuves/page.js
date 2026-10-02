"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const NIVEAUX = [
  "CI", "CP", "CE1", "CE2", "CM1", "CM2",
  "SIXIEME", "CINQUIEME", "QUATRIEME", "TROISIEME",
  "SECONDE", "PREMIERE", "TERMINALE",
  "UNIVERSITE", "CONCOURS", "EXAMEN_NATIONAL",
];

const LABELS_NIVEAU = {
  CI: "CI", CP: "CP", CE1: "CE1", CE2: "CE2", CM1: "CM1", CM2: "CM2",
  SIXIEME: "6eme", CINQUIEME: "5eme", QUATRIEME: "4eme", TROISIEME: "3eme",
  SECONDE: "Seconde", PREMIERE: "Premiere", TERMINALE: "Terminale",
  UNIVERSITE: "Universite", CONCOURS: "Concours", EXAMEN_NATIONAL: "Examen national",
};

export default function Epreuves() {
  const [epreuves, setEpreuves] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [niveau, setNiveau] = useState("");
  const [matiere, setMatiere] = useState("");
  const [annee, setAnnee] = useState("");

  useEffect(() => {
    fetch("/api/epreuves")
      .then((res) => res.json())
      .then((data) => setEpreuves(data));
  }, []);

  const matieres = [...new Set(epreuves.map((ep) => ep.matiere))].sort();
  const annees = [...new Set(epreuves.map((ep) => ep.annee))].sort((a, b) => b - a);

  const filtrees = epreuves.filter((ep) => {
    if (niveau && ep.niveau !== niveau) return false;
    if (matiere && ep.matiere !== matiere) return false;
    if (annee && String(ep.annee) !== annee) return false;
    if (recherche && !(ep.titre + ep.matiere + ep.niveau).toLowerCase().includes(recherche.toLowerCase())) return false;
    return true;
  });

  function reinitialiser() {
    setRecherche("");
    setNiveau("");
    setMatiere("");
    setAnnee("");
  }

  const filtresActifs = niveau || matiere || annee || recherche;

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Epreuves disponibles</h1>

      <div className="space-y-3 mb-6">
        <input
          placeholder="Rechercher par titre, matiere, niveau..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select value={niveau} onChange={(e) => setNiveau(e.target.value)} className="border p-2 rounded">
            <option value="">Tous les niveaux</option>
            {NIVEAUX.map((n) => (
              <option key={n} value={n}>{LABELS_NIVEAU[n]}</option>
            ))}
          </select>
          <select value={matiere} onChange={(e) => setMatiere(e.target.value)} className="border p-2 rounded">
            <option value="">Toutes les matieres</option>
            {matieres.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <select value={annee} onChange={(e) => setAnnee(e.target.value)} className="border p-2 rounded">
            <option value="">Toutes les annees</option>
            {annees.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        {filtresActifs && (
          <button onClick={reinitialiser} className="text-sm text-blue-600 underline">Reinitialiser les filtres</button>
        )}
      </div>

      <p className="text-sm text-gray-500 mb-4">{filtrees.length} epreuve(s) trouvee(s)</p>

      {filtrees.length === 0 && <p className="text-gray-500">Aucune epreuve ne correspond a ces criteres.</p>}
      <div className="space-y-3">
        {filtrees.map((ep) => (
          <a key={ep.id} href={"/epreuves/" + ep.id} className="block border rounded p-4 hover:bg-gray-50">
            <p className="font-medium">{ep.titre}</p>
            <p className="text-sm text-gray-500">{LABELS_NIVEAU[ep.niveau] || ep.niveau} - {ep.matiere} - {ep.annee}{ep.filiere ? " - " + ep.filiere : ""}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
