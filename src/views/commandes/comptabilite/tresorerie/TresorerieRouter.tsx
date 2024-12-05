// types
import { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";

// views
import TresorerieMenuWithAuth from "./tresorerieMenu/TresorerieMenu.tsx";
import CourrierDepensesWithAuth from "./courrierDepenses/CourrierDepenses.tsx";
import CourrierConsultWithAuth from "./courrierConsult/CourrierConsult.tsx";
import CourrierRelanceWithAuth from "./courrierRelance/CourrierRelance.tsx";
import CourrierRequalificationWithAuth from "./courrierRequalification/CourrierRequalification.tsx";

export default function TresorerieRouter(): ReactElement {
  return (
    <Routes>
      <Route path={"menu"} element={<TresorerieMenuWithAuth />} />
      <Route path={"courrier_depenses"} element={<CourrierDepensesWithAuth />} />
      <Route path={"courrier_consult"} element={<CourrierConsultWithAuth />} />
      <Route path={"courrier_relance"} element={<CourrierRelanceWithAuth />} />
      <Route path={"courrier_requalification"} element={<CourrierRequalificationWithAuth />} />
    </Routes>
  );
}
