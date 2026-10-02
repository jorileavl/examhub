"use client";
import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Connexion() {
  const router = useRouter();
  const [erreur, setErreur] = useState("");
  const [voirMotDePasse, setVoirMotDePasse] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const motDePasse = formData.get("motDePasse");

    const res = await signIn("credentials", {
      email,
      motDePasse,
      redirect: false,
    });

    if (res.error) {
      setErreur(res.error);
      return;
    }

    const session = await getSession();
    if (session?.user?.role === "SUPER_ADMIN") {
      router.push("/admin");
    } else if (session?.user?.statutCompte !== "VALIDE") {
      router.push("/publier");
    } else {
      router.push("/epreuves");
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <form onSubmit={handleSubmit} className="max-w-md w-full space-y-4">
        <h1 className="text-2xl font-bold mb-4">Connexion</h1>
        <input name="email" type="email" placeholder="Email" className="border p-2 w-full rounded" required />
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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">Se connecter</button>
        {erreur && <p className="text-sm text-red-600">{erreur}</p>}
      </form>
    </main>
  );
}
