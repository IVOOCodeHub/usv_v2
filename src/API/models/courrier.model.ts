import { ICourrierDepenses } from "../../utils/types/courrier.interface.ts";

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
    dhSaisie: serverCourrierDepenses.dh_saisie,
    nature: serverCourrierDepenses.nature,
    service: serverCourrierDepenses.service,
    societe: serverCourrierDepenses.societe,
    societeEmettrice: serverCourrierDepenses.societe_emettrice,
    statut: serverCourrierDepenses.statut,
  };
};
