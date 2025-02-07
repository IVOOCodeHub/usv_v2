// styles
import "./voirPieces.scss";

// hooks | libraries
import {ReactElement, useState} from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

// components
import Header from "../../../../components/header/Header";
import Footer from "../../../../components/footer/Footer";
import WithAuth from "../../../auth/WithAuth";
import NRTL from "../../../../components/NRTL/NRTL.tsx";
import Button from "../../../../components/button/Button.tsx";

function VoirPieces(): ReactElement {
    const navigate: NavigateFunction = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const tableDataPieces = {
        tableHead: [
            "Type",
            "Date téléchargement",
            "commentaire",
        ],
        tableBody: [
            ["62639", "2025/07/22", "Pizzas pour tout le monde"],
            ["28373", "2025/01/21", "Réaprovisionnement trombonnes"],
        ],
    };

    return (
        <>
            <Header
                props={{
                    pageURL:
                        "G_IVOO | Commandes Fournisseurs | Modification commandes | Voir Pièces",
                    helpBtn: true,
                }}
            />
                <main id={"voirPieces"}>
                    <div className={"tableContainer"}>
                        <NRTL
                            datas={tableDataPieces}
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
                            onRowClick={(): void => setIsPopupOpen(true)}
                        />
                    </div>
                    {isPopupOpen && (
                        <div className="popupOverlay" id="updateServiceModal">
                            <img src="#" alt="Mon test" />
                            <Button
                                props={{
                                    style: "grey",
                                    text: "Retour",
                                    type: "button",
                                    onClick: (): void => setIsPopupOpen(false)
                                }}
                            />
                        </div>
                    )}
                    <div className={"buttonContainer"}>
                        <Button
                            props={{
                                style: "grey",
                                text: "Retour",
                                type: "button",
                                onClick: (): void =>
                                    navigate(
                                        "/commandes/commandes_fournisseurs/commandes_a_valider/62639",
                                    ),
                            }}
                        />
                    </div>
                </main>
            <Footer />
        </>
    );
}

const CreationCommandesWithAuth: (
    props: object,
) => ReactElement | null = WithAuth(VoirPieces);
export default CreationCommandesWithAuth;
