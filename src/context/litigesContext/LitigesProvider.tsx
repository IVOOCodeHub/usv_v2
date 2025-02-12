// hooks | libraries
import { ReactElement, useState, useMemo, useContext } from "react";

import { IUserCredentials } from "../../utils/types/user.interface.ts";

import {getCourrierToAffectService, getLitigesDossiersService} from "../../API/services/Litiges.service.ts";

// context
import { LitigesContext } from "./LitigesContext";
import { LoaderContext } from "../loaderContext";
import {
  ICourrierToAffect,
  ILitigeDossier,
} from "../../utils/types/litiges.interface.ts";

export const LitigesProvider = ({ children }: { children: ReactElement }) => {
  const { startLoading, stopLoading } = useContext(LoaderContext);
  const [courrierToAffect, setCourrierToAffect] = useState<
    ICourrierToAffect[] | null
  >(null);
  const [litigesDossiers, setLitigesDossiers] = useState<
      ILitigeDossier[] | null
  >(null);

  const getCourrierToAffect: (
    userCredentials: IUserCredentials,
  ) => Promise<void> = async (
    userCredentials: IUserCredentials,
  ): Promise<void> => {
    startLoading();
    await new Promise((resolve: (value: unknown) => void): number =>
      setTimeout(resolve, 500),
    );

    const res = await getCourrierToAffectService(userCredentials);
    if (!res.errorMessage) {
      setCourrierToAffect(res);
    }
    stopLoading();
  };

  const getLitigesDossiers: (
    userCredentials: IUserCredentials,
  ) => Promise<void> = async (
    userCredentials: IUserCredentials,
  ): Promise<void> => {
    startLoading();
    await new Promise((resolve: (value: unknown) => void): number =>
      setTimeout(resolve, 500),
    );

    const res = await getLitigesDossiersService(userCredentials);
    if (!res.errorMessage) {
      setLitigesDossiers(res);
    }
    stopLoading();
  };

  const contextValue = useMemo(
    () => ({
      courrierToAffect,
      setCourrierToAffect,
      getCourrierToAffect,
      litigesDossiers,
      setLitigesDossiers,
      getLitigesDossiers,
    }),
    [courrierToAffect, litigesDossiers],
  );

  return (
    <LitigesContext.Provider value={contextValue}>
      {children}
    </LitigesContext.Provider>
  );
};
