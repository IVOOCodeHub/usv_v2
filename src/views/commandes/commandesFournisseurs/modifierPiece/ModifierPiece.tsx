// styles
import "./modifierPiece.scss";


// hooks | libraries
import {ReactElement} from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

// components
import Header from "../../../../components/header/Header";
import Button from "../../../../components/button/Button";
import Select from "react-select";
import Footer from "../../../../components/footer/Footer";
import WithAuth from "../../../auth/WithAuth";

function ModifierPiece(): ReactElement {
    type OptionType = { value: number; label: string };
    const navigate: NavigateFunction = useNavigate();
    const mockPiece = {
        ref: "1",
        libelle: "Pizza",
        qte: "50",
        prixht: "21.00",
        tauxtva: 2
    }
    const options: OptionType[] = [
        { value: 0, label: "Sans TVA" },
        { value: 1, label: "2.10%" },
        { value: 2, label: "5.50%" },
        { value: 3, label: "etc" },
    ];
    return (
        <>
            <Header
                props={{
                    pageURL:
                        "G_IVOO | Commandes Fournisseurs | Commandes à valider | Ajouter un article",
                    helpBtn: true,
                }}
            />
                <main id={"modifierPiece"}>
                    <div className={"goBackBtnWrapper"}>
                        <section className={"middleSide"}>
                            <form>
                                <h2>Modifier l'article à la commande 3337</h2>
                                <div className={"formWrapper"}>
                                    <div className={"inputWrapper"}>
                                        <label htmlFor={"ref"}>Référence article :</label>
                                        <input type={'text'} id={"ref"} defaultValue={mockPiece.ref} />
                                    </div>
                                    <div className={"inputWrapper"}>
                                        <label htmlFor={"Libelle"}>Libellé :</label>
                                        <input type={'text'} id={"Libelle"} defaultValue={mockPiece.libelle} />
                                    </div>
                                    <div className={"inputWrapper"}>
                                        <label htmlFor={"Qte"}>Quantité :</label>
                                        <input type={'number'} id={"Qte"} defaultValue={mockPiece.qte} />
                                    </div>
                                    <div className={"inputWrapper"}>
                                        <label htmlFor={"prixHT"}>Prix unit. HT :</label>
                                        <input type={'number'} id={"prixHT"} defaultValue={mockPiece.prixht} />
                                    </div>
                                    <div className={"inputWrapper"}>
                                        <label htmlFor={"tauxTVA"}>Taux TVA :</label>
                                        <Select
                                            defaultValue={options.find((option: OptionType) => option.value === mockPiece.tauxtva) || options[0]}
                                            options={options}
                                            id={"tauxTVA"}

                                        />
                                    </div>
                                </div>
                                <div className={"buttonContainer"}>
                                    <Button
                                        props={{
                                            style: "green",
                                            text: "Enregistrer",
                                            type: "button",
                                            onClick: (): void =>
                                                navigate(
                                                    "/commandes/commandes_fournisseurs/creation_commandes/567",
                                                ),
                                        }}
                                    />
                                    <Button
                                        props={{
                                            style: "red",
                                            text: "Supprimer",
                                            type: "button",
                                            onClick: (): void =>
                                                navigate(
                                                    "/commandes/commandes_fournisseurs/creation_commandes/567",
                                                ),
                                        }}
                                    />
                                    <Button
                                        props={{
                                            style: "grey",
                                            text: "Retour",
                                            type: "button",
                                            onClick: (): void =>
                                                navigate(
                                                    "/commandes/commandes_fournisseurs/creation_commandes/567",
                                                ),
                                        }}
                                    />
                                </div>
                            </form>

                        </section>
                    </div>
                </main>
            <Footer />
        </>
    );
}

const ModifierPieceWithAuth: (
    props: object,
) => ReactElement | null = WithAuth(ModifierPiece);
export default ModifierPieceWithAuth;
