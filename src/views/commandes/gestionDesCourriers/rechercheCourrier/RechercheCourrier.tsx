import "./rechercheCourrier.scss";

import { ReactElement } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

import WithAuth from "../../../auth/WithAuth";
import Header from "../../../../components/header/Header";
import Footer from "../../../../components/footer/Footer";
import Button from "../../../../components/button/Button";
import NRTL from "../../../../components/NRTL/NRTL";

function RechercheCourrier(): ReactElement {
  const navigate: NavigateFunction = useNavigate();

  const tableData = {
    tableHead: [
      "Clé",
      "Société",
      "Date",
      "Emetteur",
      "Nature",
      "Référence doc.",
      "Destinataire",
      "Action",
      "Statut",
      "Commentaire",
    ],
    tableBody: [
      [
        "1",
        "FLERIAU",
        "14/10/2016",
        "BERTON S.A.S",
        "FACTUREREF",
        "NC",
        "COMPTABILITE",
        "A TRAITER",
        "TRAITE",
        "15.55€",
      ],
      [
        "62694",
        "GEAS",
        "16/01/2025",
        "CREDIT COOPERAT",
        "INFORMATION REÇUE",
        "Récap annuel de frais 202",
        "FINANCE",
        "A TRAITER",
        "DISTRIBUE",
        "",
      ],
    ],
  };
  return (
    <>
      <Header
        props={{
          pageURL: `G_IVOO | Gestion des courriers | Recherche de courriers`,
          helpBtn: true,
        }}
      />
      <main id={"rechercheCourrier"}>
        <div className={"tableContainer"}>
          <NRTL
            datas={tableData}
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
              true,
              true,
              true,
              true,
              false,
            ]}
            showPagination={true}
            enableColumnSorting={true}
            itemsPerPageOptions={[10, 25, 50]}
            language={"fr"}
            onRowClick={(index: number, rowData?: string[] | undefined): void =>
              navigate(
                `/commandes/gestion_des_courriers/courrier_utils/modif_courrier/${rowData![0]}`,
                {
                  state: { index: index, courrierID: rowData![0] },
                },
              )
            }
          />
        </div>
        <div className={"goBackBtnWrapper"}>
          <Button
            props={{
              style: "grey",
              text: "Retour",
              type: "button",
              onClick: (): void =>
                navigate("/commandes/gestion_des_courriers/courrier_utils"),
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

const RechercheCourrierWithAuth: (props: object) => ReactElement | null =
  WithAuth(RechercheCourrier);
export default RechercheCourrierWithAuth;
