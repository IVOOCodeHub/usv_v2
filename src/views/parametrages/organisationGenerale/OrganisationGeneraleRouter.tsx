import { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";

// views
import OrganisationGeneraleMenuWithAuth from "./organisationGeneraleMenu/OrganisationGeneraleMenu.tsx";
import GestionDesServicesDestinatairesWithAuth from "./gestionDesServicesDestinataires/GestionDesServicesDestinataires";

export default function OrganisationGeneraleRouter(): ReactElement {
  return (
    <Routes>
      <Route path={"/"} element={<OrganisationGeneraleMenuWithAuth />} />
        <Route path={'gestion_services_destinataires'} element={<GestionDesServicesDestinatairesWithAuth />} />
    </Routes>
  );
}
