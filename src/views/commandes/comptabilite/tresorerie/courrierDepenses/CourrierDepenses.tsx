// styles
import "./courrierDepenses.scss";
import "nillys-react-table-library/style";

// types
import { ReactElement } from "react";
import { NavigateFunction } from "react-router-dom";

// hooks | libraries
import { useNavigate } from "react-router-dom";
import { NRTL } from "nillys-react-table-library";
import { useEffect, useState, useContext } from "react";

// components
import Header from "../../../../../components/header/Header";
import Button from "../../../../../components/button/Button.tsx";
import Footer from "../../../../../components/footer/Footer";

// context
import { UserContext } from "../../../../../context/userContext";
import { CourrierContext } from "../../../../../context/courrierContext.tsx";
import { ICourrierDepenses } from "../../../../../utils/types/courrier.interface.ts";

export default function CourrierDepenses(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const { user } = useContext(UserContext);
  const { courrierDepenses, getCourrierDepenses } = useContext(CourrierContext);
  const [bodyArray, setBodyArray] = useState<string[][]>([]);

  const convertToArray: (datas: ICourrierDepenses[]) => string[][] = (
    datas: ICourrierDepenses[],
  ): string[][] => {
    return datas.map((data: ICourrierDepenses): string[] => [
      data.index,
      data.action,
      data.auteurSaisie,
      data.commentaire,
      data.dhSaisie,
      data.nature,
      data.service,
      data.societe,
      data.societeEmettrice,
      data.statut,
    ]);
  };

  useEffect((): void => {
    getCourrierDepenses(userCredentials!);
  }, []);

  useEffect((): void => {
    if (Array.isArray(courrierDepenses)) {
      setBodyArray(convertToArray(courrierDepenses));
    }
  }, [getCourrierDepenses, courrierDepenses]);

  const userCredentials = {
    matricule: user!.matricule,
    password: user!.password,
  };

  const tableData = {
    tableHead: [
      "Clé",
      "Action",
      "Auteur saisie",
      "Commentaire",
      "DH saisie",
      "Nature",
      "Service",
      "Société",
      "Société émettrice",
      "Statut",
    ],
    tableBody: bodyArray,
  };

  return (
    <>
      <Header props={{ pageURL: "G_IVOO | Comptabilité" }} />
      <main id={"courrierDepenses"}>
        <div className={"tableWrapper"}>
          <NRTL
            datas={tableData}
            headerBackgroundColor={
              "linear-gradient(to left, #84CDE4FF, #1092B8)"
            }
            headerHoverBackgroundColor={"#1092B8"}
            showItemsPerPageSelector={true}
            showPreviousNextButtons={true}
            showSearchBar={true}
            showPagination={true}
            enableColumnSorting={true}
            itemsPerPageOptions={[10, 25, 50]}
          />
        </div>
        <Button
          props={{
            style: "grey",
            text: "Retour",
            type: "button",
            onClick: (): void => navigate("/commandes/tresorerie/menu"),
          }}
        />
      </main>
      <Footer />
    </>
  );
}
