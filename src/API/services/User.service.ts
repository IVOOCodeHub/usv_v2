// utils
import { isOnProduction } from "../../utils/scripts/utils.ts";

// types
import { AxiosResponse } from "axios";
import { IUser, IUserCredentials } from "../../utils/types/user.interface.ts";

// model
import { userModel } from "../models/user.model.ts";

// API
import { postRequest } from "../APICalls.ts";

export const getUserService: (
  userCredentials: IUserCredentials,
) => Promise<IUser | string> = async (
  userCredentials: IUserCredentials,
): Promise<IUser | string> => {
  const endpoint: string = isOnProduction ? "/user/:id" : "/getUser.php";

  const res: AxiosResponse | { errorMessage: string } = await postRequest(
    endpoint,
    userCredentials,
  );

  if ("errorMessage" in res) {
    console.error(new Error(res.errorMessage));
    switch (res.errorMessage) {
      case "Invalid credentials":
        return "Identifiant ou mot de passe incorrect.";
      case "User not found":
        return "Utilisateur non trouvé.";
      default:
        return "Une erreur est survenue. Veillez réessayer plus tard.";
    }
  }

  return userModel(res.data);
};
