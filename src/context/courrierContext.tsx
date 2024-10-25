// types
import { ReactElement } from "react";
import { ICourrierDepenses } from "../utils/types/courrier.interface.ts";
import { IUserCredentials } from "../utils/types/user.interface.ts";

interface ICourrierContext {
  courrierDepenses: ICourrierDepenses[] | string | null;
  setCourrierDepenses: (courrierDepenses: ICourrierDepenses[] | null) => void;
  getCourrierDepenses: (
    userCredentials: IUserCredentials,
  ) => Promise<ICourrierDepenses[] | string>;
}

// hooks | libraries
import { createContext, useState, Context } from "react";

// services
import { getCourrierDepensesService } from "../API/services/Courrier.service.ts";

export const CourrierContext: Context<ICourrierContext> =
  createContext<ICourrierContext>({
    courrierDepenses: null,
    setCourrierDepenses: (): void => {},
    getCourrierDepenses: async (): Promise<ICourrierDepenses[] | string> => {
      return [];
    },
  });

export const CourrierProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const [courrierDepenses, setCourrierDepenses] = useState<
    ICourrierDepenses[] | string | null
  >(null);

  const getCourrierDepenses: (
    userCredentials: IUserCredentials,
  ) => Promise<ICourrierDepenses[] | string> = async (
    userCredentials: IUserCredentials,
  ): Promise<ICourrierDepenses[] | string> => {
    const res: ICourrierDepenses[] | string =
      await getCourrierDepensesService(userCredentials);
    setCourrierDepenses(res);
    return res;
  };

  return (
    <CourrierContext.Provider
      value={{
        courrierDepenses,
        setCourrierDepenses,
        getCourrierDepenses,
      }}
    >
      {children}
    </CourrierContext.Provider>
  );
};
