import {
  createContext,
  ReactElement,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

// Définition des types pour le contexte
interface SiteContextType {
  selectedSite: { groupe: string; site: string } | null;
  setSelectedSite: Dispatch<
    SetStateAction<{ groupe: string; site: string } | null>
  >;
}

// Création du contexte avec des types explicites
export const SiteContext = createContext<SiteContextType>({
  selectedSite: null,
  setSelectedSite: () => {},
});

export const SiteProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const [selectedSite, setSelectedSite] = useState<{
    groupe: string;
    site: string;
  } | null>(null);

  return (
    <SiteContext.Provider value={{ selectedSite, setSelectedSite }}>
      {children}
    </SiteContext.Provider>
  );
};
