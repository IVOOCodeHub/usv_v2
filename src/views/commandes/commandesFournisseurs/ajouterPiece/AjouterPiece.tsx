// styles
import "./ajouterPiece.scss";


// hooks | libraries
import {ReactElement} from "react";
import {useNavigate, NavigateFunction, useParams} from "react-router-dom";

// components
import Header from "../../../../components/header/Header";
import Button from "../../../../components/button/Button";
import Select from "react-select";
import Footer from "../../../../components/footer/Footer";
import WithAuth from "../../../auth/WithAuth";

function AjouterPiece(): ReactElement {
    const navigate: NavigateFunction = useNavigate();
    const { commandeID } = useParams();

    return (
        <>
            <Header
                props={{
                    pageURL:
                        "G_IVOO | Commandes Fournisseurs | Commandes à valider | Ajouter un article",
                    helpBtn: true,
                }}
            />
                <main id={"ajouterPiece"}>
                    <div className={"goBackBtnWrapper"}>
                        <section className={"middleSide"}>
                            <form>
                                <h2>Ajouter un article à la commande {commandeID}</h2>
                                <div className={"formWrapper"}>
                                    <div className={"inputWrapper"}>
                                        <label htmlFor={"ref"}>Référence article :</label>
                                        <input type={'text'} id={"ref"} />
                                    </div>
                                    <div className={"inputWrapper"}>
                                        <label htmlFor={"Libelle"}>Libellé :</label>
                                        <input type={'text'} id={"Libelle"} />
                                    </div>
                                    <div className={"inputWrapper"}>
                                        <label htmlFor={"Qte"}>Quantité :</label>
                                        <input type={'number'} id={"Qte"} />
                                    </div>
                                    <div className={"inputWrapper"}>
                                        <label htmlFor={"prixHT"}>Prix unit. HT :</label>
                                        <input type={'number'} id={"prixHT"} />
                                    </div>
                                    <div className={"inputWrapper"}>
                                        <label htmlFor={"tauxTVA"}>Taux TVA :</label>
                                        <Select
                                            id={"tauxTVA"}
                                            options={[
                                                { value: "1", label: "Sans TVA" },
                                                { value: "2", label: "2.10%" },
                                                { value: "3", label: "5.50%" },
                                                { value: "3", label: "etc" },
                                            ]}
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
                                                    `/commandes/commandes_fournisseurs/creation_commandes`,
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
                                                    "/commandes/commandes_fournisseurs/creation_commandes",
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

const AjouterPiecesWithAuth: (
    props: object,
) => ReactElement | null = WithAuth(AjouterPiece);
export default AjouterPiecesWithAuth;
