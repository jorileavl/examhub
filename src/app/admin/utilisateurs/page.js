"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function AdminUtilisateurs() {
  const { data: session, status } = useSession();
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [erreur, setErreur] = useState("");

  const estSuperAdmin = session?.user?.role === "SUPER_ADMIN";

  async function charger() {
    const res = await fetch("/api/admin/utilisateurs");
    if (res.ok) {
      setUtilisateurs(await res.json());
    } else {
      const data = await res.json();
      setErreur("Erreur: " + (data.erreur || res.status));
    }
  }

  useEffect(() => {
    if (status === "authenticated") charger();
  }, [status]);

  async function changerStatut(id, statut) {
    const res = await fetch("/api/utilisateurs/" + id + "/valider", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ statut }),
    });
    if (!res.ok) {
      const data = await res.json();
      setErreur("Erreur: " + (data.erreur || res.status));
      return;
    }
    setErreur("");
    charger();
  }

  async function changerRole(id, role) {
    const res = await fetch("/api/utilisateurs/" + id + "/role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    if (!res.ok) {
      const data = await res.json();
      setErreur("Erreur: " + (data.erreur || res.status));
      return;
    }
    setErreur("");
    charger();
  }

  async function supprimer(id, nom) {
    if (!confirm("Supprimer definitivement " + nom + " et ses epreuves ?")) return;
    const res = await fetch("/api/utilisateurs/" + id, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      setErreur("Erreur: " + (data.erreur || res.status));
      return;
    }
    setErreur("");
    charger();
  }

  if (status === "loading") return <p className="p-8">Chargement...</p>;
  if (status !== "authenticated" || (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN")) {
    return <p className="p-8">Acces reserve aux admins.</p>;
  }

  function badgeCouleur(statut) {
    if (statut === "VALIDE") return "bg-green-100 text-green-700";
    if (statut === "BLOQUE") return "bg-red-100 text-red-700";
    if (statut === "REJETE") return "bg-gray-200 text-gray-600";
    return "bg-yellow-100 text-yellow-700";
  }

  return (
    <main className="max-w-5xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tous les utilisateurs ({utilisateurs.length})</h1>
        <a href="/admin" className="text-marque-600 underline text-sm">Retour au tableau de bord</a>
      </div>
      {erreur && <p className="text-red-600 bg-red-50 p-3 rounded mb-4">{erreur}</p>}

      <div className="space-y-3">
        {utilisateurs.map((u) => (
          <div key={u.id} className="border rounded p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">
                {u.nom}
                {u.role === "SUPER_ADMIN" && <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">SUPER ADMIN</span>}
                {u.role === "ADMIN" && <span className="ml-2 text-xs bg-marque-100 text-marque-700 px-2 py-0.5 rounded">ADMIN</span>}
                <span className={"ml-2 text-xs px-2 py-0.5 rounded " + badgeCouleur(u.statutCompte)}>{u.statutCompte}</span>
              </p>
              <p className="text-sm text-gray-500">{u.email}{u.filiere ? " - " + u.filiere : ""} - {u.epreuves.length} epreuve(s)</p>
            </div>
            {estSuperAdmin && (
              <div className="flex gap-2 flex-wrap justify-end">
                {u.role === "UTILISATEUR" && (
                  <button onClick={() => changerRole(u.id, "ADMIN")} className="bg-marque-100 text-marque-700 px-3 py-1 rounded text-sm">Promouvoir admin</button>
                )}
                {u.role === "ADMIN" && (
                  <button onClick={() => changerRole(u.id, "UTILISATEUR")} className="bg-gray-200 px-3 py-1 rounded text-sm">Retirer admin</button>
                )}
                {u.statutCompte !== "BLOQUE" ? (
                  <button onClick={() => changerStatut(u.id, "BLOQUE")} className="bg-orange-500 text-white px-3 py-1 rounded text-sm">Bloquer</button>
                ) : (
                  <button onClick={() => changerStatut(u.id, "VALIDE")} className="bg-green-600 text-white px-3 py-1 rounded text-sm">Debloquer</button>
                )}
                <button onClick={() => supprimer(u.id, u.nom)} className="bg-red-600 text-white px-3 py-1 rounded text-sm">Supprimer</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
