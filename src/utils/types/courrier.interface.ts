export interface ICourrierDepenses {
  action: string;
  auteurSaisie: string;
  index: string;
  commentaire: string;
  dhSaisie: string;
  nature: string;
  service: string;
  societe: string;
  societeEmettrice: string;
  statut: string;
  fileName: string;
}

export interface ICourrier {
  cle: string;
  societe: string;
  societeEmettrice: string;
  codeFournisseurSocieteEmettrice: string;
  codeFournisseurSocieteDestinataire: string;
  site: string;
  typeCourrier: string;
  nature: string;
  canal: string;
  dhSaisie: string;
  refDoc: string;
  unitOrg: string;
  ssUnitOrg: string;
  service: string;
  cleService: string;
  serviceCopie: string;
  cleServiceCopie: string;
  sens: string;
  statut: string;
  dhStatut: string;
  auteurStatut: string;
  nomFichier: string;
  auteurSaisie: string;
  commentaire: string;
  action: string;
  datePaction: string;
  classement1: string;
  classementNiv1: string;
  classementNiv2: string;
  classementNiv3: string;
  priorite: string;
  matricule: string;
  comptaASaisir: string;
  comptaSaisi: string;
  marque: string;
  clePrevision: string;
  clePaiement: string;
  cleCompta: string;
  distributionDirecte: string;
  datePiece: string;
  codeOperationCompta: string;
  original: string;
  cleOriginal: string;
  partageDrive: string;
  copieDriveLe: string;
  recuLe: string;
  matMark: string;
  tacheAssociee: string;
}

export interface IPaginationParams {
  offset: number;
  limit: number;
  search: string;
}
