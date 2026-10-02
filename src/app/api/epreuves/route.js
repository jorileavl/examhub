export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ erreur: "Vous devez etre connecte" }, { status: 401 });
  }

  const formData = await req.formData();
  const fichier = formData.get("fichier");
  const titre = formData.get("titre");
  const type = formData.get("type");
  const niveau = formData.get("niveau");
  const filiere = formData.get("filiere");
  const matiere = formData.get("matiere");
  const annee = parseInt(formData.get("annee"));

  const bytes = await fichier.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const resultatUpload = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "raw", folder: "examhub" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });

  const epreuve = await prisma.epreuve.create({
    data: {
      titre,
      type,
      niveau,
      filiere,
      matiere,
      annee,
      fichierUrl: resultatUpload.secure_url,
      auteurId: session.user.id,
    },
  });

  return Response.json({ message: "Epreuve envoyee pour validation", epreuve });
}

export async function GET() {
  const epreuves = await prisma.epreuve.findMany({
    where: { statut: "VALIDEE" },
    orderBy: { createdAt: "desc" },
  });
  return Response.json(epreuves);
}
