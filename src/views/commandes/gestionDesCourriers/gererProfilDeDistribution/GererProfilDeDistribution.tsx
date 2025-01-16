import "./gererProfilDeDistribution.scss";
import { ReactElement, useState, useEffect } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

import Select from "react-select";
import WithAuth from "../../../auth/WithAuth.tsx";
import Header from "../../../../components/header/Header";
import NRTL from "../../../../components/NRTL/NRTL.tsx";
import Footer from "../../../../components/footer/Footer";
import Button from "../../../../components/button/Button.tsx";

function GererProfilDeDistribution(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const [selectedKindOfCourrier, setSelectedKindOfCourrier] =
    useState<string>("E");
  const [tableBody, setTableBody] = useState<string[][]>([]);

  const tableData = {
    tableHead: [
      "Clé",
      "Pièce",
      "Sens",
      "Service",
      "Action",
      "Service copie",
      "Action",
      "Drive",
      "Commentaire",
    ],
    tableBody: tableBody,
  };

  const tableBodyEntrant: string[][] = [
    ["82", "A", "B", "2022-01-01", "C", "D", "E", "A", "B"],
    ["71", "A", "B", "2024-01-01", "C", "D", "E", "A", "B"],
  ];

  const tableBodyInterne: string[][] = [
    ["98", "A", "B", "2024-01-01", "C", "D", "E", "A", "B"],
    ["96", "A", "B", "2022-01-01", "C", "D", "E", "A", "B"],
  ];

  const handleChangeKindOfCourrier = (kindOfCourrier: string): void => {
    switch (kindOfCourrier) {
      case "E":
        setTableBody(tableBodyEntrant);
        break;
      case "I":
        setTableBody(tableBodyInterne);
        break;
      default:
        setTableBody(tableBodyEntrant);
        break;
    }
  };

  useEffect(() => {
    handleChangeKindOfCourrier(selectedKindOfCourrier);
  }, [selectedKindOfCourrier]);

  return (
    <>
      <Header
        props={{
          pageURL:
            "G_IVOO | GESTION DES COURRIERS | UTILITAIRES | GESTION DES PROFILS DE DISTRIBUTION",
          helpBtn: true,
        }}
      />
      <main id={"gererProfilDeDistribution"}>
        <div className={"selectKindOfCourrier"}>
          <Select
            id={"kindOfCourrier"}
            options={[
              { value: "E", label: "Courriers entrants" },
              { value: "I", label: "Courriers internes" },
            ]}
            defaultValue={{ value: "E", label: "Courriers entrants" }}
            onChange={(selectedOption): void => {
              if (selectedOption) {
                console.log("selectedOption:", selectedOption);
                setSelectedKindOfCourrier(selectedOption.value);
              }
            }}
          />
        </div>
        <NRTL
          datas={tableData}
          headerBackgroundColor={"linear-gradient(to left, #84CDE4FF, #1092B8)"}
          headerHoverBackgroundColor={"#1092B8"}
          showItemsPerPageSelector={true}
          showPreviousNextButtons={true}
          showSearchBar={true}
          filterableColumns={[false, true, true, false, false, false, false]}
          showPagination={true}
          enableColumnSorting={true}
          itemsPerPageOptions={[10, 25, 50]}
          language={"fr"}
          onRowClick={(index: number, rowData: string[] | undefined): void =>
            navigate(
              `/commandes/gestion_des_courriers/courrier_utils/modifier_profil_distribution/${rowData![0]}`,
              {
                state: { index: index, profilID: rowData![0] },
              },
            )
          }
        />

        <div className={"goBackBtnWrapper"}>
          <Button
            props={{
              style: "green",
              text: "Nouveau",
              type: "button",
            }}
          />
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

const GererProfilDeDistributionWithAuth: (
  props: object,
) => ReactElement | null = WithAuth(GererProfilDeDistribution);
export default GererProfilDeDistributionWithAuth;
