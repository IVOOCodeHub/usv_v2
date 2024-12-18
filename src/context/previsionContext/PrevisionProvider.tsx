// hooks \ libraries
import { useState, useMemo, ReactElement } from "react";

// context
import { PrevisionContext } from "./PrevisionContext.tsx";

// services
import { getPrevisionOrdonanceService } from "../../API/services/Prevision.service.ts";

export const PrevisionProvider = ({ children }): ReactElement => {
  const [previsions, setPrevisions] = useState([]);

  const getPrevisionOrdonance = async (userCredentials, dateEcheance) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const res = await getPrevisionOrdonanceService(
        userCredentials,
        dateEcheance,
      );
      setPrevisions(res);
    } catch (error) {
      console.error("Error while getting file :", error);
      setPrevisions(null);
    }
  };

  const contextValue = useMemo(
    () => ({
      previsions,
      getPrevisionOrdonance,
    }),
    [previsions],
  );

  return (
    <PrevisionContext.Provider value={contextValue}>
      {children}
    </PrevisionContext.Provider>
  );
};
