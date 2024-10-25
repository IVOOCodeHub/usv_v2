// utils
import { isOnProduction } from "../../utils/scripts/utils.ts";

// types
import { AxiosResponse } from "axios";
import { IUserCredentials } from "../../utils/types/user.interface.ts";
import { IServerCourrierDepenses } from "../models/courrier.model.ts";
import { ICourrierDepenses } from "../../utils/types/courrier.interface.ts";

// model
import { courrierDepensesModel } from "../models/courrier.model.ts";

// API
import { postRequest } from "../APICalls.ts";

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
