// styles
import "./courrierADistribuer.scss";

// hooks | libraries
import { ReactElement } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
// import Select from "react-select";

// components
import Header from "../../../../components/header/Header";
import WithAuth from "../../../auth/WithAuth.tsx";
import NRTL from "../../../../components/NRTL/NRTL.tsx";
import Button from "../../../../components/button/Button.tsx";
import Footer from "../../../../components/footer/Footer.tsx";

function CourrierADistribuer(): ReactElement {
  const navigate: NavigateFunction = useNavigate();

  const tableData = {
    tableHead: ["Réf.", "Destinataire", "Emetteur", "Date", "Pièce", "Réf.doc", 'Sél.'],
    tableBody: [
      ["1", "A", "B", "2022-01-01", "C", "D", "E"],
      ["2", "A", "B", "2022-01-01", "C", "D", "E"],
    ],
  };

  return (
    <>
      <Header
        props={{
          pageURL:
            "G_IVOO | Gestion des courriers | Courriers entrants a distribuer",
          helpBtn: true,
        }}
      />
      <main id={'courrierADistribuer'}>
        <div className={'tableContainer'}>
          <NRTL
            datas={tableData}
            headerBackgroundColor={
              "linear-gradient(to left, #84CDE4FF, #1092B8)"
            }
            headerHoverBackgroundColor={"#1092B8"}
            showItemsPerPageSelector={true}
            showPreviousNextButtons={true}
            showSearchBar={true}
            filterableColumns={[false, true, true, false, false, false, false]}
            showPagination={true}
            enableColumnSorting={true}
            itemsPerPageOptions={[10, 25, 50]}
            language={"fr"}
          />
        </div>

        <div className={"buttonWrapper"}>
          <Button
            props={{
              style: "grey",
              text: "Retour",
              type: "button",
              onClick: (): void => navigate(-1),
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

const CourrierADistribuerWithAuth = WithAuth(CourrierADistribuer);
export default CourrierADistribuerWithAuth;
