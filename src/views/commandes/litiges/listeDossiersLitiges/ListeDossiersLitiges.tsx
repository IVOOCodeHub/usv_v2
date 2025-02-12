import "./listeDossiersLitiges.scss";

import { concatSocieteVsTiers, convertENDateToFr } from "../../../../utils/scripts/utils";

import { ReactElement, useState, useEffect, useContext } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

import { ILitigeDossier } from "../../../../utils/types/litiges.interface.ts";

import WithAuth from "../../../auth/WithAuth";
import Header from "../../../../components/header/Header";
import Loader from "../../../../components/loader/Loader.tsx";
import Button from "../../../../components/button/Button";
import Footer from "../../../../components/footer/Footer";

import NRTL from "../../../../components/NRTL/NRTL.tsx";

import { UserContext } from "../../../../context/userContext/UserContext";
import { LitigesContext } from "../../../../context/litigesContext/LitigesContext";
import { LoaderContext } from "../../../../context/loaderContext";

function ListeDossiersLitiges(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const { userCredentials } = useContext(UserContext);
  const { litigesDossiers, getLitigesDossiers } = useContext(LitigesContext);
  const { isLoading } = useContext(LoaderContext);
  const [bodyArray, setBodyArray] = useState<string[][]>([]);

  const tableData = {
    tableHead: [
      "Clé",
      "Nom",
      "Commentaire",
      "Date de début",
      "Thème",
      "Statut",
    ],
    tableBody: bodyArray,
  };

  const convertToArrayTable = (dossiers: ILitigeDossier[]): string[][] => {
    return dossiers.map((dossier: ILitigeDossier): string[] => [
      dossier.cle,
      concatSocieteVsTiers(dossier.societe, dossier.tiers),
      dossier.commentaire,
      convertENDateToFr(dossier.dateDebut),
      dossier.theme,
      dossier.statut,
    ]);
  };

  useEffect((): void => {
    if (userCredentials) {
      getLitigesDossiers(userCredentials).finally();
    }
  }, []);

  useEffect((): void => {
    if (Array.isArray(litigesDossiers)) {
      setBodyArray(convertToArrayTable(litigesDossiers));
    }
  }, [litigesDossiers]);

  return (
    <>
      <Header
        props={{
          pageURL: "G_IVOO | LITIGES | LISTE DES DOSSIERS",
          helpBtn: false,
        }}
      />
      <main id={"listeDossiersLitige"}>
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
            filterableColumns={[false, true, false, true, true, true]}
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
}

const ListeDossiersLitigesWithAuth: (props: object) => ReactElement | null =
  WithAuth(ListeDossiersLitiges);
export default ListeDossiersLitigesWithAuth;
