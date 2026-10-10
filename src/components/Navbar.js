"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();
  const estAdminOuPlus = session?.user?.role === "SUPER_ADMIN" || session?.user?.role === "ADMIN";

  return (
    <nav className="border-b-4 border-accent-500 px-6 py-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-lg text-marque-600">Exam<span className="text-accent-500">HECM</span></Link>
      <div className="flex gap-4 items-center text-sm">
        <Link href="/epreuves">Epreuves</Link>
        {status === "authenticated" ? (
          <>
            {estAdminOuPlus && (
              <>
                <Link href="/admin">Admin</Link>
                <Link href="/admin/utilisateurs">Utilisateurs</Link>
              </>
            )}
            <Link href="/publier">Publier</Link>
            <span className="text-gray-500">{session.user.email}</span>
            <button onClick={() => signOut({ callbackUrl: "/" })} className="text-red-600">Deconnexion</button>
          </>
        ) : (
          <>
            <Link href="/connexion">Connexion</Link>
            <Link href="/inscription" className="bg-marque-600 text-white px-3 py-1 rounded">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  );
}
