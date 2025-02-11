// hooks | libraries
import { Context, createContext, Dispatch, SetStateAction } from "react";
import { IUser, IUserCredentials } from "../../utils/types/user.interface.ts";

interface IUserContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  getUser: (userCredentials: IUserCredentials) => Promise<void>;
  credentialsErrorMessage: string;
  setCredentialsErrorMessage: Dispatch<SetStateAction<string>>;
  userCredentials: IUserCredentials | null;
}

const defaultUserContext: IUserContext = {
  user: null,
  setUser: (): Dispatch<SetStateAction<IUser | null>> =>
    ({}) as Dispatch<SetStateAction<IUser | null>>,
  getUser: async (): Promise<void> => {},
  credentialsErrorMessage: "",
  setCredentialsErrorMessage: (): Dispatch<SetStateAction<string>> =>
    ({}) as Dispatch<SetStateAction<string>>,
  userCredentials: null,
};

export const UserContext: Context<IUserContext> =
  createContext<IUserContext>(defaultUserContext);
