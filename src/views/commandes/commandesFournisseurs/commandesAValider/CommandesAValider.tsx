// styles
import "./commandesAValider.scss";


// hooks | libraries
import {ReactElement, useState} from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

// components
import Header from "../../../../components/header/Header";
import Button from "../../../../components/button/Button";
import Select from "react-select";
import Footer from "../../../../components/footer/Footer";
import WithAuth from "../../../auth/WithAuth";
import NRTL from "../../../../components/NRTL/NRTL.tsx";

function CommandesAValider(): ReactElement {
    const navigate: NavigateFunction = useNavigate();
    const [kindOfSociete, setKindOfSociete] = useState<string>("E");
    const handleChangeKindOfSociete = (): void => {
        setKindOfSociete(kindOfSociete === "E" ? "I" : "E");
    };

    const tableDataSociete1 = {
        tableHead: [
            "N°.",
            "Société",
            "Fournisseur",
            "Objet",
            "Montant TTC",
        ],
        tableBody: [
            ["62639", "IVOO", "Mr Pizza",
                "Achat de Pizzas", "500"],
            ["28373", "BB", "Trombonnes SAS",
                "Achat Trombonnes", "100.50"],
        ],
    };

    const tableDataSociete2 = {
        tableHead: [
            "N°.",
            "Société",
            "Fournisseur",
            "Objet",
            "Montant TTC",
        ],
        tableBody: [
            ["62639", "IVOO", "dfdd",
                "Achat de Pizzas", "500"],
            ["28373", "BB", "Trombonnes SAS",
                "Achat Trombonnes", "100.50"],
        ],
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
                <Select
                    options={[
                        { value: "E", label: "IVOO" },
                        { value: "I", label: "GEAS" },
                    ]}
                    defaultValue={{ value: "E", label: "IVOO" }}
                    onChange={handleChangeKindOfSociete}
                />
                <div className={"tableContainer"}>
                    {kindOfSociete === "E" ? (
                        <NRTL
                            datas={tableDataSociete1}
                            headerBackgroundColor={
                                "linear-gradient(to left, #84CDE4FF, #1092B8)"
                            }
                            headerHoverBackgroundColor={"#1092B8"}
                            showItemsPerPageSelector={true}
                            showPreviousNextButtons={true}
                            showSearchBar={true}
                            filterableColumns={[
                                true,
                                true,
                                true,
                                true,
                                true
                            ]}
                            showPagination={true}
                            enableColumnSorting={true}
                            itemsPerPageOptions={[10, 25, 50]}
                            language={"fr"}
                            onRowClick={(
                                index: number,
                                rowData: string[] | undefined,
                            ): void =>
                                navigate(
                                    `/commandes/commandes_fournisseurs/commandes_a_valider/${rowData![0]}`,
                                    {
                                        state: { index: index, commandeID: rowData![0] },
                                    },
                                )
                            }
                        />
                    ) : (
                        <NRTL
                            datas={tableDataSociete2}
                            headerBackgroundColor={
                                "linear-gradient(to left, #84CDE4FF, #1092B8)"
                            }
                            headerHoverBackgroundColor={"#1092B8"}
                            showItemsPerPageSelector={true}
                            showPreviousNextButtons={true}
                            showSearchBar={true}
                            filterableColumns={[
                                true,
                                true,
                                true,
                                true,
                                true,
                            ]}
                            showPagination={true}
                            enableColumnSorting={true}
                            itemsPerPageOptions={[10, 25, 50]}
                            language={"fr"}
                            onRowClick={(
                                index: number,
                                rowData: string[] | undefined,
                            ): void =>
                                navigate(
                                    `/commandes/commandes_fournisseurs/commandes_a_valider/${rowData![0]}`,
                                    {
                                        state: { index: index, commandeID: rowData![0] },
                                    },
                                )
                            }
                        />
                    )}
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
