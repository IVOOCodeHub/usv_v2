import { createContext } from "react";

export const PrevisionContext = createContext({
  previsions: null,
  setPrevisions: (): void => {},
  getPrevisionOrdonance: async (): Promise<void> => {},
});
