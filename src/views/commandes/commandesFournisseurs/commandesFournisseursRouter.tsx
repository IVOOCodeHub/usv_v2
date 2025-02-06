//  types
import { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";

// views
import CreationCommandesWithAuth from "./creationCommandes/creationCommandes.tsx";
import CommandesAValiderWithAuth from "./commandesAValider/commandesAValider.tsx";
import CommandesModifWithAuth from "./commandesModif/commandesModif.tsx";

export default function CommandesFournisseursRouter() : ReactElement {
    return (
        <Routes>
            <Route path={"/creation_commandes"} element={<CreationCommandesWithAuth/>}/>
            <Route path={"/commandes_a_valider"} element={<CommandesAValiderWithAuth/>}/>
            <Route path={"/commandes_a_valider/:commandeID"} element={<CommandesModifWithAuth/>}/>
        </Routes>
    );
}