//  types
import { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";

// views
import CreationCommandesWithAuth from "./creationCommandes/creationCommandes.tsx";
import CommandesAValiderWithAuth from "./commandesAValider/commandesAValider.tsx";
import CommandesModifWithAuth from "./commandesModif/commandesModif.tsx";


import {UtilitaireCommandesWithAuth} from "./utilitaireCommandes/UtilitaireCommandes.tsx";
import VoirPiecesWithAuth from "./voirPieces/voirPieces.tsx"
import AjouterPiecesWithAuth from "./ajouterPiece/ajouterPiece.tsx";
import ModifierPieceWithAuth from "./modifierPiece/modifierPiece.tsx";

export default function CommandesFournisseursRouter() : ReactElement {
    return (
        <Routes>
            <Route path={"/creation_commandes"} element={<CreationCommandesWithAuth/>}/>
            <Route path={"/commandes_a_valider"} element={<CommandesAValiderWithAuth/>}/>
            <Route path={"/commandes_a_valider/:commandeID"} element={<CommandesModifWithAuth/>}/>
            <Route path={"/commandes_a_valider/voir_pieces/:commandeID"} element={<VoirPiecesWithAuth/>}/>
            <Route path={"/commandes_a_valider/ajouter_piece/:commandeID"} element={<AjouterPiecesWithAuth/>}/>
            <Route path={"/commandes_a_valider/modifier_piece/:commandeID"} element={<ModifierPieceWithAuth/>}/>


            <Route path={'/utilitaire_commandes'} element={<UtilitaireCommandesWithAuth />} />
        </Routes>
    );
}