// utils
import { isOnProduction } from "../../utils/scripts/utils.ts";

// hooks | libraries
import { AxiosResponse } from "axios";

// API
import { postRequest } from "../APICalls.ts";

export const getPrevisionOrdonanceService = async (
  userCredentials,
  dateEcheance,
) => {
  const endpoint: string = isOnProduction
    ? "mdr"
    : "/tresorerie/getPrevisionOrdonancer.php";

  const data = {
    userCredentials,
    dateEcheance: dateEcheance,
  };

  console.log("data –>", data);

  const res: AxiosResponse | { errorMessage: string } = await postRequest(
    endpoint,
    data,
  );

  if ("errorMessage" in res) {
    console.error(new Error(res.errorMessage));
    switch (res.errorMessage) {
      case "invalid_credentials":
        return { errorMessage: "invalid_credentials" };
      case "invalid_user":
        return { errorMessage: "invalid_user" };
      case "invalid_password":
        return { errorMessage: "invalid_password" };
      default:
        return { errorMessage: "unexpected error" };
    }
  }

  return res.data;
};
