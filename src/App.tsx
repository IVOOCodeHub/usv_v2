// types
import { ReactElement } from "react";

// hooks | libraries
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// views
import Auth from "./views/auth/Auth";
import TestPage from "./views/testPage/TestPage";
import MenuSite from "./views/general/menuSite/MenuSite.tsx";
import MenuGeneral from "./views/general/menuGeneral/MenuGeneral.tsx";

// router
import GestionGIVOORouter from "./views/parametrages/gestionGIVOO/gestionGIVOORouter.tsx";

function App(): ReactElement {
  return (
    <Router basename={"usv_v2"}>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path={"auth"} element={<Auth />} />
        <Route path={"menu_site"} element={<MenuSite />} />
        <Route path={"menu_general"} element={<MenuGeneral />} />

        {/* GestionGIVOO sub application */}
        <Route path={"gestion_givoo/*"} element={<GestionGIVOORouter />} />

        <Route path={"*"} element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
