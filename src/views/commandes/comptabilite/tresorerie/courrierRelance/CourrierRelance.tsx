// styles
import "./courrierRelance.scss";

// hooks | libraries
import { ReactElement, useContext, useEffect, useState } from "react";
import { useNavigate, NavigateFunction, useLocation } from "react-router-dom";

// components
import withAuth from "../../../../../views/auth/withAuth";
import Header from "../../../../../components/header/Header";
import Button from "../../../../../components/button/Button";
import NRTL from "../../../../../components/NRTL/NRTL";
import Footer from "../../../../../components/footer/Footer";

// context
import { UserContext } from "../../../../../context/userContext.tsx";
import { CourrierContext } from "../../../../../context/courrierContext.tsx";
import { TiersContext } from "../../../../../context/tiersContext.tsx";
import { ITiersPrevisions } from "../../../../../utils/types/tiers.interface.ts";

export function CourrierRelance(): ReactElement {
  const { userCredentials } = useContext(UserContext);
  const { getCourrier, courrier } = useContext(CourrierContext);
  const { getTiersPrevisions, tiersPrevisions } = useContext(TiersContext);
  const [secondBodyArray, setSecondBodyArray] = useState<string[][]>([]);

  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();
  const { rowData } = location.state;
  const relanceInitialData = {
    courrierID: rowData[0],
    dateReception: rowData[1],
    tiers: rowData[2],
    societe: rowData[3],
    nature: rowData[4],
    action: rowData[5],
    commentaire: rowData[6],
  };

  const tableData = {
    tableHead: [
      "Courrier",
      "Émetteur",
      "Destinataire",
      "Nature",
      "Service",
      "Commentaire",
    ],
    tableBody: [rowData],
  };

  const secondTableData = {
    tableHead: [
      "Clé prévision",
      "Date échéance",
      "Libellé",
      "Montant",
      "Statut",
      "Réf. paiement",
    ],
    tableBody: secondBodyArray,
  };

  const convertToArrayForSecondTable: (
    datas: ITiersPrevisions[],
  ) => string[][] = (datas: ITiersPrevisions[]): string[][] => {
    return datas.map((data: ITiersPrevisions): string[] => [
      data.cle,
      data.dateEcheance,
      data.libelleEcriture,
      data.credit,
      data.statut,
      data.referencePaiement,
    ]);
  };

  useEffect((): void => {
    if (userCredentials) {
      getCourrier(userCredentials, relanceInitialData.courrierID).finally();
    }
  }, []);

  useEffect((): void => {
    if (userCredentials && courrier && typeof courrier === "object") {
      getTiersPrevisions(
        userCredentials,
        courrier.codeFournisseurSocieteEmettrice,
      ).finally();
    }
  }, [courrier]);

  console.log("courrier ->", courrier);
  console.log("tiersPrevision ->", tiersPrevisions);

  useEffect((): void => {
    if (Array.isArray(tiersPrevisions)) {
      setSecondBodyArray(convertToArrayForSecondTable(tiersPrevisions));
    }
  }, [tiersPrevisions]);

  return (
    <>
      <Header
        props={{
          pageURL: `G_IVOO | Comptabilité | Trésorerie | Courrier Relance ${relanceInitialData.courrierID} | Prévision du tiers ${relanceInitialData.tiers} `,
          helpBtn: true,
        }}
      />
      <main id={"courrierRelance"}>
        <section className={"courrierRelance__topSection"}>
          <NRTL
            datas={tableData}
            headerBackgroundColor={
              "linear-gradient(to left, #84CDE4FF, #1092B8)"
            }
            headerHoverBackgroundColor={"#1092B8"}
            onRowClick={() => ""}
            language={"fr"}
          />
          <div className={"buttonWrapper"}>
            <Button
              props={{
                style: "white",
                text: "Voir courrier",
                type: "button",
                onClick: (): void => navigate("/commandes/tresorerie/menu"),
              }}
            />
            <Button
              props={{
                style: "white",
                text: "Requalifier",
                type: "button",
                onClick: (): void => navigate("/commandes/tresorerie/menu"),
              }}
            />
            <Button
              props={{
                style: "white",
                text: "Associer à un litige",
                type: "button",
                onClick: (): void => navigate("/commandes/tresorerie/menu"),
              }}
            />
          </div>
        </section>

        <section className={"courrierRelance__bottomSection"}>
          <form>
            <div className={"inputWrapper"}>
              <label>Date mini</label>
              <input type={"date"} />
            </div>
            <div className={"inputWrapper"}>
              <label>Date maxi</label>
              <input type={"date"} />
            </div>
            <div className={"inputWrapper"}>
              <label>Libellé</label>
              <input type={"text"} />
            </div>
            <div className={"inputWrapper"}>
              <label>Montant mini</label>
              <input type={"date"} />
            </div>
            <div className={"inputWrapper"}>
              <label>Montant maxi</label>
              <input type={"date"} />
            </div>
          </form>
          <NRTL
            datas={secondTableData}
            headerBackgroundColor={
              "linear-gradient(to left, #84CDE4FF, #1092B8)"
            }
            headerHoverBackgroundColor={"#1092B8"}
            showPreviousNextButtons={true}
            enableColumnSorting={true}
            showItemsPerPageSelector={true}
            showSearchBar={true}
            showPagination={true}
            itemsPerPageOptions={[15, 25, 50]}
            onRowClick={() => ""}
            filterableColumns={[false, false, false, false, true, false]}
            language={"fr"}
          />
        </section>

        <div className={"goBackBtnWrapper"}>
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

const CourrierRelanceWithAuth: (props: object) => ReactElement | null =
  withAuth(CourrierRelance);
export default CourrierRelanceWithAuth;
