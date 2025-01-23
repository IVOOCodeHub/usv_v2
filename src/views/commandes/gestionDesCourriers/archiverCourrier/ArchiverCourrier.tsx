import "./archiverCourrier.scss";

import { ReactElement } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

import WithAuth from "../../../auth/WithAuth";
import Header from "../../../../components/header/Header";
import Footer from "../../../../components/footer/Footer";
import Button from "../../../../components/button/Button";

function ArchiverCourrier(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  return (
    <>
      <Header
        props={{
          pageURL: `G_IVOO | GESTION DES COURRIERS | UTILITAIRES | ARCHIVER DES COURRIERS`,
          helpBtn: true,
        }}
      />
      <main id={"archiverCourrier"}>
        <section className={"formContainer"}>
          <form>
            <h2>
              En cliquant sur le bouton <span>[ Valider ]</span>, vous allez archiver tous
              les courriers donc la date pièce est strictement inférieure à la
              date maxi à saisir ci-dessous (date non comprise).
            </h2>
            <div className={"inputWrapper"}>
              <label htmlFor={"dateMax"}>Date maxi :</label>
              <input type={"date"} />
            </div>
            <div className={"buttonContainer"}>
              <Button
                props={{
                  style: "green",
                  text: "Valider",
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
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

const ArchiverCourrierWithAuth: (props: object) => ReactElement | null =
  WithAuth(ArchiverCourrier);
export default ArchiverCourrierWithAuth;
