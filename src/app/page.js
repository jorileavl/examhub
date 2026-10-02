export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">examHub</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
        La plateforme pour retrouver epreuves, cours, examens et concours, du CI au superieur.
      </p>
      <div className="flex gap-4">
        <a href="/epreuves" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">Voir les epreuves</a>
        <a href="/inscription" className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50">Creer un compte</a>
        <a href="/connexion" className="border border-gray-400 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50">Se connecter</a>
      </div>
    </main>
  );
}
