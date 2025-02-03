import { createContext, Context } from "react";
import { IUserCredentials } from "../../utils/types/user.interface.ts";
import { IPaginationParams } from "../../utils/types/courrier.interface.ts";
import {
  ICourrier,
  ICourrierDepenses,
} from "../../utils/types/courrier.interface.ts";

export interface ICourrierContext {
  courrier: ICourrier | string | null;
  getCourrier: (
    userCredentials: IUserCredentials,
    courrierID: string,
  ) => Promise<ICourrier | string>;
  courriers: ICourrier[] | string | null;
  getCourriers: (
    userCredentials: IUserCredentials,
    paginationParams: IPaginationParams,
  ) => Promise<ICourrier[] | string>;
  setCourriers: (courriers: ICourrier[] | null) => void;
  courrierDepenses: ICourrierDepenses[] | string | null;
  setCourrierDepenses: (courrierDepenses: ICourrierDepenses[] | null) => void;
  getCourrierDepenses: (
    userCredentials: IUserCredentials,
  ) => Promise<ICourrierDepenses[] | string>;
}

const defaultCourrierContext: ICourrierContext = {
  courrier: null,
  getCourrier: async (): Promise<ICourrier | string> => "",
  courriers: null,
  getCourriers: async (): Promise<ICourrier[] | string> => "",
  setCourriers: (): void => {},
  courrierDepenses: null,
  getCourrierDepenses: async (): Promise<ICourrierDepenses[] | string> => "",
  setCourrierDepenses: (): void => {},
};

export const CourrierContext: Context<ICourrierContext> =
  createContext<ICourrierContext>(defaultCourrierContext);
