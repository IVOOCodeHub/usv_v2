import { CourrierContext, ICourrierContext } from "./CourrierContext.tsx";
import { IUserCredentials } from "../../utils/types/user.interface.ts";
import { IPaginationParams } from "../../utils/types/courrier.interface.ts";

// hooks | libraries
import { useState, ReactElement, useMemo } from "react";

// services
import {
  getCourrierDepensesService,
  getCourrierService,
  getCourriersService,
} from "../../API/services/Courrier.service.ts";
import {
  ICourrier,
  ICourrierDepenses,
} from "../../utils/types/courrier.interface.ts";

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
    paginationParams: IPaginationParams,
  ): Promise<ICourrier[] | string> => {
    const res: ICourrier[] | string = await getCourriersService(
      userCredentials,
      paginationParams,
    );
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

  const contextValue: ICourrierContext = useMemo(
    () => ({
      courrier,
      getCourrier,
      courriers,
      setCourriers,
      getCourriers,
      courrierDepenses,
      setCourrierDepenses,
      getCourrierDepenses,
    }),
    [courrier, courriers, courrierDepenses],
  );

  return (
    <CourrierContext.Provider value={contextValue}>
      {children}
    </CourrierContext.Provider>
  );
};
