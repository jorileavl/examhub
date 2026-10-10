import {
  FILIERES_LICENCE_TERTIAIRES,
  FILIERES_LICENCE_INDUSTRIELLES,
  FILIERES_LICENCE,
  FILIERES_MASTER,
} from "@/lib/constantes";

function Pastilles({ liste, accent }) {
  return (
    <div className="flex flex-wrap gap-2">
      {liste.map((f) => (
        <a key={f} href="/epreuves" className={(accent ? "bg-accent-50 text-accent-800 border-accent-300 hover:bg-accent-600 hover:border-accent-600 active:bg-accent-600 active:border-accent-600" : "bg-marque-50 text-marque-800 border-marque-300 hover:bg-marque-600 hover:border-marque-600 active:bg-marque-600 active:border-marque-600") + " border rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-all duration-300 hover:text-white active:text-white hover:-translate-y-1 hover:shadow-lg"}>
          {f}
        </a>
      ))}
    </div>
  );
}

export default function Home() {
  const parcours = [
    { label: "Licence", detail: "Licence 1, 2 et 3", couleur: "from-marque-400 to-marque-600" },
    { label: "Master", detail: "Master 1 et 2", couleur: "from-marque-600 to-marque-800" },
    { label: "Concours", detail: "Annales de concours", couleur: "from-accent-400 to-accent-600" },
    { label: "Examen national", detail: "Sujets des examens nationaux", couleur: "from-accent-600 to-accent-800" },
  ];

  return (
    <main className="min-h-screen overflow-hidden">
      <section className="relative overflow-hidden bg-gradient-to-br from-marque-600 via-marque-700 to-marque-800 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-marque-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <div className="inline-block bg-white/10 backdrop-blur px-4 py-1 rounded-full text-sm mb-6 border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-default">
            Haute Ecole de Commerce et de Management
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            Les epreuves de HECM,<br />
            <span className="inline-block hover:scale-110 hover:text-marque-200 transition-transform duration-300">au meme endroit</span>
          </h1>
          <p className="text-lg sm:text-xl text-marque-100 mb-10 max-w-2xl mx-auto">
            Retrouvez et partagez epreuves, cours, concours et examens par filiere, de la Licence 1 au Master 2.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/epreuves" className="group bg-white text-marque-700 px-7 py-3 rounded-xl font-semibold hover:bg-marque-50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-105">
              Explorer les epreuves
              <span className="inline-block ml-1 transition-transform duration-300 group-hover:translate-x-1">-&gt;</span>
            </a>
            <a href="/inscription" className="bg-marque-500/30 backdrop-blur border border-white/30 text-white px-7 py-3 rounded-xl font-semibold hover:bg-marque-500/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-xl">
              Creer un compte
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
            { chiffre: String(FILIERES_LICENCE.length), label: "Licences" },
            { chiffre: String(FILIERES_MASTER.length), label: "Masters" },
            { chiffre: "5", label: "Niveaux (L1 a M2)" },
            { chiffre: "100%", label: "Gratuit" },
          ].map((stat) => (
            <div key={stat.label} className="group cursor-default p-3 rounded-xl hover:bg-marque-50 transition-all duration-300">
              <p className="text-3xl font-bold text-marque-700 transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-1">{stat.chiffre}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-3">Pourquoi cette plateforme ?</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Un espace pense pour les etudiants de HECM, alimente par la communaute.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { lettre: "S", titre: "Recherche par filiere", texte: "Filtrez par filiere, niveau, matiere et annee pour trouver exactement le document dont vous avez besoin.", couleur: "bg-marque-100 text-marque-700" },
            { lettre: "V", titre: "Contenu verifie", texte: "Chaque document est examine par un administrateur avant publication, pour garantir un contenu fiable.", couleur: "bg-accent-100 text-accent-700" },
            { lettre: "P", titre: "Communaute active", texte: "Les membres qui le souhaitent partagent leurs epreuves, pour que la banque de ressources grandisse chaque jour.", couleur: "bg-marque-100 text-marque-700" },
          ].map((item) => (
            <div key={item.lettre} className="group bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 cursor-default">
              <div className={"w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold mb-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 " + item.couleur}>
                {item.lettre}
              </div>
              <h3 className="font-semibold text-lg mb-2 transition-colors duration-300 group-hover:text-marque-700">{item.titre}</h3>
              <p className="text-gray-500 text-sm">{item.texte}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-3">Les filieres de HECM</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Retrouvez les epreuves de votre filiere, en Licence comme en Master.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Licences professionnelles <span className="text-gray-400 font-normal">(Bac+3)</span></h3>
            <p className="text-sm font-medium text-marque-700 mt-5 mb-3">Filieres tertiaires</p>
            <Pastilles liste={FILIERES_LICENCE_TERTIAIRES} />
            <p className="text-sm font-medium text-marque-700 mt-6 mb-3">Filieres industrielles</p>
            <Pastilles liste={FILIERES_LICENCE_INDUSTRIELLES} />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Masters <span className="text-gray-400 font-normal">(Bac+5)</span></h3>
            <Pastilles liste={FILIERES_MASTER} accent />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Tous les parcours</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {parcours.map((bloc) => (
            <div key={bloc.label} className={"bg-gradient-to-br " + bloc.couleur + " text-white rounded-2xl p-6 shadow-md cursor-default transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl"}>
              <p className="font-bold text-lg mb-1">{bloc.label}</p>
              <p className="text-sm text-white/80">{bloc.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-20 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">Pret a commencer ?</h2>
        <p className="text-gray-500 mb-8">Creez votre compte gratuitement et accedez a toute la banque de ressources. Vous pouvez aussi partager vos propres documents.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="/inscription" className="bg-marque-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-marque-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-105">
            Creer un compte
          </a>
          <a href="/connexion" className="border border-gray-300 text-gray-700 px-7 py-3 rounded-xl font-semibold hover:bg-white transition-all duration-300 hover:-translate-y-1 hover:scale-105">
            Se connecter
          </a>
        </div>
      </section>
    </main>
  );
}
