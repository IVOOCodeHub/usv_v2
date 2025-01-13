// styles
import "./courrierADistribuer.scss";

// hooks | libraries
import { ReactElement, useState } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import Select from "react-select";

// components
import Header from "../../../../components/header/Header";
import WithAuth from "../../../auth/WithAuth.tsx";
import NRTL from "../../../../components/NRTL/NRTL.tsx";
import Button from "../../../../components/button/Button.tsx";
import Footer from "../../../../components/footer/Footer.tsx";

function CourrierADistribuer(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const [kindOfCourrier, setKindOfCourrier] = useState<string>("E");
  const handleChangeKindOfCourrier = (): void => {
    setKindOfCourrier(kindOfCourrier === "E" ? "I" : "E");
  };

  const tableDataEntrant = {
    tableHead: [
      "Réf.",
      "Destinataire",
      "Emetteur",
      "Date",
      "Pièce",
      "Réf.doc",
      "Sél.",
    ],
    tableBody: [
      ["1", "A", "B", "2022-01-01", "C", "D", "E"],
      ["2", "A", "B", "2022-01-01", "C", "D", "E"],
    ],
  };

  const tableDataInterne = {
    tableHead: [
      "Réf.",
      "Destinataire",
      "Emetteur",
      "Date",
      "Pièce",
      "Réf.doc",
      "Sél.",
    ],
    tableBody: [
      ["3", "B", "C", "2024-01-01", "D", "E", "F"],
      ["4", "B", "C", "2024-01-01", "D", "E", "F"],
    ],
  };

  return (
    <>
      <Header
        props={{
          pageURL: `G_IVOO | Gestion des courriers | Courriers ${kindOfCourrier === "E" ? "entrants" : "interne"} a distribuer`,
          helpBtn: true,
        }}
      />
      <main id={"courrierADistribuer"}>
        <Select
          options={[
            { value: "E", label: "Courriers entrants" },
            { value: "I", label: "Courriers internes" },
          ]}
          defaultValue={{ value: "E", label: "Courriers entrants" }}
          onChange={handleChangeKindOfCourrier}
        />
        <div className={"tableContainer"}>
          {kindOfCourrier === "E" ? (
            <NRTL
              datas={tableDataEntrant}
              headerBackgroundColor={
                "linear-gradient(to left, #84CDE4FF, #1092B8)"
              }
              headerHoverBackgroundColor={"#1092B8"}
              showItemsPerPageSelector={true}
              showPreviousNextButtons={true}
              showSearchBar={true}
              filterableColumns={[
                false,
                true,
                true,
                false,
                false,
                false,
                false,
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
                  `/commandes/gestion_des_courriers/courrier_a_distribuer/${rowData![0]}`,
                  {
                    state: { index: index, courrierID: rowData![0] },
                  },
                )
              }
            />
          ) : (
            <NRTL
              datas={tableDataInterne}
              headerBackgroundColor={
                "linear-gradient(to left, #84CDE4FF, #1092B8)"
              }
              headerHoverBackgroundColor={"#1092B8"}
              showItemsPerPageSelector={true}
              showPreviousNextButtons={true}
              showSearchBar={true}
              filterableColumns={[
                false,
                true,
                true,
                false,
                false,
                false,
                false,
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
                  `/commandes/gestion_des_courriers/courrier_a_distribuer/${rowData![0]}`,
                  {
                    state: { index: index, courrierID: rowData![0] },
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
              onClick: (): void => navigate(-1),
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

const CourrierADistribuerWithAuth: (props: object) => ReactElement | null =
  WithAuth(CourrierADistribuer);
export default CourrierADistribuerWithAuth;
