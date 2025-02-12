import {ICourrier} from "./courrier.interface.ts";

export interface ICourrierToAffect {
  action: string;
  auteurSaisie: string;
  auteurStatut: string;
  canal: string;
  classement1: string;
  cle: string;
  cleCompta: string;
  cleOriginal: string;
  clePaiement: string;
  clePrevision: string;
  cleService: string;
  cleServiceCopie: string;
  codeFournisseurSocieteDestinataire: string;
  codeFournisseurSocieteEmettrice: string;
  codeOperationCompta: string;
  commentaire: string;
  comptaASaisir: string;
  comptaSaisi: string;
  datePaction: string;
  datePiece: string;
  dhSaisie: string;
  dhStatut: string;
  distributionDirecte: string;
  marque: string;
  matMark: string;
  matricule: string;
  nature: string;
  nomFichier: string;
  original: string;
  partageDrive: string;
  priorite: string;
  refDoc: string;
  sens: string;
  service: string;
  serviceCopie: string;
  site: string;
  societe: string;
  societeEmettrice: string;
  ssUnitOrg: string;
  statut: string;
  tacheAssociee: string;
  typeCourrier: string;
  unitOrg: string;
}

export interface ILitigeDossier {
  cle: string;
  societe: string;
  tiers: string;
  nom: string;
  commentaire: string;
  auteur: string;
  dhCreation: string;
  conseil: string;
  theme: string;
  multiple: string;
  statut: string;
  dateDebut: string;
  courriers?: ICourrier[];
  courrier?: ICourrier
}