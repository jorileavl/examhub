-- CreateEnum
CREATE TYPE "Role" AS ENUM ('UTILISATEUR', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "StatutCompte" AS ENUM ('EN_ATTENTE', 'VALIDE', 'REJETE');

-- CreateEnum
CREATE TYPE "StatutEpreuve" AS ENUM ('EN_ATTENTE', 'VALIDEE', 'REJETEE');

-- CreateEnum
CREATE TYPE "Niveau" AS ENUM ('CI', 'CP', 'CE1', 'CE2', 'CM1', 'CM2', 'SIXIEME', 'CINQUIEME', 'QUATRIEME', 'TROISIEME', 'SECONDE', 'PREMIERE', 'TERMINALE', 'UNIVERSITE', 'CONCOURS', 'EXAMEN_NATIONAL');

-- CreateEnum
CREATE TYPE "TypeDocument" AS ENUM ('EPREUVE', 'COURS', 'EXAMEN', 'CONCOURS');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "motDePasse" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'UTILISATEUR',
    "statutCompte" "StatutCompte" NOT NULL DEFAULT 'EN_ATTENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Epreuve" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "type" "TypeDocument" NOT NULL DEFAULT 'EPREUVE',
    "niveau" "Niveau" NOT NULL,
    "filiere" TEXT,
    "matiere" TEXT NOT NULL,
    "annee" INTEGER NOT NULL,
    "fichierUrl" TEXT NOT NULL,
    "statut" "StatutEpreuve" NOT NULL DEFAULT 'EN_ATTENTE',
    "auteurId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Epreuve_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Epreuve" ADD CONSTRAINT "Epreuve_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
