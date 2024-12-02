// utils
import { isOnProduction } from "../../utils/scripts/utils.ts";

// types
import { AxiosResponse } from "axios";
import { IUserCredentials } from "../../utils/types/user.interface.ts";
import { ICourrierDepenses} from "../../utils/types/courrier.interface.ts";
import {courrierModel, IServerCourrier, IServerCourrierDepenses} from "../models/courrier.model.ts";

// model
import { courrierDepensesModel } from "../models/courrier.model.ts";

// API
import { postRequest } from "../APICalls.ts";

export const getCourrierService = async (userCredentials: IUserCredentials, courrierID: string) => {
  const endpoint: string = isOnProduction
  ? 'loulz'
  : '/ivoo/getCourrier.php'

  const data = {
    userCredentials,
    cle_courrier: courrierID
  }

  const res: AxiosResponse | {errorMessage: string} = await postRequest(endpoint, data)

  if ("errorMessage" in res) {
    console.error(new Error(res.errorMessage));
    switch (res.errorMessage) {
      case "Invalid credentials":
        return "Identifiants ou mot de passe incorrects";
      case "User not found":
        return "utilisateur non trouvé.";
      default:
        return "Une erreur inattendue s'est produite.";
    }
  }

  return courrierModel(res.data as IServerCourrier);
}

export const getCourrierDepensesService = async (
  userCredentials: IUserCredentials,
): Promise<ICourrierDepenses[] | string> => {
  // TODO : set production endpoint
  const endpoint: string = isOnProduction
    ? "lol"
    : "/tresorerie/getCourrierDepenses.php";

  const res: AxiosResponse | { errorMessage: string } = await postRequest(
    endpoint,
    userCredentials,
  );

  if ("errorMessage" in res) {
    console.error(new Error(res.errorMessage));
    switch (res.errorMessage) {
      case "Invalid credentials":
        return "Identifiants ou mot de passe incorrects";
      case "User not found":
        return "utilisateur non trouvé.";
      default:
        return "Une erreur inattendue s'est produite.";
    }
  }

  return res.data.map(
    (courrier: IServerCourrierDepenses): ICourrierDepenses => {
      return courrierDepensesModel(courrier);
    },
  );
};
