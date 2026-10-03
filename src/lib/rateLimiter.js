// Stockage en memoire des tentatives (reinitialise a chaque redemarrage du serveur)
const tentativesConnexion = new Map();
const compteurRequetes = new Map();

const MAX_TENTATIVES = 5;
const DUREE_BLOCAGE_MS = 15 * 60 * 1000; // 15 minutes

export function verifierBlocageConnexion(email) {
  const entree = tentativesConnexion.get(email);
  if (!entree) return { bloque: false };

  if (entree.bloqueJusqua && Date.now() < entree.bloqueJusqua) {
    const minutesRestantes = Math.ceil((entree.bloqueJusqua - Date.now()) / 60000);
    return { bloque: true, minutesRestantes };
  }

  return { bloque: false };
}

export function enregistrerEchecConnexion(email) {
  const entree = tentativesConnexion.get(email) || { echecs: 0, bloqueJusqua: null };
  entree.echecs += 1;

  if (entree.echecs >= MAX_TENTATIVES) {
    entree.bloqueJusqua = Date.now() + DUREE_BLOCAGE_MS;
    entree.echecs = 0;
  }

  tentativesConnexion.set(email, entree);
}

export function reinitialiserTentativesConnexion(email) {
  tentativesConnexion.delete(email);
}

// Rate limiting simple par IP pour les routes publiques (inscription, liste epreuves)
export function verifierLimiteRequetes(cle, maxRequetes = 20, fenetreMs = 60 * 1000) {
  const maintenant = Date.now();
  const entree = compteurRequetes.get(cle);

  if (!entree || maintenant > entree.reinitialisationA) {
    compteurRequetes.set(cle, { compte: 1, reinitialisationA: maintenant + fenetreMs });
    return { autorise: true };
  }

  if (entree.compte >= maxRequetes) {
    return { autorise: false, attenteSecondes: Math.ceil((entree.reinitialisationA - maintenant) / 1000) };
  }

  entree.compte += 1;
  return { autorise: true };
}
