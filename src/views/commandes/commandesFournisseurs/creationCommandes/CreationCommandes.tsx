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
    societe: string;
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
    acompte: string;
    montantAcompte: string;
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
    const [selectedFournisseur, setSelectedFournisseur] = useState(null);
    type OptionType = { value: string; label: string } | null;
    const [acompte, setAcompte] = useState(false);
    const [montantAcompte, setMontantAcompte] = useState("");
    const fournisseurSelec: string = "";
    const [isPopupAddArticleOpen, setIsPopupAddArticleOpen] = useState(false);
    const [isPopupSupprArticleOpen, setIsPopupSupprArticleOpen] = useState(false);
    const [isPopupEnvoyerDemandeOpen, setIsPopupEnvoyerDemandeOpen] = useState(false);
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
        societe: "",
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
        acompte: "false",
        montantAcompte: "",
    });

    const optionsBoolean: OptionType[] = [
        { value: "0", label: "Non" },
        { value: "1", label: "Oui" },
    ]
    const optionsFournisseurs: OptionType[] = [
        { value: "TELECONVERGENCE", label: "TELECONVERGENCE" },
        { value: "A Montain", label: "A Montain" },
        { value: "IBM", label: "IBM" },
    ]

    const optionsSociete: OptionType[] = [
            { value: "BB", label: "BB" },
            { value: "FLEURIAU", label: "FLEURIAU" },
            { value: "IVOO", label: "IVOO" },
        ]

    const optionsReglement: OptionType[] = [
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
            societe: "BB",
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
            acompte: "true",
            montantAcompte: "25",
        },
        {
            cle: "563",
            societe: "IVOO",
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
            commentaire: "Chauffages pour le plateau",
            acompte: "false",
            montantAcompte: "0",
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
                    societe: selectedCommande.societe,
                    tiers: selectedCommande.tiers,
                    nature: selectedCommande.nature,
                    objet: selectedCommande.objet,
                    paiementCommande: selectedCommande.paiementCommande,
                    commentaire: selectedCommande.commentaire,
                    totalTTC: selectedCommande.totalTTC,
                    totalHT: selectedCommande.totalHT,
                    delaisReglement: selectedCommande.delaisReglement,
                    statut: selectedCommande.statut,
                    modeReglement: selectedCommande.modeReglement,
                    dateReception: selectedCommande.dateReception,
                    acompte: selectedCommande.acompte,
                    montantAcompte: selectedCommande.montantAcompte,
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
                            text: "Ajouter un article",
                            type: "button",
                            onClick: (): void => setIsPopupAddArticleOpen(true),
                        }}
                    />

                    {articlesArray.length > 0 && <Button
                        props={{
                            style: "red",
                            text: "Supprimer tous les articles",
                            type: "button",
                            onClick: (): void => setIsPopupSupprArticleOpen(true),
                        }}
                    />}
                        <Button
                            props={{
                                style: "green",
                                text: "Envoyer demande",
                                type: "button",
                                onClick: (): void => setIsPopupEnvoyerDemandeOpen(true),
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
                    <h2>Historique des commandes du fournisseur {selectedFournisseur}</h2>
                    <NRTL
                        datas={commandesTableData}
                        headerBackgroundColor={"linear-gradient(to left, #84CDE4FF, #1092B8)"}
                        headerHoverBackgroundColor={"#1092B8"}
                        language={"fr"}
                        title={`Dupliquer`}
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
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | OptionType, selectName = null) => {
    //     if (selectName) {
    //         // Gestion de react-select
    //         setFormData((prev) => ({
    //             ...prev,
    //             [selectName]: e ? e.value : "",
    //         }));
    //     } else {
    //         const { name, value, type, checked } = e.target;
    //         setFormData((prev) => ({
    //             ...prev,
    //             [name]: type === "checkbox" ? checked : value,
    //         }));
    //     }
    // };



    // State pour stocker les valeurs du formulaire
    const [formArticleData, setFormArticlesData] = useState({
        refArticle: "",
        description: "",
        quantite: "",
        prixUnitaireHorsTaxe: "",
        tauxTVA: "",
    });

    // Gestion des changements dans le formulaire
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormArticlesData({ ...formArticleData, [e.target.id]: e.target.value });
    };

    const handleSelectChange = (selectedOption: any) => {
        setFormArticlesData({ ...formArticleData, tauxTVA: selectedOption.value });
    };

    // Fonction pour ajouter une nouvelle ligne au tableau
    const addArticle = () => {
        if (!formArticleData.refArticle || !formArticleData.description || !formArticleData.quantite || !formArticleData.prixUnitaireHorsTaxe || !formArticleData.tauxTVA) {
            alert("Veuillez remplir tous les champs !");
            return;
        }
        const prixTTC =  parseFloat(formArticleData.prixUnitaireHorsTaxe) * (1 + parseFloat(formArticleData.tauxTVA) / 100);

        const newRow = [formArticleData.refArticle, "", formArticleData.description, formArticleData.tauxTVA, formArticleData.quantite, formArticleData.prixUnitaireHorsTaxe, prixTTC];
        setArticlesArray([...articlesArray, newRow]);
        setFormArticlesData({refArticle: "", description: "", quantite: "", prixUnitaireHorsTaxe: "", tauxTVA: ""});

        // Fermer la popup
        setIsPopupAddArticleOpen(false);
    };

    return (
        <>
            {isPopupEnvoyerDemandeOpen && (
                <div className="popupOverlay" id="updateServiceModal">
                    <form className={"updateServiceForm"}>
                        <div className="popupContent">
                            <h2>Envoyer demande de commande</h2>
                            <div className={"formWrapper"}>
                                <p>Etes vous sûr de vouloir Envoyer la demande de votre commande ?</p>
                            </div>
                            <div className={"buttonContainer"}>
                                <Button
                                    props={{
                                        style: "green",
                                        text: "Envoyer demande",
                                        type: "button",
                                        onClick: (): void =>
                                            navigate(
                                                "/commandes/commandes_fournisseurs",
                                            ),
                                    }}
                                />
                                <Button
                                    props={{
                                        style: "grey",
                                        text: "Annuler",
                                        type: "button",
                                        onClick: (): void => setIsPopupEnvoyerDemandeOpen(false)
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            )}
            {isPopupSupprArticleOpen && (
                <div className="popupOverlay" id="updateServiceModal">
                    <form className={"updateServiceForm"}>
                        <div className="popupContent">
                            <h2>Suppression de tous les articles</h2>
                            <div className={"formWrapper"}>
                                <p>Etes vous sûr de vouloir supprimer tous les articles ?</p>
                            </div>
                            <div className={"buttonContainer"}>
                                <Button
                                    props={{
                                        style: "red",
                                        text: "Supprimer Définitivement",
                                        type: "button",
                                        onClick: (): void => {
                                            articlesArray.splice(0, articlesArray.length);
                                            setIsPopupSupprArticleOpen(false);
                                        }
                                    }}
                                />
                                <Button
                                    props={{
                                        style: "grey",
                                        text: "Annuler",
                                        type: "button",
                                        onClick: (): void => setIsPopupSupprArticleOpen(false)
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            )}
            {isPopupAddArticleOpen && (
                <div className="popupOverlay" id="updateServiceModal">
                    <form className={"updateServiceForm"}>
                        <div className="popupContent">
                            <h2>Ajouter un article à la commande</h2>
                            <div className={"formWrapper"}>
                                <div className={"inputWrapper"}>
                                    <label htmlFor={"refArticle"}>Référence article :</label>
                                    <input type="text" id="refArticle" value={formArticleData.refArticle} onChange={handleInputChange} />
                                </div>
                                <div className={"inputWrapper"}>
                                    <label htmlFor={"description"}>Libellé :</label>
                                    <input type="text" id="description" value={formArticleData.description} onChange={handleInputChange} />
                                </div>
                                <div className={"inputWrapper"}>
                                    <label htmlFor={"quantite"}>Quantité :</label>
                                    <input type="number" id="quantite" value={formArticleData.quantite} onChange={handleInputChange} />
                                </div>
                                <div className={"inputWrapper"}>
                                    <label htmlFor={"prixUnitaireHorsTaxe"}>Prix unit. HT :</label>
                                    <input type="number" id="prixUnitaireHorsTaxe" value={formArticleData.prixUnitaireHorsTaxe} onChange={handleInputChange} />
                                </div>
                                <div className={"inputWrapper"}>
                                    <label htmlFor={"tauxTVA"}>Taux TVA :</label>
                                    <Select
                                        id={"tauxTVA"}
                                        options={[
                                            { value: "1", label: "Sans TVA" },
                                            { value: "2.10", label: "2.10%" },
                                            { value: "5.50", label: "5.50%" },
                                            { value: "20", label: "20%" },
                                        ]}
                                        onChange={handleSelectChange}
                                        value={{ value: formArticleData.tauxTVA, label: formArticleData.tauxTVA || "Sélectionner" }}
                                    />
                                </div>
                            </div>
                            <div className={"buttonContainer"}>
                                <button type="button" onClick={addArticle}>Enregistrer</button>
                                <button type="button" onClick={() => setIsPopupAddArticleOpen(false)}>Retour</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
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
                                {/*<pre>{JSON.stringify(formData, null, 2)}</pre>*/}
                                <div className={"formWrapper"}>
                                    <div className={"inputWrapper"}>
                                        <label htmlFor={"societe"}>Société <span className="red">*</span> :</label>
                                        <Select
                                            id={"societe"}
                                            options={optionsSociete}
                                            value={optionsSociete.find(option => option.value === formData.societe) || null}
                                            onChange={(selectedOption) => {
                                                setFormData({ ...formData, societe: selectedOption ? selectedOption.value : "" })
                                            }}
                                        />
                                    </div>
                                    <div className={"inputWrapper"}>
                                        <label htmlFor={"fournisseurs"}>Fournisseur <span className="red">*</span> :</label>
                                        <Select
                                            id={"fournisseurs"}
                                            options={optionsFournisseurs}
                                            onChange={(selectedOption) => {
                                                if (selectedOption) {
                                                    setFournisseur(selectedOption.value === "TELECONVERGENCE");
                                                }
                                                // setFournisseur(selectedOption.value === "TELECONVERGENCE");
                                                // setFormData({ ...formData, tiers: selectedOption ? selectedOption.value : "" })
                                            }}
                                        />
                                    </div>
                                    <div className={"inputWrapper"}>
                                        <label htmlFor={"nature"}>Nature <span className="red">*</span> :</label>
                                        <Select id="nature"
                                            options={optionsNature}
                                            value={optionsNature.find(option => option.value === formData.nature) || null}
                                            onChange={(selectedOption) => {
                                                setFormData({ ...formData, nature: selectedOption ? selectedOption.value : "" })
                                            }}
                                        />
                                    </div>
                                    <div className={"inputWrapper"}>
                                        <label htmlFor={"objet"}>Objet <span className="red">*</span> :</label>
                                        <input
                                            type={"text"}
                                            id={"objet"}
                                            defaultValue={formData.objet}
                                            onChange={(e) => setFormData({ ...formData, objet: e.target.value ? e.target.value : "" })}
                                        />
                                    </div>
                                    <div className={"inputWrapper"}>
                                        <label htmlFor={"paiementCommande"}>Paiement à la commande <span className="red">*</span> :</label>
                                        <Select
                                            id={"paiementCommande"}
                                            options={optionsBoolean}
                                            value={optionsBoolean.find(option => option.value === formData.paiementCommande) || null}
                                            onChange={(selectedOption) => {
                                                setFormData({ ...formData, paiementCommande: selectedOption ? selectedOption.value : "" })
                                            }}
                                        />
                                    </div>
                                    {/*<div className={"inputWrapper"}>*/}
                                    {/*    <label htmlFor={"dateLivraison"}>Date de Livraison :</label>*/}
                                    {/*    <input type={"date"} id={"dateLivraison"} defaultValue={formData.dateReception} />*/}
                                    {/*</div>*/}
                                    <div className={"inputWrapper"}>
                                        <label htmlFor={"commentaire"}>Commentaire</label>
                                        <textarea
                                            defaultValue={formData.commentaire}
                                            onChange={(e) => setFormData({ ...formData, commentaire: e.target.value ? e.target.value : "" })}
                                        ></textarea>
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
                                                    options={optionsReglement}
                                                    value={optionsReglement.find(option => option.value === formData.modeReglement) || null}
                                                    onChange={(selectedOption) => setFormData({ ...formData, modeReglement: selectedOption ? selectedOption.value : ""})}
                                                />
                                            </div>
                                            <div className={"inputWrapper"}>
                                                <label htmlFor={"delaisReglement"}>Délai de règlement :</label>
                                                <Select
                                                    id={"delaisReglement"}
                                                    options={optionsDelais}
                                                    defaultValue={optionsDelais.find((option: OptionType) => option.value === formData.delaisReglement) || optionsDelais[0]}
                                                    onChange={(selectedOption) => setFormData({ ...formData, delaisReglement: selectedOption ? selectedOption.value : ""})}

                                                />
                                            </div>
                                            <div className={"inputWrapper"}>
                                                <label htmlFor={"totalHT"}>Total HT :</label>
                                                {/*<p>{commande.totalHT} €</p>*/}
                                                <input
                                                    type={"text"}
                                                    id={"totalHT"}
                                                    value={formData.totalHT}
                                                    onChange={(e) => setFormData({ ...formData, totalHT: e.target.value ? e.target.value : "" })}
                                                />
                                            </div>
                                            <div className={"inputWrapper"}>
                                                <label htmlFor={"totalTTC"}>Total TTC :</label>
                                                {/*<p>{formData.totalTTC} €</p>*/}
                                                <input type={"text"} id={"totalTTC"} value={formData.totalTTC}
                                                       onChange={(e) => setFormData({ ...formData, totalTTC: e.target.value ? e.target.value : "" })}
                                                />
                                            </div>
                                            <div className={"inputWrapper"}>
                                                <label htmlFor={"dateLivraison"}>Date de Livraison :</label>
                                                <input type={"date"} id={"dateLivraison"} defaultValue={formData.dateReception} />
                                            </div>
                                            <div className="inputWrapper">
                                                <label htmlFor="acompte">Acompte :</label>
                                                <Select
                                                    options={optionsBoolean}
                                                    id="acompte"
                                                    defaultValue={optionsBoolean.find((option: OptionType) => option.value === formData.acompte) || optionsDelais[0]}
                                                    onChange={(selectedOption) => {
                                                        handleChange
                                                        setFormData({ ...formData, acompte: selectedOption ? selectedOption.value : "" })
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
                            {articlesArray.length > 0 && <DisplayArticles />}

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
