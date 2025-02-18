// styles
import "./creationCommandes.scss";


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

interface ICommande {
    cle: string;
    tiers: string;
    objet: string;
    totalTTC: string;
    statut: string;
    dateReception: string;
}

function CreationCommandes(): ReactElement {
    const navigate: NavigateFunction = useNavigate();
    const [acompte, setAcompte] = useState(false);
    const [fournisseur, setFournisseur] = useState(false);
    const [commandesArray, setCommandesArray] = useState<string[][]>([]);
    const [montantAcompte, setMontantAcompte] = useState("");

    const mockupCommandes: ICommande[] = [
        {
            cle: "567",
            tiers: "TELECONVERGENCE",
            objet: "Commande Casques",
            totalTTC: "2 460,00",
            dateReception: "2024/12/05",
            statut: "Commande validée",
        },
        {
            cle: "563",
            tiers: "TELECONVERGENCE",
            objet: "Chauffages",
            dateReception: "2025/21/01",
            totalTTC: "619,41",
            statut: "Commande recue",
        },
    ];
    const commandesTableData = {
        tableHead: ["Code", "Date", "Objet", "Montant TTC", "Statut"],
        tableBody: commandesArray,
    };

    const DisplayCommandes = (): ReactElement => {
        return (
            <div className={'commandesTableContainer'}>
                    <h2>Commandes Fournisseur</h2>
                    <NRTL
                        datas={commandesTableData}
                        headerBackgroundColor={"linear-gradient(to left, #84CDE4FF, #1092B8)"}
                        headerHoverBackgroundColor={"#1092B8"}
                        language={"fr"}
                        onRowClick={(): void => {
                            navigate(
                                `/commandes/commandes_fournisseurs/commandes_a_valider/567`
                            )
                        }}
                    />
            </div>
        );
    };
    const findCommande = (tiers: string): ICommande[] => {
        return mockupCommandes.filter(
            (document: ICommande): boolean => document.tiers === tiers,
        );
    };
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
                                            <label htmlFor={"nature"}>Nature :</label>
                                            <Select
                                                id={"nature"}
                                                options={[
                                                    { value: "1", label: "ANIMATION" },
                                                    { value: "2", label: "ANNONCE" },
                                                    { value: "3", label: "BATIMENT" },
                                                    { value: "4", label: "DEPLACEMENT" },
                                                    { value: "5", label: "DOCUMENTATION" },
                                                    { value: "6", label: "HYGIENE" },
                                                    { value: "7", label: "INFORMATIQUE" },
                                                    { value: "8", label: "PAPETERIE" },
                                                    { value: "9", label: "TR" },
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

                            {fournisseur && <DisplayCommandes />}
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
