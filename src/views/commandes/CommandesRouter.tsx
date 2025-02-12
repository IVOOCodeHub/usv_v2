import { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";

// views
import GestCommandesEtFactureMenuWithAuth from "./gestCommandesEtFactures/GestCommandesEtFacturesMenu.tsx";
import GestionDesCourriersMenuWithAuth from "./gestionDesCourriers/GestionDesCourriersMenu.tsx";
import CommandesFournisseursMenuWithAuth from "./commandesFournisseurs/CommandesFournisseursMenu.tsx";
import ComptaChoixWithAuth from "./comptabilite/ComptaChoix.tsx";
import LitigesMenuWithAuth from "./litiges/litigesMenu/LitigesMenu.tsx";

// router
import GestCommandesEtFacturesRouter from "./gestCommandesEtFactures/GestCommandesEtFacturesRouter.tsx";
import TresorerieRouter from "./comptabilite/tresorerie/TresorerieRouter.tsx";
import CourriersRouter from "./gestionDesCourriers/CourriersRouter.tsx";
import CommandesFournisseursRouter from "./commandesFournisseurs/CommandesFournisseursRouter.tsx";
import LitigesRouter from "./litiges/LitigesRouter.tsx";

export default function CommandesRouter(): ReactElement {
  return (
    <Routes>
      {/* Gestion des courriers */}
      <Route
        path={"gestion_des_courriers"}
        element={<GestionDesCourriersMenuWithAuth />}
      />
      <Route path={"gestion_des_courriers/*"} element={<CourriersRouter />} />

      {/* Commandes fournisseurs */}
      <Route
        path={"commandes_fournisseurs"}
        element={<CommandesFournisseursMenuWithAuth />}
      />
      <Route
        path={"commandes_fournisseurs/*"}
        element={<CommandesFournisseursRouter />}
      />

      {/* Gestion des commandes et factures */}
      <Route
        path={"gestion_commandes_et_factures"}
        element={<GestCommandesEtFactureMenuWithAuth />}
      />
      <Route
        path={"gestion_commandes_et_factures/*"}
        element={<GestCommandesEtFacturesRouter />}
      />

      {/* Comptabilité */}
      <Route path={"compta_choix"} element={<ComptaChoixWithAuth />} />

      {/* Tresorerie sub compta application */}
      <Route path={"tresorerie/*"} element={<TresorerieRouter />} />

      {/* Litiges */}
      <Route path={"litiges"} element={<LitigesMenuWithAuth />} />
      <Route path={"litiges/*"} element={<LitigesRouter />} />
    </Routes>
  );
}
