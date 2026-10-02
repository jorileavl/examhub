import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Identifiants",
      credentials: {
        email: { label: "Email", type: "email" },
        motDePasse: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) throw new Error("Utilisateur introuvable");

        const valide = await bcrypt.compare(credentials.motDePasse, user.motDePasse);
        if (!valide) throw new Error("Mot de passe incorrect");

        if (user.statutCompte === "BLOQUE") {
          throw new Error("Votre compte a ete bloque");
        }

        return {
          id: user.id,
          nom: user.nom,
          email: user.email,
          role: user.role,
          statutCompte: user.statutCompte,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.statutCompte = user.statutCompte;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.id;
      session.user.statutCompte = token.statutCompte;
      return session;
    },
  },
  pages: {
    signIn: "/connexion",
  },
};
