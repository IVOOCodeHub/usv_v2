// types
import { createContext, useState, Context, ReactElement } from "react";
import { IUser, IUserCredentials } from "../utils/types/user.interface.ts";
interface IUserContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void
  getUser: (userCredentials: IUserCredentials) => Promise<void>;
}

// services
import { getUserService } from "../API/services/User.service.ts";

export const UserContext: Context<IUserContext> = createContext<IUserContext>({
  user: null,
  setUser: (): void => {},
  getUser: async (): Promise<void> => {},
});

export const UserProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const [user, setUser] = useState<IUser | null>(null);

  const getUser: (userCredentials: IUserCredentials) => Promise<void> = async (
    userCredentials: IUserCredentials,
  ): Promise<void> => {
    const res: IUser = await getUserService(userCredentials);
    setUser(res);
  };

  return (
    <UserContext.Provider value={{ user, setUser, getUser }}>
      {children}
    </UserContext.Provider>
  );
};
