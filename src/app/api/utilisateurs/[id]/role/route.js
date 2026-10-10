import { prisma } from "@/lib/prisma";
import { getSessionActive } from "@/lib/session";
import { authOptions } from "@/lib/auth";

export async function POST(req, context) {
  const session = await getSessionActive();
  if (!session || session.user.role !== "SUPER_ADMIN") {
    return Response.json({ erreur: "Acces refuse" }, { status: 403 });
  }

  const { id } = await context.params;
  const { role } = await req.json();

  if (!["UTILISATEUR", "ADMIN", "SUPER_ADMIN"].includes(role)) {
    return Response.json({ erreur: "Role invalide" }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id },
    data: { role },
  });

  return Response.json({ message: "Role mis a jour" });
}
