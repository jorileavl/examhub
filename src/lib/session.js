import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getSessionActive() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, role: true, statutCompte: true },
  });

  if (!user || user.statutCompte === "BLOQUE") return null;

  session.user.role = user.role;
  session.user.statutCompte = user.statutCompte;
  return session;
}
