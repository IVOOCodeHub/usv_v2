// styles
import "./commandesModif.scss";


// hooks | libraries
import {ReactElement, useState} from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

// components
import Header from "../../../../components/header/Header";
import Button from "../../../../components/button/Button";
import Select from "react-select";
import Footer from "../../../../components/footer/Footer";
import WithAuth from "../../../auth/WithAuth";

function CommandesModif(): ReactElement {
    type OptionType = { value: number; label: string };

    const navigate: NavigateFunction = useNavigate();
    const [isReadOnly] = useState(true);
    const dataSociete1 = {
        id: "62639",
        societe: "IVOO",
        fournisseur: "Mr Pizza",
        dateLivraison: "2025-07-22",
        prefixeEcriture: "Restaurant",
        objet: "Achat de Pizzas",
        totalTTC: "500",
        reception: 0,
        commentaire: "Achat de PizzasAchat de PizzasAchat de PizzasAchat de Pizzas",
        acompte: 10
    };
    const options: OptionType[] = [
        { value: 0, label: "BB" },
        { value: 1, label: "Nelly" },
        { value: 2, label: "etc" },
    ];

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
                            <h2>Modification de la commande {dataSociete1.id}</h2>
                            <div className={"formWrapper"}>
                                <div className={"inputWrapper"}>
                                    <label htmlFor={"societe"}>Société :</label>
                                    <input
                                        type="text"
                                        id="societe"
                                        className={"readOnly"}
                                        value={dataSociete1.societe}
                                        readOnly={isReadOnly}
                                    />
                                </div>
                                <div className={"inputWrapper"}>
                                    <label htmlFor={"fournisseurs"}>Fournisseurs :</label>
                                    <input
                                        type="text"
                                        id="fournisseurs"
                                        className={"readOnly"}
                                        value={dataSociete1.fournisseur}
                                        readOnly={isReadOnly}
                                    />
                                </div>
                                <div className={"inputWrapper"}>
                                    <label htmlFor={"prefixeEcriture"}>Préfixe écriture :</label>
                                    <input
                                        type="text"
                                        id="prefixeEcriture"
                                        className={"readOnly"}
                                        value={dataSociete1.prefixeEcriture}
                                        readOnly={isReadOnly}
                                    />
                                </div>
                                <div className={"inputWrapper"}>
                                    <label htmlFor={"objet"}>Objet :</label>
                                    <input type={"text"} id={"objet"} defaultValue={dataSociete1.objet} />
                                </div>
                                <div className={"inputWrapper"}>
                                    <label htmlFor={"dateLivraison"}>Date de Livraison :</label>
                                    <input type={"date"} id={"dateLivraison"} defaultValue={dataSociete1.dateLivraison}/>
                                </div>
                                <div className={"inputWrapper"}>
                                    <label htmlFor={"modeReglement"}>Mode de règlement :</label>
                                    <Select
                                        options={[
                                            { value: "caisse", label: "Caisse"  },
                                            { value: "CB", label: "Carte Bleue" },
                                            { value: "chq", label: "Chèque" },
                                            { value: "virement", label: "Virement" },
                                        ]}
                                        id={"modeReglement"}
                                    />
                                </div>

                                <div className={"inputWrapper"}>
                                    <label htmlFor={"totalTTC"}>total TTC (en €) :</label>
                                    <input type={"number"} id={"totalTTC"} value={dataSociete1.totalTTC} readOnly={isReadOnly} />
                                </div>
                                <div className={"inputWrapper"}>
                                    <label htmlFor={"acompte"}>Acompte (en €) :</label>
                                    <input type={"number"} id={"acompte"} defaultValue={dataSociete1.acompte} />
                                </div>

                                <div className="inputWrapper">
                                    <label htmlFor="reception">Reception :</label>
                                    <Select
                                        defaultValue={options.find((option: OptionType) => option.value === dataSociete1.reception) || options[0]}
                                        options={options}
                                        id="reception"
                                    />
                                </div>
                                <div className={"inputWrapper"}>
                                    <label htmlFor={"commentaire"}>Commentaire</label>
                                    <textarea defaultValue={dataSociete1.commentaire}></textarea>
                                </div>
                            </div>
                            <div className={"buttonContainer"}>
                                <Button
                                    props={{
                                        style: "green",
                                        text: "Enregistrer",
                                        type: "button",
                                    }}
                                /><Button
                                    props={{
                                        style: "green",
                                        text: "Accepter",
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
                <div className={"goBackBtnWrapper"}>

                </div>
            </main>
            <Footer />
        </>
    );
}

const CommandesModifWithAuth: (
    props: object,
) => ReactElement | null = WithAuth(CommandesModif);
export default CommandesModifWithAuth;
