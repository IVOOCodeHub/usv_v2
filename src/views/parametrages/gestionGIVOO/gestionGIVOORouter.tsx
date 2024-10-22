import { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";

// views
import GestionDesAccesGIVOO from "./gestionDesAccesGIVOO/GestionDesAccesGIVOO.tsx";
import GestionDesAccesMenusGIVOO from "./gestionDesAccesMenuGIVOO/GestionDesAccesMenuGIVOO.tsx";

export default function GestionGIVOORouter(): ReactElement {
  return (
    <Routes>
      <Route path="acces" element={<GestionDesAccesGIVOO />} />
      <Route path="menu" element={<GestionDesAccesMenusGIVOO />}
      />
    </Routes>
  );
}
