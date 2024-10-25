// utils
import { convertObjectToArray } from "../../../../../utils/scripts/utils.ts";

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

  useEffect(() => {
    getCourrierDepenses(userCredentials!);
  }, [ ]);

  useEffect(() => {
    if (courrierDepenses) {
      const convertToArray = (datas) => {
        return datas.map((data) => [
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
          <NRTL datas={tableData} />
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
