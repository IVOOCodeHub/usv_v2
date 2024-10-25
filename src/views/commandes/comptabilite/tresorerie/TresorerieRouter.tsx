// types
import { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";

// views
import TresorerieMenu from "./tresorerieMenu/TresorerieMenu.tsx";
import CourrierDepenses from "./courrierDepenses/CourrierDepenses.tsx";

export default function TresorerieRouter(): ReactElement {
  return (
    <Routes>
      <Route path={"menu"} element={<TresorerieMenu />} />
      <Route path={"courrier_depenses"} element={<CourrierDepenses />} />
    </Routes>
  );
}
