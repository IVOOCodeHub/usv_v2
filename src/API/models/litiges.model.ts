import {
  ICourrierToAffect,
  ILitigeDossier,
} from "../../utils/types/litiges.interface.ts";
import { ICourrier } from "../../utils/types/courrier.interface.ts";

export interface IServerCourrierToAffect {
  action: string;
  auteur_saisie: string;
  auteur_statut: string;
  canal: string;
  classement1: string;
  cle: string;
  cle_compta: string;
  cle_original: string;
  cle_paiement: string;
  cle_prevision: string;
  cle_service: string;
  cle_service_copie: string;
  code_fournisseur_societe_destinataire: string;
  code_fournisseur_societe_emettrice: string;
  code_operation_compta: string;
  commentaire: string;
  compta_a_saisir: string;
  compta_saisi: string;
  date_paction: string;
  date_piece: string;
  dh_saisie: string;
  dh_statut: string;
  distribution_directe: string;
  marque: string;
  mat_mark: string;
  matricule: string;
  nature: string;
  nom_fichier: string;
  original: string;
  partage_drive: string;
  priorite: string;
  ref_doc: string;
  sens: string;
  service: string;
  service_copie: string;
  site: string;
  societe: string;
  societe_emettrice: string;
  ss_unit_org: string;
  statut: string;
  tache_associee: string;
  type_courrier: string;
  unit_org: string;
}

export const courrierToAffectModel = (
  serverCourrierToAffect: IServerCourrierToAffect,
): ICourrierToAffect => {
  return {
    action: serverCourrierToAffect.action,
    auteurSaisie: serverCourrierToAffect.auteur_saisie,
    auteurStatut: serverCourrierToAffect.auteur_statut,
    canal: serverCourrierToAffect.canal,
    classement1: serverCourrierToAffect.classement1,
    cle: serverCourrierToAffect.cle,
    cleCompta: serverCourrierToAffect.cle_compta,
    cleOriginal: serverCourrierToAffect.cle_original,
    clePaiement: serverCourrierToAffect.cle_paiement,
    clePrevision: serverCourrierToAffect.cle_prevision,
    cleService: serverCourrierToAffect.cle_service,
    cleServiceCopie: serverCourrierToAffect.cle_service_copie,
    codeFournisseurSocieteDestinataire:
      serverCourrierToAffect.code_fournisseur_societe_destinataire,
    codeFournisseurSocieteEmettrice:
      serverCourrierToAffect.code_fournisseur_societe_emettrice,
    codeOperationCompta: serverCourrierToAffect.code_operation_compta,
    commentaire: serverCourrierToAffect.commentaire,
    comptaASaisir: serverCourrierToAffect.compta_a_saisir,
    comptaSaisi: serverCourrierToAffect.compta_saisi,
    datePaction: serverCourrierToAffect.date_paction,
    datePiece: serverCourrierToAffect.date_piece,
    dhSaisie: serverCourrierToAffect.dh_saisie,
    dhStatut: serverCourrierToAffect.dh_statut,
    distributionDirecte: serverCourrierToAffect.distribution_directe,
    marque: serverCourrierToAffect.marque,
    matMark: serverCourrierToAffect.mat_mark,
    matricule: serverCourrierToAffect.matricule,
    nature: serverCourrierToAffect.nature,
    nomFichier: serverCourrierToAffect.nom_fichier,
    original: serverCourrierToAffect.original,
    partageDrive: serverCourrierToAffect.partage_drive,
    priorite: serverCourrierToAffect.priorite,
    refDoc: serverCourrierToAffect.ref_doc,
    sens: serverCourrierToAffect.sens,
    service: serverCourrierToAffect.service,
    serviceCopie: serverCourrierToAffect.service_copie,
    site: serverCourrierToAffect.site,
    societe: serverCourrierToAffect.societe,
    societeEmettrice: serverCourrierToAffect.societe_emettrice,
    ssUnitOrg: serverCourrierToAffect.ss_unit_org,
    statut: serverCourrierToAffect.statut,
    tacheAssociee: serverCourrierToAffect.tache_associee,
    typeCourrier: serverCourrierToAffect.type_courrier,
    unitOrg: serverCourrierToAffect.unit_org,
  };
};

export interface IServerLitigeDossier {
  cle: string;
  societe: string;
  tiers: string;
  nom: string;
  commentaire: string;
  auteur: string;
  dh_creation: string;
  conseil: string;
  theme: string;
  multiple: string;
  statut: string;
  datedebut: string;
  courriers?: ICourrier[];
  courrier?: ICourrier;
}

export const litigeDossierModel = (
  serverLitigeDossier: IServerLitigeDossier,
): ILitigeDossier => {
  return {
    cle: serverLitigeDossier.cle,
    societe: serverLitigeDossier.societe,
    tiers: serverLitigeDossier.tiers,
    nom: serverLitigeDossier.nom,
    commentaire: serverLitigeDossier.commentaire,
    auteur: serverLitigeDossier.auteur,
    dhCreation: serverLitigeDossier.dh_creation,
    conseil: serverLitigeDossier.conseil,
    theme: serverLitigeDossier.theme,
    multiple: serverLitigeDossier.multiple,
    statut: serverLitigeDossier.statut,
    dateDebut: serverLitigeDossier.datedebut,
    courriers: serverLitigeDossier.courriers,
  };
};
