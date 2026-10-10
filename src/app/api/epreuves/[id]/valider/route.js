import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req, context) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN")) {
    return Response.json({ erreur: "Acces refuse" }, { status: 403 });
  }

  const { id } = await context.params;
  const { statut, motifRejet } = await req.json();

  const epreuve = await prisma.epreuve.update({
    where: { id },
    data: {
      statut,
      motifRejet: statut === "REJETEE" ? (motifRejet || null) : null,
    },
  });

  return Response.json({ message: "Epreuve traitee", epreuve });
}
