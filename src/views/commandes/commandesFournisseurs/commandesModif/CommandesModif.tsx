// styles
import "./commandesModif.scss";

// hooks | libraries
import {ReactElement, useEffect, useState} from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

// components
import Header from "../../../../components/header/Header";
import Button from "../../../../components/button/Button";
import Select from "react-select";
import Footer from "../../../../components/footer/Footer";
import WithAuth from "../../../auth/WithAuth";
import NRTL from "../../../../components/NRTL/NRTL.tsx";

function CommandesModif(): ReactElement {
    type OptionType = { value: number; label: string };

    const navigate: NavigateFunction = useNavigate();
    const [bodyArray, setBodyArray] = useState<string[][]>([]);
    const [isReadOnly] = useState(true);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
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
    useEffect((): void => {
        const mockupBody: string[][] = [
            [
                "1",
                "Pizza",
                "50",
                "21.00",
                "0.00",
                "21.00",
            ],
            [
                "2",
                "Trombones",
                "100",
                "11.00",
                "0.00",
                "21.00",
            ],
        ];
        setBodyArray(mockupBody);
    }, []);

    const tableData = {
        tableHead: ["Ref. article", "Description",  "Qté", "PU HT", "Taux TVA", "PU TTC"],
        tableBody: bodyArray,
    };

    return (
        <>
            <Header
                props={{
                    pageURL:
                        "G_IVOO | Commandes Fournisseurs | Modification Commandes",
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
                                        style: "blue",
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
                        {isPopupOpen && (
                            <div className="popupOverlay" id="updateServiceModal">
                                <form className={"updateServiceForm"}>
                                    <div className="popupContent">
                                        <h2>Télécharger une pièce pour la commande {dataSociete1.id}</h2>
                                        <div className={"formWrapper"}>
                                            <div className={"inputWrapper"}>
                                                <label htmlFor={"type"}>Type de document :</label>
                                                <Select
                                                    id={"type"}
                                                    options={[
                                                        { value: "1", label: "Devis" },
                                                        { value: "2", label: "Courrier" },
                                                        { value: "3", label: "Autre" },
                                                    ]}
                                                />
                                            </div>
                                        </div>
                                        <input type="file" />
                                        <div className={"buttonContainer"}>
                                            <Button
                                                props={{
                                                    style: "green",
                                                    text: "Ajouter",
                                                    type: "button",
                                                    onClick: (): void => setIsPopupOpen(false)
                                                }}
                                            />
                                            <Button
                                                props={{
                                                    style: "grey",
                                                    text: "Annuler",
                                                    type: "button",
                                                    onClick: (): void => setIsPopupOpen(false)
                                                }}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                        <div className={"buttonContainer"}>
                            <Button
                                props={{
                                    style: "red",
                                    text: "Supprimer",
                                    type: "button",
                                    onClick: (): void =>
                                        navigate(
                                            "#",
                                            // commandes_supprimer0.asp?code_commande=<%=code_commande%>
                                        ),
                                }}
                            />
                            <Button
                            props={{
                                style: "blue",
                                text: "Télécharger pièce",
                                type: "button",
                                onClick: (): void => setIsPopupOpen(true),
                                }}
                            />
                            <Button
                                props={{
                                    style: "blue",
                                    text: "Voir pièces",
                                    type: "button",
                                    onClick: (): void =>
                                        navigate(
                                            `/commandes/commandes_fournisseurs/commandes_a_valider/voir_pieces/${dataSociete1.id}`,
                                        ),
                                }}
                            />
                            <Button
                                props={{
                                    style: "blue",
                                    text: "Imprimer",
                                    type: "button",
                                    onClick: (): WindowProxy | null =>
                                        window.open(
                                            `http://srv-web:8081/CrystalWebViewerURL/view.aspx?mode=E&etat=commandes_f&xml=commandes_f&p1=so:${dataSociete1.societe}&p2=numBC:${dataSociete1.societe}`, '_blank'
                                        ),
                                }}
                            />
                            <Button
                                props={{
                                    style: "blue",
                                    text: "Visu prévision",
                                    type: "button",
                                    onClick: (): void =>
                                        navigate(
                                            "#",
                                        ),
                                }}
                            />
                        </div>
                    </section>
                </div>
                <NRTL
                    datas={tableData}
                    headerBackgroundColor={"linear-gradient(to left, #84CDE4FF, #1092B8)"}
                    headerHoverBackgroundColor={"#1092B8"}
                    showItemsPerPageSelector={true}
                    showPreviousNextButtons={true}
                    showSearchBar={true}
                    onRowClick={(
                        index: number,
                        rowData: string[] | undefined,
                    ): void =>
                        navigate(
                            `/commandes/commandes_fournisseurs/commandes_a_valider/modifier_piece/${rowData![0]}`,
                            {
                                state: { index: index, commandeID: rowData![0] },
                            },
                        )
                    }
                    filterableColumns={[true, true, true, true, true, true]}
                    showPagination={true}
                    enableColumnSorting={true}
                    itemsPerPageOptions={[10, 25, 50]}
                    language={"fr"}
                />
                <div className="buttonContainer" id={"bottom_buttons"}>
                    <Button
                        props={{
                            style: "blue",
                            text: "Ajouter une ligne d'article",
                            type: "button",
                            onClick: (): void =>
                                navigate(
                                    `/commandes/commandes_fournisseurs/commandes_a_valider/ajouter_piece/${dataSociete1.id}`,
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
                                    "/commandes/commandes_fournisseurs",
                                ),
                        }}
                    />
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
