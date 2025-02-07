// styles
import "./commandesAValider.scss";

// hooks | libraries
import { ReactElement, useState, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

// components
import WithAuth from "../../../auth/WithAuth";
import Header from "../../../../components/header/Header";
import Button from "../../../../components/button/Button.tsx";
import Footer from "../../../../components/footer/Footer";
import NRTL from "../../../../components/NRTL/NRTL.tsx";


function CommandesAValider(): ReactElement {
    const navigate: NavigateFunction = useNavigate();
    const [bodyArray, setBodyArray] = useState<string[][]>([]);

    useEffect((): void => {
        const mockupBody: string[][] = [
            [
                "567",
                "03/02/2025",
                "PVF",
                "TELECONVERGENCE",
                "Commande Casques",
                "Cde Validée",
            ],
            ["563", "20/01/2025", "PVF", "KILOUTOU", "Chauffages", "Cmd reçu"],
        ];
        setBodyArray(mockupBody);
    }, []);

    const tableData = {
        tableHead: ["N°", "Crée le", "Société", "Tiers", "Description", "Statut"],
        tableBody: bodyArray,
    };

    return (
        <>
            <Header
                props={{
                    pageURL:
                        "G_IVOO | Commandes Fournisseurs | Commandes à Valider",
                    helpBtn: true,
                }}
            />
            <main id={"courrierADistribuer"}>
                <div className={"tableContainer"}>
                    <NRTL
                        datas={tableData}
                        headerBackgroundColor={"linear-gradient(to left, #84CDE4FF, #1092B8)"}
                        headerHoverBackgroundColor={"#1092B8"}
                        showItemsPerPageSelector={true}
                        showPreviousNextButtons={true}
                        showSearchBar={true}
                        filterableColumns={[false, false, true, true, false, true]}
                        showPagination={true}
                        enableColumnSorting={true}
                        itemsPerPageOptions={[10, 25, 50]}
                        language={"fr"}
                        onRowClick={(index: number, rowData?: string[] | undefined): void =>
                            navigate(
                                `/commandes/commandes_fournisseurs/commandes_a_valider/${rowData![0]}`,
                                {
                                    state: { index: index, commandeID: rowData![0] },
                                },
                            )
                        }
                    />
                </div>

                <div className={"buttonWrapper"}>
                    <Button
                        props={{
                            style: "grey",
                            text: "Retour",
                            type: "button",
                            onClick: (): void => navigate('/commandes/commandes_fournisseurs'),
                        }}
                    />
                </div>
            </main>
            <Footer />
        </>
    );
}

const CommandesAValiderWithAuth: (
    props: object,
) => ReactElement | null = WithAuth(CommandesAValider);
export default CommandesAValiderWithAuth;
