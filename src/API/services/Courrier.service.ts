// utils
import { isOnProduction } from "../../utils/scripts/utils.ts";

// types
import { AxiosResponse } from "axios";
import { IUserCredentials } from "../../utils/types/user.interface.ts";
import {
	ICourrier,
	ICourrierDepenses,
	IPaginationParams,
} from "../../utils/types/courrier.interface.ts";
import {
  courrierModel,
  courrierDepensesModel,
  IServerCourrier,
  IServerCourrierDepenses,
} from "../models/courrier.model.ts";

// API
import { postRequest } from "../APICalls.ts";

export const getCourrierService = async (
  userCredentials: IUserCredentials,
  courrierID: string,
) => {
  const endpoint: string = isOnProduction ? "loulz" : "/ivoo/getCourrier.php";

  const data = {
    userCredentials,
    cle_courrier: courrierID,
  };

  const res: AxiosResponse | { errorMessage: string } = await postRequest(
    endpoint,
    data,
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

  return courrierModel(res.data as IServerCourrier);
};

export const getCourriersService = async (
  userCredentials: IUserCredentials,
  paginationParams: IPaginationParams,
) => {
  const endpoint: string = `http://192.168.0.112:8800/api/storedProcedure`;

  const reqBody = {
    userID: userCredentials.matricule,
    password: userCredentials.password,
    request: "read_list_ivoo_courrier",
    args: paginationParams,
    test: true,
  };

  const res: AxiosResponse | { errorMessage: string } = await postRequest(
    endpoint,
    reqBody,
  );

  if ("errorMessage" in res) {
    console.error(res.errorMessage);
    switch (res.errorMessage) {
      case "Invalid credentials":
        return "Identifiants ou mot de passe incorrects";
      case "User not found":
        return "utilisateur non trouvé.";
      default:
        return "Une erreur inattendue s'est produite.";
    }
  }

  return res.data["data"]["rows"].map((courrier: IServerCourrier): ICourrier => {
    return courrierModel(courrier)
  });
};

export const getCourrierDepensesService = async (
  userCredentials: IUserCredentials,
): Promise<ICourrierDepenses[] | string> => {
  const endpoint: string = "http://192.168.0.112:8800/api/storedProcedure";

  const reqBody = {
    userID: userCredentials.matricule,
    password: userCredentials.password,
    request: "read_courrier_depenses",
    args: null,
    test: true,
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
        return "utilisateur non trouvé.";
      default:
        return "Une erreur inattendue s'est produite.";
    }
  }

  return res.data["data"]["rows"].map(
    (courrier: IServerCourrierDepenses): ICourrierDepenses => {
      return courrierDepensesModel(courrier);
    },
  );
};

export const getCourrierTiersPrevisionService = async (
  userCredentials: IUserCredentials,
): Promise<ICourrierDepenses[] | string> => {
  const endpoint: string = "http://192.168.0.112:8800/api/storedProcedure";

  const reqBody = {
    userID: userCredentials.matricule,
    password: userCredentials.password,
    request: "read_list_courriers_distribues_a_traiter",
    args: null,
    test: true,
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
        return "utilisateur non trouvé.";
      default:
        return "Une erreur inattendue s'est produite.";
    }
  }

  return res.data["data"]["rows"].map(
    (courrier: IServerCourrierDepenses): ICourrierDepenses => {
      return courrierDepensesModel(courrier);
    },
  );
};
