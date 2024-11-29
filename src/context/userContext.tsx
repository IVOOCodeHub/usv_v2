// types
import { ReactElement } from "react";
import { IUser, IUserCredentials } from "../utils/types/user.interface.ts";
interface IUserContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  getUser: (userCredentials: IUserCredentials) => Promise<void>;
  credentialsErrorMessage: string;
  setCredentialsErrorMessage: (errorMessage: string) => void;
  userCredentials: IUserCredentials | null;
}

// hooks | libraries
import { createContext, useState, Context } from "react";

// services
import { getUserService } from "../API/services/User.service.ts";

export const UserContext: Context<IUserContext> = createContext<IUserContext>({
  user: null,
  setUser: (): void => {},
  getUser: async (): Promise<void> => {},
  credentialsErrorMessage: "",
  setCredentialsErrorMessage: (): void => {},
  userCredentials: null,
});

export const UserProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const [user, setUser] = useState<IUser | null>(null);
  const [credentialsErrorMessage, setCredentialsErrorMessage] =
    useState<string>("");
  const [userCredentials, setUserCredentials] = useState<IUserCredentials | null>(null)

  const getUser: (userCredentials: IUserCredentials) => Promise<void> = async (
    userCredentials: IUserCredentials,
  ): Promise<void> => {
    // add a timer to avoid flashing du to loader if datas fetch is instant
    await new Promise((resolve: (value: unknown) => void): number =>
      setTimeout(resolve, 500),
    );

    const res: IUser | string = await getUserService(userCredentials);
    if (typeof res === "string") {
      setCredentialsErrorMessage(res);
    } else {
      setUser(res);
      const credentials = {
        matricule: res.matricule,
        password: res.password
      }
      setUserCredentials(credentials)
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        getUser,
        credentialsErrorMessage,
        setCredentialsErrorMessage,
        userCredentials
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
