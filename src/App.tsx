// types
import { ReactElement } from "react";

// hooks | libraries
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// views
import Auth from "./views/auth/Auth";
import TestPage from "./views/testPage/TestPage";
import MenuSite from "./views/general/menuSite/MenuSite.tsx";
import MenuGeneral from "./views/general/menuGeneral/MenuGeneral.tsx";

function App(): ReactElement {
  return (
    <Router basename={"usv_v2"}>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path={"auth"} element={<Auth />} />
        <Route path={"menu_site"} element={<MenuSite />} />
        <Route path={"menu_general"} element={<MenuGeneral />} />
        <Route path={"*"} element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
