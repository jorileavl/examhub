export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ erreur: "Non connecte" }, { status: 401 });
  }

  const epreuves = await prisma.epreuve.findMany({
    where: { auteurId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(epreuves);
}
