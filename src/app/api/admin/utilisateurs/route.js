export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN")) {
    return Response.json({ erreur: "Acces refuse" }, { status: 403 });
  }

  const utilisateurs = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      nom: true,
      email: true,
      role: true,
      statutCompte: true,
      filiere: true,
      createdAt: true,
      epreuves: { select: { id: true } },
    },
  });

  return Response.json(utilisateurs);
}
