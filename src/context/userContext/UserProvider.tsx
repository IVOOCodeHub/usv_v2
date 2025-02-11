// hooks | libraries
import { ReactElement, useState, useMemo } from "react";

// custom types
import { IUser, IUserCredentials } from "../../utils/types/user.interface.ts";

// services
import { getUserService } from "../../API/services/User.service.ts";

// context
import { UserContext } from "./UserContext.tsx";

export const UserProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const [user, setUser] = useState<IUser | null>(null);
  const [credentialsErrorMessage, setCredentialsErrorMessage] =
    useState<string>("");
  const [userCredentials, setUserCredentials] =
    useState<IUserCredentials | null>(null);

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
        password: res.password,
      };
      setUserCredentials(credentials);
    }
  };

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      getUser,
      credentialsErrorMessage,
      setCredentialsErrorMessage,
      userCredentials,
    }),
    [user, userCredentials, credentialsErrorMessage],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
