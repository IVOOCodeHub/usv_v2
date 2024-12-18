import { createContext, Context } from "react";
import { IUserCredentials } from "../../utils/types/user.interface.ts";
import { IPrevision } from "../../utils/types/prevision.interface.ts";

interface IPrevisionContext {
  previsionsOrdonnance: IPrevision[] | string | null;
  setPrevisionsOrdonnance: (previsions: IPrevision[] | null) => void;
  getPrevisionOrdonnance: (
    userCredentials: IUserCredentials,
    dateEcheance: string,
  ) => Promise<IPrevision[] | string>;
}

export const PrevisionContext: Context<IPrevisionContext> =
  createContext<IPrevisionContext>({
    previsionsOrdonnance: null,
    setPrevisionsOrdonnance: (): void => {},
    getPrevisionOrdonnance: async (): Promise<IPrevision[] | string> => {
      return [];
    },
  });
