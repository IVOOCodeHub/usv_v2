// hooks \ libraries
import { useState, useMemo, ReactElement } from "react";

// custom types
import { IUserCredentials } from "../../utils/types/user.interface.ts";
import { IPrevision } from "../../utils/types/prevision.interface.ts";

// context
import { PrevisionContext } from "./PrevisionContext.tsx";

// services
import { getPrevisionOrdonnanceService } from "../../API/services/Prevision.service.ts";

export const PrevisionProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const [previsionsOrdonnance, setPrevisionsOrdonnance] = useState<
    IPrevision[] | string | null
  >(null);

  const getPrevisionOrdonnance: (
    userCredentials: IUserCredentials,
    dateMin: string,
    dateMax: string,
  ) => Promise<IPrevision[] | string> = async (
    userCredentials: IUserCredentials,
    dateMin: string,
    dateMax: string,
  ): Promise<IPrevision[] | string> => {
    const res: IPrevision[] | string = await getPrevisionOrdonnanceService(
      userCredentials,
        dateMin,
        dateMax
    );
    setPrevisionsOrdonnance(res);
    return res;
  };

  const contextValue = useMemo(
    () => ({
      previsionsOrdonnance,
      setPrevisionsOrdonnance,
      getPrevisionOrdonnance,
    }),
    [previsionsOrdonnance],
  );

  return (
    <PrevisionContext.Provider value={contextValue}>
      {children}
    </PrevisionContext.Provider>
  );
};
