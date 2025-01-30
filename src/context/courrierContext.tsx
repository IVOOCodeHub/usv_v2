//  custom types
import { IUserCredentials } from "../utils/types/user.interface.ts";

interface ICourrierContext {
  courrier: ICourrier | string | null;
  getCourrier: (
    userCredentials: IUserCredentials,
    courrierID: string,
  ) => Promise<ICourrier | string | undefined>;
  courriers: ICourrier[] | string | null;
  getCourriers: (
    userCredentials: IUserCredentials,
  ) => Promise<ICourrier[] | string | undefined>;
  setCourriers: (courriers: ICourrier[] | null) => void;
  courrierDepenses: ICourrierDepenses[] | string | null;
  setCourrierDepenses: (courrierDepenses: ICourrierDepenses[] | null) => void;
  getCourrierDepenses: (
    userCredentials: IUserCredentials,
  ) => Promise<ICourrierDepenses[] | string>;
}

// hooks | libraries
import { createContext, useState, Context, ReactElement } from "react";

// services
import {
  getCourrierDepensesService,
  getCourrierService,
  getCourriersService,
} from "../API/services/Courrier.service.ts";
import {
  ICourrier,
  ICourrierDepenses,
} from "../utils/types/courrier.interface.ts";

export const CourrierContext: Context<ICourrierContext> =
  createContext<ICourrierContext>({
    courrier: null,
    getCourrier: async (): Promise<ICourrier | string | undefined> => {
      return undefined;
    },
    courriers: null,
    getCourriers: async (): Promise<ICourrier[] | string | undefined> => {
      return undefined;
    },
    setCourriers: (): void => {},
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
  const [courrier, setCourrier] = useState<ICourrier | string | null>(null);
  const [courriers, setCourriers] = useState<ICourrier[] | string | null>(null);
  const [courrierDepenses, setCourrierDepenses] = useState<
    ICourrierDepenses[] | string | null
  >(null);

  const getCourriers = async (
    userCredentials: IUserCredentials,
  ): Promise<ICourrier[] | string> => {
    const res: ICourrier[] | string =
      await getCourriersService(userCredentials);
    setCourriers(res);
    return res;
  };

  const getCourrier = async (
    userCredentials: IUserCredentials,
    courrierID: string,
  ): Promise<ICourrier | string> => {
    const res: ICourrier | string = await getCourrierService(
      userCredentials,
      courrierID,
    );
    setCourrier(res);
    return res;
  };

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
        courrier,
        getCourrier,
        courriers,
        setCourriers,
        getCourriers,
      }}
    >
      {children}
    </CourrierContext.Provider>
  );
};
