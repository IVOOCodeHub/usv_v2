import { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";

// router
import GestionDeProjetsWithAuth from "./gestionDeProjets/GestionDeProjets.tsx";

export default function GestionInformatiqueRouter(): ReactElement {
  return (
    <Routes>
      {/* Gestion Informatique */}
      <Route
        path={"/gestion_de_projets"}
        element={<GestionDeProjetsWithAuth />} />
    </Routes>
  );
}
