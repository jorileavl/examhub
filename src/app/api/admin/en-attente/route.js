export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN")) {
    return Response.json({ erreur: "Acces refuse" }, { status: 403 });
  }

  const epreuves = await prisma.epreuve.findMany({
    where: { statut: "EN_ATTENTE" },
    include: { auteur: { select: { nom: true, email: true, filiere: true } } },
    orderBy: { createdAt: "asc" },
  });

  const utilisateurs = await prisma.user.findMany({
    where: { statutCompte: "EN_ATTENTE" },
    select: { id: true, nom: true, email: true, filiere: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  return Response.json({ epreuves, utilisateurs });
}
