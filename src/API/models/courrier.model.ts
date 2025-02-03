// custom types
import {
  ICourrier,
  ICourrierDepenses,
} from "../../utils/types/courrier.interface.ts";

// utils
import { convertENDateToFr } from "../../utils/scripts/utils.ts";

export interface IServerCourrier {
  cle: string;
  societe: string;
  societe_emettrice: string;
  code_fournisseur_societe_emettrice: string;
  code_fournisseur_societe_destinataire: string;
  site: string;
  type_courrier: string;
  nature: string;
  canal: string;
  dh_saisie: string;
  ref_doc: string;
  unit_org: string;
  ss_unit_org: string;
  service: string;
  cle_service: string;
  service_copie: string;
  cle_service_copie: string;
  sens: string;
  statut: string;
  dh_statut: string;
  auteur_statut: string;
  nom_fichier: string;
  auteur_saisie: string;
  commentaire: string;
  action: string;
  date_paction: string;
  classement1: string;
  classement_niv1: string;
  classement_niv2: string;
  classement_niv3: string;
  priorite: string;
  matricule: string;
  compta_a_saisir: string;
  compta_saisi: string;
  marque: string;
  cle_prevision: string;
  cle_paiement: string;
  cle_compta: string;
  distribution_directe: string;
  date_piece: string;
  code_operation_compta: string;
  original: string;
  cle_original: string;
  partage_drive: string;
  copie_drive_le: string;
  recu_le: string;
  mat_mark: string;
  tache_associee: string;
}

export const courrierModel: (serverCourrier: IServerCourrier) => ICourrier = (
  serverCourrier: IServerCourrier,
): ICourrier => {
  return {
    cle: serverCourrier.cle,
    societe: serverCourrier.societe,
    societeEmettrice: serverCourrier.societe_emettrice,
    codeFournisseurSocieteEmettrice:
      serverCourrier.code_fournisseur_societe_emettrice,
    codeFournisseurSocieteDestinataire:
      serverCourrier.code_fournisseur_societe_destinataire,
    site: serverCourrier.site,
    typeCourrier: serverCourrier.type_courrier,
    nature: serverCourrier.nature,
    canal: serverCourrier.canal,
    dhSaisie: convertENDateToFr(serverCourrier.dh_saisie),
    refDoc: serverCourrier.ref_doc,
    unitOrg: serverCourrier.unit_org,
    ssUnitOrg: serverCourrier.ss_unit_org,
    service: serverCourrier.service,
    cleService: serverCourrier.cle_service,
    serviceCopie: serverCourrier.service_copie,
    cleServiceCopie: serverCourrier.cle_service_copie,
    sens: serverCourrier.sens,
    statut: serverCourrier.statut,
    dhStatut: convertENDateToFr(serverCourrier.dh_statut),
    auteurStatut: serverCourrier.auteur_statut,
    nomFichier: serverCourrier.nom_fichier,
    auteurSaisie: serverCourrier.auteur_saisie,
    commentaire: serverCourrier.commentaire,
    action: serverCourrier.action,
    datePaction: convertENDateToFr(serverCourrier.date_paction),
    classement1: serverCourrier.classement1,
    classementNiv1: serverCourrier.classement_niv1,
    classementNiv2: serverCourrier.classement_niv2,
    classementNiv3: serverCourrier.classement_niv3,
    priorite: serverCourrier.priorite,
    matricule: serverCourrier.matricule,
    comptaASaisir: serverCourrier.compta_a_saisir,
    comptaSaisi: serverCourrier.compta_saisi,
    marque: serverCourrier.marque,
    clePrevision: serverCourrier.cle_prevision,
    clePaiement: serverCourrier.cle_paiement,
    cleCompta: serverCourrier.cle_compta,
    distributionDirecte: serverCourrier.distribution_directe,
    datePiece:
      serverCourrier.date_piece && serverCourrier.date_piece.trim() !== ""
        ? convertENDateToFr(serverCourrier.date_piece)
        : "NA",
    codeOperationCompta: serverCourrier.code_operation_compta,
    original: serverCourrier.original,
    cleOriginal: serverCourrier.cle_original,
    partageDrive: serverCourrier.partage_drive,
    copieDriveLe: convertENDateToFr(serverCourrier.copie_drive_le),
    recuLe: convertENDateToFr(serverCourrier.recu_le),
    matMark: serverCourrier.mat_mark,
    tacheAssociee: serverCourrier.tache_associee,
  };
};

export interface IServerCourrierDepenses {
  action: string;
  auteur_saisie: string;
  cle: string;
  commentaire: string;
  dh_saisie: string;
  nature: string;
  service: string;
  societe: string;
  societe_emettrice: string;
  statut: string;
  nom_fichier: string;
}

export const courrierDepensesModel: (
  serverCourrierDepenses: IServerCourrierDepenses,
) => ICourrierDepenses = (
  serverCourrierDepenses: IServerCourrierDepenses,
): ICourrierDepenses => {
  return {
    action: serverCourrierDepenses.action,
    auteurSaisie: serverCourrierDepenses.auteur_saisie,
    index: serverCourrierDepenses.cle,
    commentaire: serverCourrierDepenses.commentaire,
    dhSaisie: convertENDateToFr(serverCourrierDepenses.dh_saisie),
    nature: serverCourrierDepenses.nature,
    service: serverCourrierDepenses.service,
    societe: serverCourrierDepenses.societe,
    societeEmettrice: serverCourrierDepenses.societe_emettrice,
    statut: serverCourrierDepenses.statut,
    fileName: serverCourrierDepenses.nom_fichier,
  };
};
