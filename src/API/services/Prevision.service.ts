// utils
import { isOnProduction } from "../../utils/scripts/utils.ts";

// hooks | libraries
import { AxiosResponse } from "axios";

// types
import { IUserCredentials } from "../../utils/types/user.interface.ts";
import { IServerPrevision, previsionModel } from "../models/prevision.model.ts";
import { IPrevision } from "../../utils/types/prevision.interface.ts";

// API
import { postRequest } from "../APICalls.ts";

export const getPrevisionOrdonnanceService = async (
  userCredentials: IUserCredentials,
  dateEcheance: string,
): Promise<IPrevision[] | string> => {
  /* const endpoint: string = isOnProduction
    ? "read_previsions_a_ordonnancer"
    : "/tresorerie/getPrevisionOrdonancer.php"; */

  const endpoint: string = "http://192.168.0.112:8800/api/storedProcedure";

  const data = {
    userCredentials,
    date_min: dateMin,
    date_max: dateMax,
  };

  console.log("data –>", data);
  const reqBody = {
    userID: userCredentials.matricule,
    password: userCredentials.password,
    request: "read_previsions_a_ordonnancer",
    args: data,
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
        return "Utilisateur non trouvé.";
      default:
        return "Une erreur inattendue c'est produite.";
    }
  }

  return res.data.map((prevision: IServerPrevision): IPrevision => {
    return previsionModel(prevision);
  });
};
