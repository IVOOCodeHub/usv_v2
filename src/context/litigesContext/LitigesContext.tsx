// hooks | libraries
import { Context, createContext, Dispatch, SetStateAction } from "react";
import { IUserCredentials } from "../../utils/types/user.interface.ts";
import { ICourrierToAffect, ILitigeDossier } from "../../utils/types/litiges.interface.ts";

interface ILitigesContext {
  courrierToAffect: ICourrierToAffect[] | null;
  setCourrierToAffect: Dispatch<SetStateAction<ICourrierToAffect[] | null>>;
  getCourrierToAffect: (userCredentials: IUserCredentials) => Promise<void>;
  litigesDossiers: ILitigeDossier[] | null;
  setLitigesDossiers: Dispatch<SetStateAction<ILitigeDossier[] | null>>;
  getLitigesDossiers: (userCredentials: IUserCredentials) => Promise<void>;
}

const defaultLitigesContext: ILitigesContext = {
  courrierToAffect: null,
  setCourrierToAffect: (): Dispatch<
    SetStateAction<ICourrierToAffect[] | null>
  > => ({}) as Dispatch<SetStateAction<ICourrierToAffect[] | null>>,
  getCourrierToAffect: async (): Promise<void> => {},
  litigesDossiers: null,
  setLitigesDossiers: (): Dispatch<SetStateAction<ILitigeDossier[] | null>> =>
    ({}) as Dispatch<SetStateAction<ILitigeDossier[] | null>>,
  getLitigesDossiers: async (): Promise<void> => {},
};

export const LitigesContext: Context<ILitigesContext> =
  createContext<ILitigesContext>(defaultLitigesContext);
