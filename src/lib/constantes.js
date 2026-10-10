export const NIVEAUX = [
  { valeur: "LICENCE_1", label: "Licence 1" },
  { valeur: "LICENCE_2", label: "Licence 2" },
  { valeur: "LICENCE_3", label: "Licence 3" },
  { valeur: "MASTER_1", label: "Master 1" },
  { valeur: "MASTER_2", label: "Master 2" },
  { valeur: "CONCOURS", label: "Concours" },
  { valeur: "EXAMEN_NATIONAL", label: "Examen national" },
];

export const NIVEAUX_ACADEMIQUES = ["LICENCE_1", "LICENCE_2", "LICENCE_3", "MASTER_1", "MASTER_2"];

export const VALEURS_NIVEAU = NIVEAUX.map((n) => n.valeur);

export const LABELS_NIVEAU = Object.fromEntries(NIVEAUX.map((n) => [n.valeur, n.label]));

export const FILIERES = [
  "Finance, Comptabilite et Audit",
  "Banque, Finance et Assurance",
  "Marketing, Communication et Commerce",
  "Gestion des Ressources Humaines",
  "Transport et Logistique",
  "Entrepreneuriat et Gestion des Projets",
  "Tourisme et Hotellerie",
  "Journalisme",
  "Genie Informatique",
  "Reseaux Informatiques et Telecommunications",
];

export const TYPES_DOCUMENT = [
  { valeur: "EPREUVE", label: "Epreuve" },
  { valeur: "COURS", label: "Cours" },
  { valeur: "EXAMEN", label: "Examen" },
  { valeur: "CONCOURS", label: "Concours" },
];

export const VALEURS_TYPE = TYPES_DOCUMENT.map((t) => t.valeur);
