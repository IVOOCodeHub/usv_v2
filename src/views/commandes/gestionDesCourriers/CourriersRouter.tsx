//  types
import { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";

// views
import NouveauxCourriersWithAuth from "./nouveauxCourriers/NouveauxCourriers.tsx";

export default function CourriersRouter(): ReactElement {
  return (
    <Routes>
        <Route path={"/nouveaux_courriers"} element={<NouveauxCourriersWithAuth />}></Route>
    </Routes>
  );
}
