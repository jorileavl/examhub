import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req, context) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "SUPER_ADMIN") {
    return Response.json({ erreur: "Acces refuse" }, { status: 403 });
  }

  const { id } = await context.params;
  const body = await req.json();

  const epreuve = await prisma.epreuve.update({
    where: { id },
    data: {
      titre: body.titre,
      type: body.type,
      niveau: body.niveau,
      filiere: body.filiere,
      matiere: body.matiere,
      annee: parseInt(body.annee),
    },
  });

  return Response.json({ message: "Epreuve modifiee", epreuve });
}
