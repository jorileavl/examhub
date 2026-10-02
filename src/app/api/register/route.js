import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  const { nom, email, motDePasse } = await req.json();

  const existant = await prisma.user.findUnique({ where: { email } });
  if (existant) {
    return Response.json({ erreur: "Email déjà utilisé" }, { status: 400 });
  }

  const hash = await bcrypt.hash(motDePasse, 10);

  const user = await prisma.user.create({
    data: { nom, email, motDePasse: hash },
  });

  return Response.json({ message: "Compte créé, en attente de validation", userId: user.id });
}
