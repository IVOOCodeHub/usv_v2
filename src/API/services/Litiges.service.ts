import { isOnProduction } from "../../utils/scripts/utils.ts";

import { AxiosResponse } from "axios";
import { IUserCredentials } from "../../utils/types/user.interface.ts";
import {
  ICourrierToAffect,
  ILitigeDossier,
} from "../../utils/types/litiges.interface.ts";
import {
  courrierToAffectModel,
  IServerCourrierToAffect,
  IServerLitigeDossier,
  litigeDossierModel,
} from "../models/litiges.model.ts";

import { postRequest } from "../APICalls.ts";

export const getCourrierToAffectService = async (
  userCredentials: IUserCredentials,
) => {
  const endpoint: string = `http://192.168.0.112:8800/api/storedProcedure`;

  const reqBody = {
    userID: userCredentials.matricule,
    password: userCredentials.password,
    request: "read_litige_courrier",
    args: null,
    test: isOnProduction,
  };

  const res: AxiosResponse | { errorMessage: string } = await postRequest(
    endpoint,
    reqBody,
  );

  if ("errorMessage" in res) {
    console.error(new Error(res.errorMessage));
    switch (res.errorMessage) {
      case "Invalid credentials":
        return "Identifiants ou mot de passe incorrects";
      case "User not found":
        return "Utilisateur non trouvé.";
      default:
        return "Une erreur inattendue s'est produite.";
    }
  }

  return res.data.data.rows.map(
    (courrier: IServerCourrierToAffect): ICourrierToAffect => {
      return courrierToAffectModel(courrier);
    },
  );
};

export const getLitigesDossiersService = async (
  userCredentials: IUserCredentials,
) => {
  const endpoint: string = `http://192.168.0.112:8800/api/storedProcedure`;

  const reqBody = {
    userID: userCredentials.matricule,
    password: userCredentials.password,
    request: "read_litige_dossier",
    args: null,
    test: isOnProduction,
  };

  const res: AxiosResponse | { errorMessage: string } = await postRequest(
    endpoint,
    reqBody,
  );

  if ("errorMessage" in res) {
    console.error(new Error(res.errorMessage));
    switch (res.errorMessage) {
      case "Invalid credentials":
        return "Identifiants ou mot de passe incorrects";
      case "User not found":
        return "Utilisateur non trouvé.";
      default:
        return "Une erreur inattendue s'est produite.";
    }
  }

  return res.data.data.data.data.rows.map(
    (dossier: IServerLitigeDossier): ILitigeDossier => {
      return litigeDossierModel(dossier);
    },
  );
};
