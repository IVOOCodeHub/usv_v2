// custom types
import { ICourrierDepenses } from "../../utils/types/courrier.interface.ts";

// utils
import { convertENDateToFr } from "../../utils/scripts/utils.ts";

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
