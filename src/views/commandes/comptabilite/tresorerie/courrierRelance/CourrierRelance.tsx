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
import DisplayCourrierModalWithAuth from "../../../../../components/displayCourrierModal/DisplayCourrierModal.tsx";
import Footer from "../../../../../components/footer/Footer";

// context
import { UserContext } from "../../../../../context/userContext.tsx";
import { CourrierContext } from "../../../../../context/courrierContext.tsx";
import { TiersContext } from "../../../../../context/tiersContext.tsx";
import { ITiersPrevisions } from "../../../../../utils/types/tiers.interface.ts";
import { ICourrier } from "../../../../../utils/types/courrier.interface.ts";

export function CourrierRelance(): ReactElement {
  const { userCredentials } = useContext(UserContext);
  const { getCourrier, courrier } = useContext(CourrierContext);
  const { getTiersPrevisions, tiersPrevisions } = useContext(TiersContext);
  const [firstBodyArray, setFirstBodyArray] = useState<string[][]>([]);
  const [secondBodyArray, setSecondBodyArray] = useState<string[][]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const firstTableData = {
    tableHead: [
      "Courrier",
      "Émetteur",
      "Destinataire",
      "Nature",
      "Service",
      "Commentaire",
    ],
    tableBody: firstBodyArray,
  };

  const convertToArrayForFirstTable = (courriers: ICourrier[]): string[][] => {
    return courriers.map((courrier: ICourrier): string[] => [
      courrier.cle,
      courrier.societeEmettrice,
      courrier.societe,
      courrier.nature,
      courrier.service,
      courrier.commentaire,
    ]);
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

  const keepTwoDecimals = (number: number): string => {
    return new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  const convertToArrayForSecondTable = (
    previsions: ITiersPrevisions[],
  ): string[][] => {
    return previsions.map((previsions: ITiersPrevisions): string[] => [
      previsions.cle,
      previsions.dateEcheance,
      previsions.libelleEcriture,
      keepTwoDecimals(parseFloat(previsions.credit)) + " €",
      previsions.statut,
      previsions.referencePaiement === "0"
        ? "Aucune"
        : previsions.referencePaiement,
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

  useEffect((): void => {
    if (courrier && typeof courrier !== "string") {
      setFirstBodyArray(convertToArrayForFirstTable([courrier]));
    } else {
      console.error(`Error with getCourrierService request : ${courrier}`);
    }
  }, [courrier]);

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
      {courrier && typeof courrier !== "string" && (
        <main id={"courrierRelance"}>
          {isModalOpen && (
            <div className={"modalContainer"}>
              <DisplayCourrierModalWithAuth
                props={{
                  selectedCourrier: courrier,
                  isModalOpen,
                  setIsModalOpen: setIsModalOpen,
                }}
              />
            </div>
          )}
          <section className={"courrierRelance__topSection"}>
            <NRTL
              datas={firstTableData}
              headerBackgroundColor={
                "linear-gradient(to left, #84CDE4FF, #1092B8)"
              }
              headerHoverBackgroundColor={"#1092B8"}
              language={"fr"}
            />
            <div className={"buttonWrapper"}>
              <Button
                props={{
                  style: "white",
                  text: "Voir courrier",
                  type: "button",
                  onClick: (): void => setIsModalOpen(true),
                }}
              />
              <Button
                props={{
                  style: "white",
                  text: "Requalifier",
                  type: "button",
                  onClick: (): void =>
                    navigate("/commandes/tresorerie/courrier_requalification", {
                      state: courrier,
                    }),
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
                <label htmlFor={"minDate"}>Date mini</label>
                <input name={"minDate"} type={"date"} />
              </div>
              <div className={"inputWrapper"}>
                <label htmlFor={"maxDate"}>Date maxi</label>
                <input name={"maxDate"} type={"date"} />
              </div>
              <div className={"inputWrapper"}>
                <label htmlFor={"libelle"}>Libellé</label>
                <input name={"libelle"} type={"text"} />
              </div>
              <div className={"inputWrapper"}>
                <label htmlFor={"minAmount"}>Montant mini</label>
                <input name={"minAmount"} type={"text"} />
              </div>
              <div className={"inputWrapper"}>
                <label htmlFor={"maxAmount"}>Montant maxi</label>
                <input name={"maxAmount"} type={"text"} />
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
              itemsPerPageOptions={[5, 25, 50]}
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
      )}
      <Footer />
    </>
  );
}

const CourrierRelanceWithAuth: (props: object) => ReactElement | null =
  withAuth(CourrierRelance);
export default CourrierRelanceWithAuth;
