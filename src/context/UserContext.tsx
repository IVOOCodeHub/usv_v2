// types
import { ReactElement } from "react";
import { IUser, IUserCredentials } from "../utils/types/user.interface.ts";
interface IUserContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  getUser: (userCredentials: IUserCredentials) => Promise<void>;
  credentialsErrorMessage: string;
  setCredentialsErrorMessage: (errorMessage: string) => void;
}

// hooks | libraries
import { createContext, useState, Context, useContext } from "react";

// context
import { LoaderContext } from "./LoaderContext.tsx";

// services
import { getUserService } from "../API/services/User.service.ts";

export const UserContext: Context<IUserContext> = createContext<IUserContext>({
  user: null,
  setUser: (): void => {},
  getUser: async (): Promise<void> => {},
  credentialsErrorMessage: "",
  setCredentialsErrorMessage: (): void => {},
});

export const UserProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const { startLoading, stopLoading } = useContext(LoaderContext);
  const [user, setUser] = useState<IUser | null>(null);
  const [credentialsErrorMessage, setCredentialsErrorMessage] =
    useState<string>("");

  const getUser: (userCredentials: IUserCredentials) => Promise<void> = async (
    userCredentials: IUserCredentials,
  ): Promise<void> => {
    startLoading();

    // add a timer to avoid flashing du to loader if datas fetch is instant
    await new Promise((resolve: (value: unknown) => void): number =>
      setTimeout(resolve, 500),
    );

    const res: IUser | string = await getUserService(userCredentials);
    if (typeof res === "string") {
      setCredentialsErrorMessage(res);
    } else {
      setUser(res);
    }

    stopLoading();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        getUser,
        credentialsErrorMessage,
        setCredentialsErrorMessage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
