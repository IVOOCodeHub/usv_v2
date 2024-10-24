import { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";

// views
import ComptaChoix from "./comptabilite/ComptaChoix.tsx";

// router
import TresorerieRouter from "./comptabilite/tresorerie/TresorerieRouter.tsx";

export default function CommandesRouter(): ReactElement {
  return (
    <Routes>
      <Route path={"compta_choix"} element={<ComptaChoix />} />
      {/* Tresorerie sub application */}
      <Route path={"tresorerie/*"} element={<TresorerieRouter />} />
    </Routes>
  );
}
