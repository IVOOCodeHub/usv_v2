//  types
import { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";

// views
import CreationCommandesWithAuth from "./creationCommandes/CreationCommandes";
import CommandesAValiderWithAuth from "./commandesAValider/CommandesAValider";
import CommandesModifWithAuth from "./commandesModif/CommandesModif";
import UtilitaireCommandesWithAuth from "./utilitaireCommandes/UtilitaireCommandes";
import ModificationCommandeWithAuth from "./modificationCommande/ModificationCommande";
import VoirPiecesWithAuth from "./voirPieces/VoirPieces"
import AjouterPiecesWithAuth from "./ajouterPiece/AjouterPiece";
import ModifierPieceWithAuth from "./modifierPiece/ModifierPiece";

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
            <Route path={'/utilitaire_commandes/modification_commande/:commandeID'} element={<ModificationCommandeWithAuth />} />
        </Routes>
)}