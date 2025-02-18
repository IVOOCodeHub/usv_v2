// types
import { ReactElement } from "react";

// hooks | libraries
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// views
import Auth from "./views/auth/Auth";
import MenuSite from "./views/general/menuSite/MenuSite.tsx";
import MenuGeneral from "./views/general/menuGeneral/MenuGeneral.tsx";

// router
import GestionGIVOORouter from "./views/parametrages/gestionGIVOO/GestionGIVOORouter.tsx";
import CommandesRouter from "./views/commandes/CommandesRouter.tsx";
import OrganisationGeneraleRouter from "./views/parametrages/organisationGenerale/OrganisationGeneraleRouter.tsx";
import GestionInformatiqueRouter from "./views/gestionInformatique/GestionInformatiqueRouter.tsx";

function App(): ReactElement {
  return (
    <Router basename={"usv_v2"}>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path={"auth"} element={<Auth />} />
        <Route path={"menu_site"} element={<MenuSite />} />
        <Route path={"menu_general"} element={<MenuGeneral />} />

        {/* Paramétrages sub application */}
        <Route path={"organisation_generale/*"} element={<OrganisationGeneraleRouter />} />
        <Route path={"gestion_givoo/*"} element={<GestionGIVOORouter />} />
        {/* Commandes sub application */}
        <Route path={"commandes/*"} element={<CommandesRouter />} />
        {/*<Route path={"gestion_informatique/*"} element={<GestionInformatiqueRouter />} />*/}
      </Routes>
    </Router>
  );
}

export default App;
