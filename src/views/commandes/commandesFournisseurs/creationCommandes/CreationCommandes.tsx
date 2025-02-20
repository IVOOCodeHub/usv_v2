// styles
import "./creationCommandes.scss";


// hooks | libraries
import {ReactElement, useEffect, useState} from "react";
import {useNavigate, NavigateFunction, useParams} from "react-router-dom";

// components
import Header from "../../../../components/header/Header";
import Button from "../../../../components/button/Button";
import Select from "react-select";
import Footer from "../../../../components/footer/Footer";
import WithAuth from "../../../auth/WithAuth";
import NRTL from "../../../../components/NRTL/NRTL.tsx";

interface ICommande {
    cle: string;
    tiers: string;
    objet: string;
    nature: string;
    totalTTC: string;
    paiementCommande: string;
    statut: string;
    totalHT: string;
    delaisReglement: string;
    modeReglement: string;
    dateReception: string;
    commentaire: string;
}

interface IArticle {
    commandeID: string;
    refArticle: string;
    description: string;
    quantite: string;
    prixUnitaireHorsTaxe: string;
    tauxTVA: string;
    prixUnitaireTTC: string;
}

function CreationCommandes(): ReactElement {
    const navigate: NavigateFunction = useNavigate();
    const { commandeID } = useParams();
    const [fournisseur, setFournisseur] = useState(false);
    const [isOpen, setIsOpen] =useState<boolean>(false)
    const [commandesArray, setCommandesArray] = useState<string[][]>([]);
    const [articlesArray, setArticlesArray] = useState<string[][]>([]);
    const [isFormComplete, setIsFormComplete] = useState(false);
    type OptionType = { value: string; label: string };
    const [acompte, setAcompte] = useState(false);
    const [montantAcompte, setMontantAcompte] = useState("");
    // const showHisto: boolean = false;
    // const location = useLocation();
    // const [rowData, setRowData] = useState<strings[] | null>(null);

    // const ButtonHisto  = (): ReactElement => {
    //     return (
    //         { isOpen && (
    //             <div className={"buttonContainer"}>
    //                 <Button
    //                     props={{
    //                         style: "blue",
    //                         text: "Afficher l'historique de commandes",
    //                         type: "button",
    //                         onClick: (): void => {
    //                             setIsOpen(!isOpen),
    //                             navigate(
    //                                 `/commandes/commandes_fournisseurs/creation_commandes/${rowData![0]}`,
    //                                 {
    //                                     state: { index: index, commandeID: rowData![0] },
    //                                 },
    //                             )
    //                         }
    //                     }}
    //                 />
    //             </div>
    //         )};
    // );
    // }

    const [formData, setFormData] = useState({
        cle: "",
        tiers: "",
        objet: "",
        nature: "",
        totalTTC: "",
        totalHT: "",
        delaisReglement: "",
        paiementCommande: "",
        statut: "",
        modeReglement: "",
        dateReception: "",
        commentaire: "",
    });

    const optionBoolean: OptionType[] = [
        { value: "0", label: "Non" },
        { value: "1", label: "Oui" },
    ]

    const optionReglement: OptionType[] = [
        { value: "caisse", label: "Caisse" },
        { value: "CB", label: "Carte Bleue" },
        { value: "chq", label: "Chèque" },
        { value: "virement", label: "Virement" },
    ]

    const optionsNature: OptionType[] = [
        { value: "ANIMATION", label: "ANIMATION" },
        { value: "ANNONCE", label: "ANNONCE" },
        { value: "BATIMENT", label: "BATIMENT" },
        { value: "DEPLACEMENT", label: "DEPLACEMENT" },
        { value: "DOCUMENTATION", label: "DOCUMENTATION" },
        { value: "HYGIENE", label: "HYGIENE" },
        { value: "INFORMATIQUE", label: "INFORMATIQUE" },
        { value: "PAPETERIE", label: "PAPETERIE" },
        { value: "TR", label: "TR" },
    ]

    const optionsDelais: OptionType[] = [
        { value: "A la commande", label: "A la commande" },
        { value: "Comptant", label: "Comptant" },
        { value: "10 JOURS", label: "10 JOURS" },
        { value: "15 JOURS", label: "15 JOURS" },
        { value: "20 JOURS", label: "20 JOURS" },
        { value: "30 JOURS", label: "30 JOURS" },
        { value: "45 JOURS", label: "45 JOURS" },
        { value: "60 JOURS", label: "60 JOURS" },
    ];

    const mockupCommandes: ICommande[] = [
        {
            cle: "567",
            tiers: "TELECONVERGENCE",
            objet: "Commande Casques",
            nature: "INFORMATIQUE",
            modeReglement: "CB",
            paiementCommande: "1",
            totalTTC: "2460,00",
            totalHT: "1460,00",
            delaisReglement: "15 JOURS",
            dateReception: "2024-05-12",
            statut: "Commande validée",
            commentaire: "Commande plusieurs Casques",
        },
        {
            cle: "563",
            tiers: "TELECONVERGENCE",
            objet: "Chauffages",
            nature: "BATIMENT",
            modeReglement: "CB",
            paiementCommande: "1",
            dateReception: "2025-01-21",
            totalTTC: "619,41",
            totalHT: "519,41",
            delaisReglement: "10 JOURS",
            statut: "Commande recue",
            commentaire: "Chauffages pour le plateau"
        },
    ];


    const mockupArticles: IArticle[] = [
        {
            commandeID: "563",
            refArticle: "CH3KWH",
            description: "Location 3 chauffage",
            quantite: "3",
            prixUnitaireHorsTaxe: "152,00",
            tauxTVA: "20,00",
            prixUnitaireTTC: "182,40",
        },
        {
            commandeID: "563",
            refArticle: "XD4577",
            description: "Pack assurance casse, vol",
            quantite: "3",
            prixUnitaireHorsTaxe: "18,24",
            tauxTVA: "20,00",
            prixUnitaireTTC: "21,89",
        },
        {
            commandeID: "563",
            refArticle: "FY45874",
            description: "Contribution frais déchets",
            quantite: "3",
            prixUnitaireHorsTaxe: "1,82",
            tauxTVA: "20,00",
            prixUnitaireTTC: "2,18",
        },
        {
            commandeID: "567",
            refArticle: "BTE2011BAB",
            description: "MICROCASQUE TECHPHONE T2011 BINAURAL",
            quantite: "25",
            prixUnitaireHorsTaxe: "65,00",
            tauxTVA: "20,00",
            prixUnitaireTTC: "100,50",
        },
        {
            commandeID: "567",
            refArticle: "QD2PTS",
            description: "CORDON JACK QD/JACK 4 POINTS",
            quantite: "25",
            prixUnitaireHorsTaxe: "17,00",
            tauxTVA: "20,00",
            prixUnitaireTTC: "35,12",
        },
    ];
    // useEffect(() => {
    //     if (location.state && location.state) {
    //         setRowData(location.state.rowData);
    //     }
    // }, [location.state]);
    useEffect(() => {
        if (commandeID) {
            const selectedCommande = mockupCommandes.find(cmd => cmd.cle === (commandeID));
            if (selectedCommande) {
                setFormData({
                    cle: selectedCommande.cle,
                    tiers: selectedCommande.tiers,
                    objet: selectedCommande.objet,
                    nature: selectedCommande.nature,
                    totalTTC: selectedCommande.totalTTC,
                    totalHT: selectedCommande.totalHT,
                    delaisReglement: selectedCommande.delaisReglement,
                    paiementCommande: selectedCommande.paiementCommande,
                    statut: selectedCommande.statut,
                    modeReglement: selectedCommande.modeReglement,
                    dateReception: selectedCommande.dateReception,
                    commentaire: selectedCommande.commentaire,
                });
            }
        }
    }, [commandeID]);

    const BoutonsCommande = (): ReactElement => {
        return (
            <div className={"commandeArticles"}>
                <div className={"buttonContainer"}>
                    {/*{isFormComplete &&*/}

                    {fournisseur && isOpen &&
                        <Button
                            props={{
                                style: "blue",
                                text: "Afficher l'historique de commandes",
                                type: "button",
                                onClick: (index): void => {
                                    setIsOpen(!isOpen)
                                    navigate(
                                        `/commandes/commandes_fournisseurs/creation_commandes/${formData.tiers}`,
                                        {
                                            state: { index: index, commandeID: formData.cle },
                                        },
                                    )
                                }
                            }}
                        />
                    }
                    <Button
                        props={{
                            style: "blue",
                            text: "Ajouter une ligne d'article",
                            type: "button",
                            onClick: (): void =>
                                navigate(
                                    `/commandes/commandes_fournisseurs/commandes_a_valider/ajouter_piece/${commandeID}`,
                                ),
                        }}
                    />

                    {articlesArray.length > 0 && <Button
                        props={{
                            style: "red",
                            text: "Supprimer tous les articles",
                            type: "button",
                            onClick: (): void =>
                                navigate(
                                    `/commandes/commandes_fournisseurs/creation_commandes/${commandeID}`,
                                ),
                        }}
                    />}
                        <Button
                            props={{
                                style: "green",
                                text: "Envoyer demande",
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
                    {/*}*/}
                </div>
            </div>
        );
    };

    // const { rowData } = location.state ? location.state : null;
    // const cmd: ICommande | undefined = undefined;
    //
    // const [formData, setFormData] = useState<string[][]>([]);
    //
    // if (rowData != null) {
    //     let cmd = mockupCommandes.find(cmdSelec => cmdSelec.cle = rowData[0]);
    //
    //     let [formData, setFormData] = useState({
    //         objet: cmd ? cmd.objet : "",
    //         tiers: cmd ? cmd.tiers : "",
    //         nature: cmd ? cmd.nature : "",
    //         totalTTC: cmd ? cmd.totalTTC : "",
    //         modeReglement: cmd ? cmd.modeReglement : "",
    //         dateReception: cmd ? cmd.dateReception : "",
    //         commentaire: cmd ? cmd.commentaire : "",
    //         statut: cmd ? cmd.statut : ""
    //     });
    // }


    const articlesTableData = {
        tableHead: ["Code", "Id Commande", "Objet", "tauxTVA", "Quantité", "Montant HC", "Montant TTC"],
        tableBody: articlesArray,
    };

    const commandesTableData = {
        tableHead: ["Code", "Date", "Objet", "Montant TTC", "Statut"],
        tableBody: commandesArray,
    };

    const DisplayCommandes = (): ReactElement => {
        return (
            <div className={'commandesTableContainer'}>
                    <h2>Historique des commandes du fournisseur</h2>
                    <NRTL
                        datas={commandesTableData}
                        headerBackgroundColor={"linear-gradient(to left, #84CDE4FF, #1092B8)"}
                        headerHoverBackgroundColor={"#1092B8"}
                        language={"fr"}
                        onRowClick={(
                            index: number,
                            rowData: string[] | undefined,
                        ): void => {
                            setIsOpen(!isOpen)
                            navigate(
                                `/commandes/commandes_fournisseurs/creation_commandes/${rowData![0]}`,
                                {
                                    state: { index: index, commandeID: rowData![0] },
                                },
                            )
                        }}
                    />
            </div>
        );
    };

    const DisplayArticles = (): ReactElement => {
        return (
            <div className={'commandesTableContainer'}>
                    <h2>Liste des articles de la commande</h2>
                    <NRTL
                        datas={articlesTableData}
                        headerBackgroundColor={"linear-gradient(to left, #84CDE4FF, #1092B8)"}
                        headerHoverBackgroundColor={"#1092B8"}
                        language={"fr"}
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
                    />

            </div>
        );
    };
    const findArticle = (idCommande: string): IArticle[] => {
        return mockupArticles.filter(
            (article: IArticle): boolean => article.commandeID === idCommande,
        );
    };

    const findCommande = (tiers: string): ICommande[] => {
        return mockupCommandes.filter(
            (document: ICommande): boolean => document.tiers === tiers,
        );
    };
    // useEffect(() => {
    //     if (commandeID) {
    //         const selectedCommande = mockupCommandes.find(cmd => cmd.cle === commandeID);
    //         if (selectedCommande) {
    //             setFormData({
    //                 objet: selectedCommande.objet,
    //                 tiers: selectedCommande.tiers,
    //                 nature: selectedCommande.nature,
    //                 totalTTC: selectedCommande.totalTTC,
    //                 modeReglement: selectedCommande.modeReglement,
    //                 dateReception: selectedCommande.dateReception,
    //                 statut: selectedCommande.statut,
    //                 commentaire: selectedCommande.commentaire
    //             });
    //         }
    //     }
    // }, [commandeID]);

    useEffect((): void => {
            const commandes:  ICommande[] | null | undefined = findCommande("TELECONVERGENCE");
            if (commandes) {
                const tableRows:  string[][] = commandes.map(
                    (commande: ICommande): string[] => [
                        commande.cle,
                        commande.dateReception,
                        commande.objet,
                        commande.totalTTC,
                        commande.statut,
                    ],
                );
                setCommandesArray(tableRows);
            }
    }, []);

    useEffect((): void => {
            const articles:  IArticle[] | undefined = findArticle(commandeID);
            if (articles) {
                const tableArticlesRows:  string[][] = articles.map(
                    (article: IArticle): string[] => [
                        article.refArticle,
                        article.commandeID,
                        article.description,
                        article.tauxTVA + ' %',
                        article.quantite,
                        article.prixUnitaireHorsTaxe,
                        article.prixUnitaireTTC,
                    ],
                );
                setArticlesArray(tableArticlesRows);
            }
    }, [commandeID]);
    useEffect(() => {
        const isComplete =
            formData.tiers.trim() !== "" &&
            formData.objet.trim() !== "" &&
            formData.nature.trim() !== "" &&
            formData.totalTTC.trim() !== "" &&
            formData.modeReglement.trim() !== "" &&
            formData.dateReception.trim() !== "";

        setIsFormComplete(isComplete);
    }, [formData]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

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
                                        <label htmlFor={"societe"}>Société <span className="red">*</span> :</label>
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
                                        <label htmlFor={"fournisseurs"}>Fournisseur <span className="red">*</span> :</label>
                                        <Select
                                            id={"fournisseurs"}
                                            options={[
                                                { value: "A Montain", label: "A Montain" },
                                                { value: "Agence N", label: "Agence N" },
                                                { value: "ETC", label: "ETC" },
                                            ]}
                                            onChange={(selectedOption) => {
                                                if (selectedOption) {
                                                    setFournisseur(selectedOption.value === "A Montain");
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className={"inputWrapper"}>
                                        <label htmlFor={"nature"}>Nature <span className="red">*</span> :</label>
                                        <Select id="nature"
                                                options={optionsNature}
                                                value={optionsNature.find(option => option.value === formData.nature) || null}
                                                onChange={(selectedOption) => setFormData({ ...formData, nature: selectedOption ? selectedOption.value : "" })} />
                                    </div>
                                    <div className={"inputWrapper"}>
                                        <label htmlFor={"objet"}>Objet <span className="red">*</span> :</label>
                                        <input type={"text"} id={"objet"} defaultValue={formData.objet} onChange={handleChange} />
                                    </div>
                                    <div className={"inputWrapper"}>
                                        <label htmlFor={"paiementCommande"}>Paiement à la commande <span className="red">*</span> :</label>
                                        <Select
                                            id={"paiementCommande"}
                                            options={optionBoolean}
                                            value={optionBoolean.find(option => option.value === formData.paiementCommande) || null}
                                            onChange={(selectedOption) => setFormData({ ...formData, paiementCommande: selectedOption ? selectedOption.value : "" })}
                                        />
                                    </div>
                                    {/*<div className={"inputWrapper"}>*/}
                                    {/*    <label htmlFor={"dateLivraison"}>Date de Livraison :</label>*/}
                                    {/*    <input type={"date"} id={"dateLivraison"} defaultValue={formData.dateReception} />*/}
                                    {/*</div>*/}
                                    <div className={"inputWrapper"}>
                                        <label htmlFor={"commentaire"}>Commentaire</label>
                                        <textarea defaultValue={formData.commentaire}></textarea>
                                    </div>
                                </div>
                                {isOpen &&
                                    <div>
                                        <h2>Modalités financières</h2>
                                        <div className={"formWrapper"}>

                                            <div className={"inputWrapper"}>
                                                <label htmlFor={"modeReglement"}>Mode de règlement <span className="red">*</span> :</label>
                                                <Select
                                                    id={"modeReglement"}
                                                    options={optionReglement}
                                                    value={optionReglement.find(option => option.value === formData.modeReglement) || null}
                                                    onChange={(selectedOption) => setFormData({ ...formData, modeReglement: selectedOption ? selectedOption.value : ""})}
                                                />
                                            </div>
                                            <div className={"inputWrapper"}>
                                                <label htmlFor={"delaisReglement"}>Délai de règlement :</label>
                                                <Select
                                                    defaultValue={optionsDelais.find((option: OptionType) => option.value === formData.delaisReglement) || optionsDelais[0]}
                                                    options={optionsDelais}

                                                    id={"modeReglement"}
                                                />
                                            </div>
                                            <div className={"inputWrapper"}>
                                                <label htmlFor={"totalHT"}>Total HT :</label>
                                                {/*<p>{commande.totalHT} €</p>*/}
                                                <input type={"text"} id={"totalHT"} value={formData.totalHT + " €"} />
                                            </div>
                                            <div className={"inputWrapper"}>
                                                <label htmlFor={"totalTTC"}>Total TTC :</label>
                                                {/*<p>{formData.totalTTC} €</p>*/}
                                                <input type={"text"} id={"totalTTC"} value={formData.totalTTC + " €"}  />
                                            </div>
                                            <div className={"inputWrapper"}>
                                                <label htmlFor={"dateLivraison"}>Date de Livraison :</label>
                                                <input type={"date"} id={"dateLivraison"} defaultValue={formData.dateReception} />
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
                                        </div>
                                    </div>
                                }
                                <p><b>Veuillez remplir les champs obligatoires <span className="red">*</span> avant
                                    d'ajouter un article</b></p>
                            </form>
                            <BoutonsCommande />
                            {fournisseur && !isOpen ? <DisplayCommandes /> : '' }
                            {isOpen && <DisplayArticles />}

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
