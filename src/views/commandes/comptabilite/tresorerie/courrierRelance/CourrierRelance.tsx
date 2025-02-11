// styles
import "./courrierRelance.scss";

// utils
import { convertENDateToFr } from "../../../../../utils/scripts/utils.ts";

// hooks | libraries
import {
  ReactElement,
  useContext,
  useEffect,
  useState,
  ChangeEvent,
  useRef,
} from "react";
import { useNavigate, NavigateFunction, useLocation } from "react-router-dom";

// components
import withAuth from "../../../../auth/WithAuth.tsx";
import Header from "../../../../../components/header/Header";
import Button from "../../../../../components/button/Button";
import NRTL from "../../../../../components/NRTL/NRTL";
import DisplayCourrierModalWithAuth from "../../../../../components/displayCourrierModal/DisplayCourrierModal.tsx";
import Footer from "../../../../../components/footer/Footer";

// context
import { UserContext } from "../../../../../context/userContext/UserContext.tsx";
import { CourrierContext } from "../../../../../context/courrierContext/CourrierContext";
import { TiersContext } from "../../../../../context/tiersContext.tsx";
import { ITiersPrevisions } from "../../../../../utils/types/tiers.interface.ts";
import { ICourrier } from "../../../../../utils/types/courrier.interface.ts";

export function CourrierRelance(): ReactElement {
  const { userCredentials } = useContext(UserContext);
  const { getCourrier, courrier } = useContext(CourrierContext);
  const { getTiersPrevisions, tiersPrevisions } = useContext(TiersContext);
  const modalPrevRef = useRef<HTMLDivElement | null>(null);
  const [firstBodyArray, setFirstBodyArray] = useState<string[][]>([]);
  const [secondBodyArray, setSecondBodyArray] = useState<string[][]>([]);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPrevision, setSelectedPrevision] =
    useState<ITiersPrevisions | null>(null);
  const [filters, setFilters] = useState({
    minDate: "",
    maxDate: "",
    libelle: "",
    minAmount: "",
    maxAmount: "",
  });

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

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFilters(
      (prevFilters: {
        minDate: string;
        maxDate: string;
        libelle: string;
        minAmount: string;
        maxAmount: string;
      }): {
        minDate: string;
        maxDate: string;
        libelle: string;
        minAmount: string;
        maxAmount: string;
      } => ({
        ...prevFilters,
        [name]: value,
      }),
    );
  };

  const handleSecondTableRowClick = (rowIndex: number): void => {
    if (typeof tiersPrevisions === "object") {
      const selected: ITiersPrevisions = tiersPrevisions![rowIndex];
      setSelectedPrevision(selected);
      setIsDetailsModalOpen(true);
    }
    console.log("selectedPrevision =>", selectedPrevision);
  };

  const DetailsModal: (props: {
    prevision: ITiersPrevisions;
    onClose: () => void;
  }) => ReactElement | undefined = (props: {
    prevision: ITiersPrevisions;
    onClose: () => void;
  }): ReactElement | undefined => {
    const { prevision, onClose } = props;

    if (courrier && typeof courrier === "object" && tiersPrevisions) {
      return (
        <article className={"displayDetailsModal"}>
          <div ref={modalPrevRef}>
            <h2>
              Vous traitez le courrier de relance {courrier.cle}, vous avez
              choisi la prévision {prevision.cle}, que voulez-vous faire ?
            </h2>
            <ul>
              <li>
                <Button
                  props={{
                    style: "blue",
                    text: `Associer ce courrier à la prévision ${prevision.cle}`,
                    type: "button",
                    onClick: () => null,
                  }}
                />
              </li>
              <li>
                <Button
                  props={{
                    style: "blue",
                    text: "Classer le courrier",
                    type: "button",
                    onClick: () => null,
                  }}
                />
              </li>
              <li>
                <Button
                  props={{
                    style: "blue",
                    text: "Associer ce courrier à un dossier litige en cours",
                    type: "button",
                    onClick: () => null,
                  }}
                />
              </li>
            </ul>
            <Button
              props={{
                style: "grey",
                text: "Fermer",
                type: "button",
                onClick: (): void => {
                  onClose();
                },
              }}
            />
          </div>
        </article>
      );
    }
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

  useEffect((): void => {
    if (Array.isArray(tiersPrevisions)) {
      let filteredData: ITiersPrevisions[] = [...tiersPrevisions];

      // filter by min Date
      if (filters.minDate) {
        filteredData = filteredData.filter(
          (item: ITiersPrevisions): boolean =>
            item.dateEcheance <= convertENDateToFr(filters.minDate),
        );
      }

      // filter by max Date
      if (filters.maxDate) {
        filteredData = filteredData.filter(
          (item: ITiersPrevisions): boolean =>
            item.dateEcheance >= convertENDateToFr(filters.maxDate),
        );
      }

      // filter by libelle
      if (filters.libelle) {
        filteredData = filteredData.filter((item: ITiersPrevisions): boolean =>
          item.libelleEcriture
            .toLowerCase()
            .includes(filters.libelle.toLowerCase()),
        );
      }

      // filter by min Amount
      if (filters.minAmount) {
        const minVal: number = parseFloat(filters.minAmount);
        filteredData = filteredData.filter(
          (item: ITiersPrevisions): boolean =>
            parseFloat(item.credit) >= minVal,
        );
      }

      // filter by max Amount
      if (filters.maxAmount) {
        const maxVal: number = parseFloat(filters.maxAmount);
        filteredData = filteredData.filter(
          (item: ITiersPrevisions): boolean =>
            parseFloat(item.credit) <= maxVal,
        );
      }

      // update table with tableFilter
      setSecondBodyArray(convertToArrayForSecondTable(filteredData));
    }
  }, [tiersPrevisions, filters]);

  useEffect((): (() => void) => {
    const handleClickOutside: (event: MouseEvent) => void = (
      event: MouseEvent,
    ): void => {
      event.preventDefault();
      if (
        modalPrevRef.current &&
        !modalPrevRef.current.contains(event.target as Node)
      ) {
        setIsDetailsModalOpen(false);
      }
    };
    if (isDetailsModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return (): void => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDetailsModalOpen]);

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
          {isDetailsModalOpen && selectedPrevision && (
            <div className={"modalContainer"}>
              <DetailsModal
                prevision={selectedPrevision}
                onClose={(): void => setIsDetailsModalOpen(false)}
              />
            </div>
          )}
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
                <label htmlFor={"minDate"}>Date mini : </label>
                <input
                  onChange={handleFilterChange}
                  name={"minDate"}
                  type={"date"}
                />
              </div>
              <div className={"inputWrapper"}>
                <label htmlFor={"maxDate"}>Date maxi : </label>
                <input
                  onChange={handleFilterChange}
                  name={"maxDate"}
                  type={"date"}
                />
              </div>
              <div className={"inputWrapper"}>
                <label htmlFor={"libelle"}>Libellé : </label>
                <input
                  onChange={handleFilterChange}
                  name={"libelle"}
                  type={"text"}
                />
              </div>
              <div className={"inputWrapper"}>
                <label htmlFor={"minAmount"}>Montant mini : </label>
                <input
                  onChange={handleFilterChange}
                  name={"minAmount"}
                  type={"number"}
                />
              </div>
              <div className={"inputWrapper"}>
                <label htmlFor={"maxAmount"}>Montant maxi : </label>
                <input
                  onChange={handleFilterChange}
                  name={"maxAmount"}
                  type={"number"}
                />
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
              onRowClick={(index: number): void =>
                handleSecondTableRowClick(index)
              }
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
