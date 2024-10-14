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
) => Promise<IUser> = async (
  userCredentials: IUserCredentials,
): Promise<IUser> => {
  const endpoint: string = isOnProduction ? "/user/:id" : "/getUser.php";

  const res: AxiosResponse = await postRequest(endpoint, userCredentials);
  return userModel(res.data);
};
