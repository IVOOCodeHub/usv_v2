import "./commandesReceptionList.scss";

import { ReactElement, useState, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

import WithAuth from "../../../auth/WithAuth";
import Header from "../../../../components/header/Header";
import Button from "../../../../components/button/Button.tsx";
import Footer from "../../../../components/footer/Footer";
import NRTL from "../../../../components/NRTL/NRTL.tsx";

function CommandesReceptionList(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const [bodyArray, setBodyArray] = useState<string[][]>([]);

  useEffect((): void => {
    const mockupBody: string[][] = [
      [
        "80",
        "IVOO",
        "GANDI SAS",
        "Abonnement Certificat SSL pour serveur Mail pour un an",
        "48,00",
        "Loïc VALLET (6273)",
      ],
      [
        "91",
        "IVOO",
        "LEROY MERLIN",
        "Commande matériels pour réparations",
        "524,16",
        "Lolita FERRARI (6285)",
      ],
    ];
    setBodyArray(mockupBody);
  }, []);

  const tableData = {
    tableHead: [
      "N°",
      "Société",
      "Tiers",
      "Objet",
      "Montant TTC",
      "Auteur réception",
    ],
    tableBody: bodyArray,
  };

  return (
    <>
      <Header
        props={{
          pageURL: "G_IVOO | COMMANDES | COMMANDES A RECEPTIONNER",
          helpBtn: false,
        }}
      />
      <main id={"commandesReceptionList"}>
        <NRTL
          datas={tableData}
          headerBackgroundColor={"linear-gradient(to left, #84CDE4FF, #1092B8)"}
          headerHoverBackgroundColor={"#1092B8"}
          showItemsPerPageSelector={true}
          showPreviousNextButtons={true}
          showSearchBar={true}
          filterableColumns={[false, true, true, false, false, true]}
          showPagination={true}
          enableColumnSorting={true}
          itemsPerPageOptions={[10, 25, 50]}
          language={"fr"}
          onRowClick={(index: number, rowData?: string[] | undefined): void =>
            navigate(
              `/commandes/commandes_fournisseurs/commandes_reception_list/reception_commande/${rowData![0]}`,
              {
                state: { index: index, commandeID: rowData![0] },
              },
            )
          }
        />

        <div className={"goBackBtnWrapper"}>
          <Button
            props={{
              style: "grey",
              text: "Retour",
              type: "button",
              onClick: (): void =>
                navigate("/commandes/commandes_fournisseurs"),
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

const CommandesReceptionListWithAuth: (props: object) => ReactElement | null =
  WithAuth(CommandesReceptionList);
export default CommandesReceptionListWithAuth;
