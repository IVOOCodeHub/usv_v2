import "./affectationCourrier.scss";

import { ReactElement, useState, useEffect, useContext } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

import { convertENDateToFr } from "../../../../utils/scripts/utils.ts";

import { ICourrierToAffect } from "../../../../utils/types/litiges.interface.ts";

import { UserContext } from "../../../../context/userContext/UserContext";
import { LitigesContext } from "../../../../context/litigesContext/LitigesContext";
import { LoaderContext } from "../../../../context/loaderContext";

import WithAuth from "../../../auth/WithAuth";
import Header from "../../../../components/header/Header";
import NRTL from "../../../../components/NRTL/NRTL";
import Loader from "../../../../components/loader/Loader.tsx";
import Button from "../../../../components/button/Button";
import Footer from "../../../../components/footer/Footer";

const AffectationCourrier = (): ReactElement => {
  const { userCredentials } = useContext(UserContext);
  const { courrierToAffect, getCourrierToAffect } = useContext(LitigesContext);
  const { isLoading } = useContext(LoaderContext);
  const navigate: NavigateFunction = useNavigate();
  const [bodyArray, setBodyArray] = useState<string[][]>([]);

  const tableData = {
    tableHead: [
      "Clé",
      "Date récéption",
      "Émetteur",
      "Déstinataire",
      "Pièce",
      "Commentaire",
    ],
    tableBody: bodyArray,
  };

  const convertToArrayTable = (courriers: ICourrierToAffect[]): string[][] => {
    return courriers.map((courrier: ICourrierToAffect): string[] => [
      courrier.cle,
      convertENDateToFr(courrier.datePiece),
      courrier.societeEmettrice,
      courrier.societe,
      courrier.nature,
      courrier.commentaire,
    ]);
  };

  useEffect((): void => {
    if (userCredentials) {
      getCourrierToAffect(userCredentials).finally();
    }
  }, []);

  useEffect((): void => {
    if (Array.isArray(courrierToAffect)) {
      setBodyArray(convertToArrayTable(courrierToAffect));
    }
  }, [courrierToAffect]);

  return (
    <>
      <Header
        props={{
          pageURL: "G_IVOO | LITIGES | AFFECTATION COURRIER",
          helpBtn: false,
        }}
      />
      <main id={"affectationCourrier"}>
        {isLoading ? (
          <Loader />
        ) : (
          <NRTL
            datas={tableData}
            headerBackgroundColor={
              "linear-gradient(to left, #84CDE4FF, #1092B8)"
            }
            headerHoverBackgroundColor={"#1092B8"}
            showItemsPerPageSelector={true}
            showPreviousNextButtons={true}
            showSearchBar={true}
            filterableColumns={[false, true, true, true, true, false]}
            showPagination={true}
            enableColumnSorting={true}
            itemsPerPageOptions={[10, 25, 50]}
            language={"fr"}
          />
        )}
        <div className={"goBackBtnWrapper"}>
          <Button
            props={{
              style: "grey",
              text: "Retour",
              type: "button",
              onClick: (): void => navigate("/commandes/litiges"),
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

const AffectationCourrierWithAuth: (props: object) => ReactElement | null =
  WithAuth(AffectationCourrier);
export default AffectationCourrierWithAuth;
