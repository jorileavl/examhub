"use client";
import { useState } from "react";

export default function Home() {
  const [survolBloc, setSurvolBloc] = useState(null);

  return (
    <main className="min-h-screen overflow-hidden">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-purple-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <div className="inline-block bg-white/10 backdrop-blur px-4 py-1 rounded-full text-sm mb-6 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-default">
            Du CI a la Terminale, jusqu a l Universite
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            Toutes les epreuves,<br />
            <span className="inline-block hover:scale-110 hover:text-blue-200 transition-transform duration-300">au meme endroit</span>
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            examHub rassemble epreuves, cours, examens et concours pour chaque niveau et chaque filiere. Trouvez, partagez, reussissez.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/epreuves" className="group bg-white text-blue-700 px-7 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-105">
              Explorer les epreuves
              <span className="inline-block ml-1 transition-transform duration-300 group-hover:translate-x-1">-&gt;</span>
            </a>
            <a href="/inscription" className="bg-blue-500/30 backdrop-blur border border-white/30 text-white px-7 py-3 rounded-xl font-semibold hover:bg-blue-500/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl">
              Creer un compte gratuit
            </a>
          </div>
        </div>
        <svg className="relative w-full" viewBox="0 0 1440 80" fill="none">
          <path d="M0 40 C 360 90 1080 0 1440 40 L1440 80 L0 80 Z" fill="white" />
        </svg>
      </section>

      <section className="max-w-5xl mx-auto px-6 -mt-2 pb-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { chiffre: "16", label: "Niveaux couverts" },
            { chiffre: "4", label: "Types de contenus" },
            { chiffre: "100%", label: "Gratuit" },
            { chiffre: "24/7", label: "Accessible" },
          ].map((stat) => (
            <div key={stat.label} className="group cursor-default p-3 rounded-xl hover:bg-blue-50 transition-all duration-300">
              <p className="text-3xl font-bold text-blue-700 transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-1">{stat.chiffre}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-3">Pourquoi examHub ?</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Une plateforme pensee pour les eleves et etudiants, construite par une communaute qui partage ses ressources.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { lettre: "S", titre: "Recherche simple", texte: "Filtrez par niveau, matiere et annee pour trouver exactement ce dont vous avez besoin, en quelques secondes.", couleur: "bg-blue-100 text-blue-700" },
            { lettre: "V", titre: "Contenu verifie", texte: "Chaque epreuve est examinee par un administrateur avant publication, pour garantir un contenu fiable.", couleur: "bg-indigo-100 text-indigo-700" },
            { lettre: "P", titre: "Communaute active", texte: "Chaque membre contribue en partageant ses propres epreuves, pour que la banque de ressources grandisse chaque jour.", couleur: "bg-purple-100 text-purple-700" },
          ].map((item) => (
            <div key={item.lettre} className="group bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 cursor-default">
              <div className={"w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold mb-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 " + item.couleur}>
                {item.lettre}
              </div>
              <h3 className="font-semibold text-lg mb-2 transition-colors duration-300 group-hover:text-blue-700">{item.titre}</h3>
              <p className="text-gray-500 text-sm">{item.texte}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-3">Tous les niveaux, une seule adresse</h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">Du primaire au superieur, examHub couvre tout le parcours scolaire.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Primaire", niveaux: "CI - CP - CE1 - CE2 - CM1 - CM2", couleur: "from-sky-400 to-sky-600" },
              { label: "College", niveaux: "6eme - 5eme - 4eme - 3eme", couleur: "from-emerald-400 to-emerald-600" },
              { label: "Lycee", niveaux: "Seconde - Premiere - Terminale", couleur: "from-amber-400 to-amber-600" },
              { label: "Superieur", niveaux: "Universite - Concours", couleur: "from-fuchsia-400 to-fuchsia-600" },
            ].map((bloc, i) => (
              <div
                key={bloc.label}
                onMouseEnter={() => setSurvolBloc(i)}
                onMouseLeave={() => setSurvolBloc(null)}
                className={"bg-gradient-to-br " + bloc.couleur + " text-white rounded-2xl p-6 shadow-md transition-all duration-300 cursor-default " + (survolBloc === i ? "scale-105 -translate-y-2 shadow-2xl" : "")}
              >
                <p className="font-bold text-lg mb-1">{bloc.label}</p>
                <p className="text-sm text-white/80">{bloc.niveaux}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Pret a commencer ?</h2>
        <p className="text-gray-500 mb-8">Creez votre compte, publiez une epreuve, et acceder a toute la banque de ressources.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="/inscription" className="bg-blue-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-105">
            Creer un compte
          </a>
          <a href="/connexion" className="border border-gray-300 text-gray-700 px-7 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 hover:-translate-y-1 hover:scale-105">
            Se connecter
          </a>
        </div>
      </section>
    </main>
  );
}
