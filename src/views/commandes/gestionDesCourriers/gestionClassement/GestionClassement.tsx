import "./gestionClassement.scss";

import { ReactElement } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

import Select from "react-select";
import WithAuth from "../../../auth/WithAuth";
import Header from "../../../../components/header/Header";
import Footer from "../../../../components/footer/Footer";
import Button from "../../../../components/button/Button";

function GestionClassement(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  return (
    <>
      <Header
        props={{
          pageURL: `G_IVOO | GESTION DES COURRIERS | UTILITAIRES | GESTION CLASSEMENT`,
          helpBtn: true,
        }}
      />
      <main id={"gestionClassement"}>
        <form>
          <div className={"inputWrapper"}>
            <label>Classement du service :</label>
            <Select
              options={[
                { value: "", label: "Choisir" },
                { value: "D", label: "Direction" },
                { value: "F", label: "Finance (compta / tréso)" },
              ]}
              defaultValue={{ value: "E", label: "Courriers entrants" }}
            />
          </div>
          <div className={"buttonContainer"}>
            <Button
              props={{
                style: "green",
                text: "Valider",
                type: "button",
                onClick: (): void =>
                  navigate("/commandes/gestion_des_courriers/courrier_utils"),
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
        </form>
      </main>
      <Footer />
    </>
  );
}

const GestionClassementWithAuth: (props: object) => ReactElement | null =
  WithAuth(GestionClassement);
export default GestionClassementWithAuth;
