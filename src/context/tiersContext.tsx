// custom types
import { IUserCredentials } from "../utils/types/user.interface.ts";
import { ITiersPrevisions } from "../utils/types/tiers.interface.ts";

interface ITiersContext {
  tiersPrevisions: ITiersPrevisions[] | string | null;
  setTiersPrevisions: (tiersPrevisions: ITiersPrevisions[] | null) => void;
  getTiersPrevisions: (
    userCredentials: IUserCredentials,
    refSourceTiers: string
  ) => Promise<ITiersPrevisions[] | string>;
}

// hooks | libraries
import { createContext, useState, Context, ReactElement } from "react";

// services
import { getTiersPrevisionsServices } from "../API/services/Tiers.service.ts";

export const TiersContext: Context<ITiersContext> =
  createContext<ITiersContext>({
    tiersPrevisions: null,
    setTiersPrevisions: (): void => {},
    getTiersPrevisions: async (): Promise<ITiersPrevisions[] | string> => {
      return [];
    },
  });

export const TiersProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const [tiersPrevisions, setTiersPrevisions] = useState<
    ITiersPrevisions[] | string | null
  >(null);

  const getTiersPrevisions: (
    userCredentials: IUserCredentials,
    refSourceTiers: string
  ) => Promise<ITiersPrevisions[] | string> = async (
    userCredentials: IUserCredentials,
    refSourceTiers: string
  ): Promise<ITiersPrevisions[] | string> => {
    const res: ITiersPrevisions[] | string =
      await getTiersPrevisionsServices(userCredentials, refSourceTiers);
    setTiersPrevisions(res);
    return res;
  };

  return (
    <TiersContext.Provider
      value={{
        tiersPrevisions,
        setTiersPrevisions,
        getTiersPrevisions,
      }}
    >
      {children}
    </TiersContext.Provider>
  );
};
