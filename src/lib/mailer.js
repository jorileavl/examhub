import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function envoyerEmailBienvenue(destinataire, nom) {
  await transporter.sendMail({
    from: "\"ExamHECM\" <" + process.env.EMAIL_USER + ">",
    to: destinataire,
    subject: "Bienvenue sur ExamHECM !",
    html: "<div style=\"font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;\">" +
      "<h1 style=\"color: #1d4ed8;\">Bienvenue, " + nom + " !</h1>" +
      "<p>Votre compte ExamHECM a bien ete cree.</p>" +
      "<p>Pour activer definitivement votre compte, vous devez publier une premiere epreuve, cours, examen ou concours. Une fois examinee et validee par un administrateur, votre compte sera active.</p>" +
      "<p style=\"margin-top: 24px;\"><a href=\"" + process.env.NEXTAUTH_URL + "/publier\" style=\"background: #1d4ed8; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block;\">Publier une epreuve</a></p>" +
      "<p style=\"color: #888; font-size: 13px; margin-top: 32px;\">ExamHECM - La plateforme pour retrouver epreuves, cours, examens et concours.</p>" +
      "</div>",
  });
}

export async function envoyerEmailReinitialisation(destinataire, lienReinitialisation) {
  await transporter.sendMail({
    from: "\"ExamHECM\" <" + process.env.EMAIL_USER + ">",
    to: destinataire,
    subject: "Reinitialisation de votre mot de passe ExamHECM",
    html: "<div style=\"font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;\">" +
      "<h1 style=\"color: #1d4ed8;\">Reinitialisation du mot de passe</h1>" +
      "<p>Vous avez demande a reinitialiser votre mot de passe sur ExamHECM.</p>" +
      "<p style=\"margin-top: 24px;\"><a href=\"" + lienReinitialisation + "\" style=\"background: #1d4ed8; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block;\">Choisir un nouveau mot de passe</a></p>" +
      "<p style=\"color: #888; font-size: 13px; margin-top: 16px;\">Ce lien expire dans 1 heure. Si vous n avez pas demande cette reinitialisation, ignorez cet email.</p>" +
      "</div>",
  });
}
