import { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";

// views
import AffectationCourrierWithAuth from "./affectationCourrier/AffectationCourrier";
import ListeDossiersLitigesWithAuth from "./listeDossiersLitiges/ListeDossiersLitiges";

export default function LitigesRouter(): ReactElement {
    return (
        <Routes>
            <Route path={"affectation_courrier"} element={<AffectationCourrierWithAuth />} />
            <Route path={"liste_dossiers"} element={<ListeDossiersLitigesWithAuth />} />
        </Routes>
    )
}