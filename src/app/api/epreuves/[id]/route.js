import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const NIVEAUX_VALIDES = ["CI","CP","CE1","CE2","CM1","CM2","SIXIEME","CINQUIEME","QUATRIEME","TROISIEME","SECONDE","PREMIERE","TERMINALE","UNIVERSITE","CONCOURS","EXAMEN_NATIONAL"];
const TYPES_VALIDES = ["EPREUVE","COURS","EXAMEN","CONCOURS"];

export async function PUT(req, context) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user.role !== "SUPER_ADMIN" && session.user.role !== "ADMIN")) {
    return Response.json({ erreur: "Acces refuse" }, { status: 403 });
  }

  const { id } = await context.params;
  const body = await req.json();

  const titre = (body.titre || "").toString().trim();
  const type = (body.type || "").toString();
  const niveau = (body.niveau || "").toString();
  const filiere = (body.filiere || "").toString().trim();
  const matiere = (body.matiere || "").toString().trim();
  const annee = parseInt(body.annee);

  if (!titre || titre.length < 3 || titre.length > 150) {
    return Response.json({ erreur: "Le titre doit contenir entre 3 et 150 caracteres" }, { status: 400 });
  }
  if (!matiere || matiere.length < 2 || matiere.length > 80) {
    return Response.json({ erreur: "La matiere doit contenir entre 2 et 80 caracteres" }, { status: 400 });
  }
  if (!NIVEAUX_VALIDES.includes(niveau)) {
    return Response.json({ erreur: "Niveau invalide" }, { status: 400 });
  }
  if (!TYPES_VALIDES.includes(type)) {
    return Response.json({ erreur: "Type invalide" }, { status: 400 });
  }
  if (!annee || annee < 1990 || annee > 2100) {
    return Response.json({ erreur: "Annee invalide" }, { status: 400 });
  }
  if (filiere.length > 80) {
    return Response.json({ erreur: "Filiere trop longue" }, { status: 400 });
  }

  const epreuve = await prisma.epreuve.update({
    where: { id },
    data: { titre, type, niveau, filiere: filiere || null, matiere, annee },
  });

  return Response.json({ message: "Epreuve modifiee", epreuve });
}
