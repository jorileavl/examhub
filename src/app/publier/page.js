"use client";
import { useState, useEffect } from "react";

export default function Publier() {
  const [message, setMessage] = useState("");
  const [mesEpreuves, setMesEpreuves] = useState([]);

  async function chargerMesEpreuves() {
    const res = await fetch("/api/mes-epreuves");
    if (res.ok) setMesEpreuves(await res.json());
  }

  useEffect(() => {
    chargerMesEpreuves();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const res = await fetch("/api/epreuves", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if (res.ok) {
      setMessage("Epreuve envoyee pour validation !");
      e.target.reset();
      chargerMesEpreuves();
    } else {
      setMessage(data.erreur || "Erreur");
    }
  }

  function badge(statut) {
    if (statut === "VALIDEE") return "bg-green-100 text-green-700";
    if (statut === "REJETEE") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  }

  return (
    <main className="max-w-lg mx-auto p-8">
      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <h1 className="text-2xl font-bold mb-4">Publier une epreuve</h1>
        <input name="titre" placeholder="Titre" className="border p-2 w-full rounded" required />
        <select name="type" className="border p-2 w-full rounded">
          <option value="EPREUVE">Epreuve</option>
          <option value="COURS">Cours</option>
          <option value="EXAMEN">Examen</option>
          <option value="CONCOURS">Concours</option>
        </select>
        <select name="niveau" className="border p-2 w-full rounded" required>
          <option value="CI">CI</option>
          <option value="CP">CP</option>
          <option value="CE1">CE1</option>
          <option value="CE2">CE2</option>
          <option value="CM1">CM1</option>
          <option value="CM2">CM2</option>
          <option value="SIXIEME">6eme</option>
          <option value="CINQUIEME">5eme</option>
          <option value="QUATRIEME">4eme</option>
          <option value="TROISIEME">3eme</option>
          <option value="SECONDE">Seconde</option>
          <option value="PREMIERE">Premiere</option>
          <option value="TERMINALE">Terminale</option>
          <option value="UNIVERSITE">Universite</option>
          <option value="CONCOURS">Concours</option>
        </select>
        <input name="filiere" placeholder="Filiere (optionnel)" className="border p-2 w-full rounded" />
        <input name="matiere" placeholder="Matiere" className="border p-2 w-full rounded" required />
        <input name="annee" type="number" placeholder="Annee" className="border p-2 w-full rounded" required />
        <input name="fichier" type="file" className="border p-2 w-full rounded" required accept=".pdf,.doc,.docx" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">Envoyer pour validation</button>
        {message && <p className="text-sm text-gray-700">{message}</p>}
      </form>

      {mesEpreuves.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Mes epreuves publiees</h2>
          <div className="space-y-2">
            {mesEpreuves.map((ep) => (
              <div key={ep.id} className="border rounded p-3">
                <div className="flex justify-between items-start">
                  <p className="font-medium text-sm">{ep.titre}</p>
                  <span className={"text-xs px-2 py-0.5 rounded " + badge(ep.statut)}>{ep.statut}</span>
                </div>
                {ep.statut === "REJETEE" && ep.motifRejet && (
                  <p className="text-xs text-red-600 mt-1">Motif : {ep.motifRejet}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
