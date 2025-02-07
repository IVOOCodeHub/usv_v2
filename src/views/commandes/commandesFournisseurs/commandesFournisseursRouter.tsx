//  types
import { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";

// views
import CreationCommandesWithAuth from "./creationCommandes/creationCommandes";
import CommandesAValiderWithAuth from "./commandesAValider/commandesAValider";
import CommandesModifWithAuth from "./commandesModif/commandesModif";
import UtilitaireCommandesWithAuth from "./utilitaireCommandes/UtilitaireCommandes";
import ModificationCommandeWithAuth from "./modificationCommande/ModificationCommande";

export default function CommandesFournisseursRouter() : ReactElement {
    return (
        <Routes>
            <Route path={"/creation_commandes"} element={<CreationCommandesWithAuth/>}/>
            <Route path={"/commandes_a_valider"} element={<CommandesAValiderWithAuth/>}/>
            <Route path={"/commandes_a_valider/:commandeID"} element={<CommandesModifWithAuth/>}/>
            <Route path={'/utilitaire_commandes'} element={<UtilitaireCommandesWithAuth />} />
            <Route path={'/utilitaire_commandes/modification_commande/:commandeID'} element={<ModificationCommandeWithAuth />} />
        </Routes>
    );
}