// styles
import "./creationCommandes.scss";


// hooks | libraries
import {ReactElement, useState} from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

// components
import Header from "../../../../components/header/Header";
import Button from "../../../../components/button/Button";
import Select from "react-select";
import Footer from "../../../../components/footer/Footer";
import WithAuth from "../../../auth/WithAuth";

function CreationCommandes(): ReactElement {
    const navigate: NavigateFunction = useNavigate();
    const [acompte, setAcompte] = useState(false);
    const [montantAcompte, setMontantAcompte] = useState("");

    return (
        <>
            <Header
                props={{
                    pageURL:
                        "G_IVOO | Commandes Fournisseurs | Création Commandes",
                    helpBtn: true,
                }}
            />
                <main id={"creationCommandes"}>
                    <div className={"goBackBtnWrapper"}>
                        <section className={"middleSide"}>
                            <form>
                                <h2>Créer une nouvelle commande</h2>
                                <div className={"formWrapper"}>
                                        <div className={"inputWrapper"}>
                                            <label htmlFor={"societe"}>Société :</label>
                                            <Select
                                                id={"societe"}
                                                options={[
                                                    { value: "1", label: "BB" },
                                                    { value: "2", label: "FLEURIAU" },
                                                    { value: "3", label: "ETC" },
                                                ]}
                                            />
                                        </div>
                                        <div className={"inputWrapper"}>
                                            <label htmlFor={"fournisseurs"}>Fournisseurs :</label>
                                            <Select
                                                id={"fournisseurs"}
                                                options={[
                                                    { value: "1", label: "A Montain" },
                                                    { value: "2", label: "Agence N" },
                                                    { value: "3", label: "ETC" },
                                                ]}
                                            />
                                        </div>
                                        <div className={"inputWrapper"}>
                                            <label htmlFor={"objet"}>Objet :</label>
                                            <input type={"text"} id={"objet"} />
                                        </div>
                                        <div className={"inputWrapper"}>
                                            <label htmlFor={"paiementCommande"}>Paiement à la commande :</label>
                                            <Select
                                                options={[
                                                    { value: "0", label: "Non" },
                                                    { value: "1", label: "Oui" },
                                                ]}
                                                id={"paiementCommande"}
                                            />
                                        </div>
                                        <div className="inputWrapper">
                                            <label htmlFor="acompte">Acompte :</label>
                                            <Select
                                                options={[
                                                    { value: "false", label: "Non" },
                                                    { value: "true", label: "Oui" },
                                                ]}
                                                id="acompte"
                                                onChange={(selectedOption) => {
                                                    if (selectedOption) {
                                                        setAcompte(selectedOption.value === "true");
                                                    }
                                                }}
                                            />
                                        </div>
                                        {acompte && (
                                            <div className="inputWrapper">
                                                <label htmlFor="acompteMontant">Montant de l'acompte (en €) :</label>
                                                <input
                                                    type="number"
                                                    id="acompteMontant"
                                                    value={montantAcompte}
                                                    onChange={(e) => setMontantAcompte(e.target.value)}
                                                />
                                            </div>
                                        )}
                                        <div className={"inputWrapper"}>
                                            <label htmlFor={"modeReglement"}>Mode de règlement :</label>
                                            <Select
                                                options={[
                                                    { value: "caisse", label: "Caisse" },
                                                    { value: "CB", label: "Carte Bleue" },
                                                    { value: "chq", label: "Chèque" },
                                                    { value: "virement", label: "Virement" },
                                                ]}
                                                id={"modeReglement"}
                                            />
                                        </div>
                                        <div className={"inputWrapper"}>
                                            <label htmlFor={"dateLivraison"}>Date de Livraison :</label>
                                            <input type={"date"} id={"dateLivraison"} />
                                        </div>
                                        <div className={"inputWrapper"}>
                                            <label htmlFor={"prefixeEcriture"}>Préfixe écriture :</label>
                                            <Select
                                                options={[
                                                    { value: "0", label: "ASSURANCE" },
                                                    { value: "1", label: "CAFE" },
                                                    { value: "2", label: "SUPPORT" },
                                                    { value: "3", label: "ETC" },
                                                ]}
                                                id={"prefixeEcriture"}
                                            />
                                        </div>
                                        <div className={"inputWrapper"}>
                                            <label htmlFor={"commentaire"}>Commentaire</label>
                                            <textarea></textarea>
                                        </div>
                                    </div>
                                <div className={"buttonContainer"}>
                                    <Button
                                        props={{
                                            style: "green",
                                            text: "Enregistrer",
                                            type: "button",
                                        }}
                                    />
                                    <Button
                                        props={{
                                            style: "grey",
                                            text: "Retour",
                                            type: "button",
                                            onClick: (): void =>
                                                navigate(
                                                    "/commandes/commandes_fournisseurs",
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

const CreationCommandesWithAuth: (
    props: object,
) => ReactElement | null = WithAuth(CreationCommandes);
export default CreationCommandesWithAuth;
