import "./courrierDistribution.scss";

import { ReactElement, useContext, useEffect } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";

import { CourrierContext } from "../../../../context/courrierContext.tsx";
import { UserContext } from "../../../../context/userContext.tsx";

import WithAuth from "../../../auth/WithAuth.tsx";
import Header from "../../../../components/header/Header";
import Select from "react-select";
import Button from "../../../../components/button/Button";
import Footer from "../../../../components/footer/Footer";

function CourrierDistribution(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const { courrierID } = useParams();
  const { getCourrier, courrier } = useContext(CourrierContext);
  const { userCredentials } = useContext(UserContext);

  useEffect((): void => {
    if (userCredentials && courrierID) {
      getCourrier(userCredentials, courrierID).finally();
    }
  }, []);

  return (
    <>
      {typeof courrier === "object" && courrier && (
        <>
          <Header
            props={{
              pageURL: `G_IVOO | Gestion des courriers | Distribution du courrier n° ${courrier.cle}`,
              helpBtn: true,
            }}
          />
          <main id="courrierDistribution">
            <section className={"leftContainer iFrameContainer"}>
              <iframe
                title={"courrier"}
                src={`http://192.168.0.254:8080/usv_prod/courriers/${courrier.nomFichier}`}
              />
            </section>
            <section className={"rightContainer"}>
              <form>
                <div className={"inputWrapper"}>
                  <label>Nature Pièce :</label>
                  <Select
                    options={[
                      { value: "", label: "Choisir" },
                      { value: "E", label: "FactureF" },
                    ]}
                  />
                </div>
                <div className={"inputWrapper"}>
                  <label>Site de réception :</label>
                  <Select
                    options={[
                      { value: "", label: "Choisir" },
                      { value: "rochefort", label: "Rochefort" },
                      { value: "laRochelle", label: "La Rochelle" },
                    ]}
                  />
                </div>
                <div className={"inputWrapper"}>
                  <label>Canal d'arrivée :</label>
                  <Select
                    options={[
                      { value: "", label: "Choisir" },
                      { value: "courrier", label: "Courrier" },
                    ]}
                  />
                </div>
                <div className={"inputWrapper"}>
                  <label>Emetteur :</label>
                  <Select
                    options={[
                      { value: "", label: "Choisir" },
                      { value: "1", label: "Greffe du tribunal" },
                    ]}
                  />
                </div>
                <div className={"inputWrapper"}>
                  <label>Destinataire :</label>
                  <Select
                    options={[
                      { value: "", label: "Choisir" },
                      { value: "1", label: "IVOS" },
                    ]}
                  />
                </div>
                <div className={"inputWrapper"}>
                  <label>Service destinataire :</label>
                  <Select
                    options={[
                      { value: "", label: "Choisir" },
                      { value: "1", label: "Finance (compta/tréso)" },
                    ]}
                  />
                </div>
                <div className={"inputWrapper"}>
                  <label>Date pièce :</label>
                  <input type={"date"} />
                </div>
                <div className={"inputWrapper"}>
                  <label>Référence du document :</label>
                  <input type={"text"} />
                </div>
                <div className={"inputWrapper"}>
                  <label>A saisir en compta :</label>
                  <Select
                    options={[
                      { value: "1", label: "Oui" },
                      { value: "0", label: "Non" },
                    ]}
                  />
                </div>
                <div className={"inputWrapper"}>
                  <label>Action :</label>
                  <Select
                    options={[
                      { value: "0", label: "Choisir" },
                      { value: "1", label: "A classer" },
                    ]}
                  />
                </div>
                <div className={"inputWrapper"}>
                  <label>Urgence :</label>
                  <Select
                    options={[
                      { value: "0", label: "Choisir" },
                      { value: "1", label: "Normale" },
                    ]}
                  />
                </div>
                <div className={"inputWrapper"}>
                  <label>Commentaire :</label>
                  <textarea></textarea>
                </div>
                <div className={"inputWrapper"}>
                  <label>Copie à :</label>
                  <Select
                    options={[
                      { value: "0", label: "Choisir" },
                      { value: "1", label: "Direction" },
                    ]}
                  />
                </div>
                <div className={"inputWrapper"}>
                  <label>Partage drive :</label>
                  <Select
                    options={[
                      { value: "1", label: "Oui" },
                      { value: "0", label: "Non" },
                    ]}
                  />
                </div>
                <div className={"inputWrapper"}>
                  <label>Tâche à créer :</label>
                  <Button
                    props={{
                      style: "blue",
                      text: "Créer tâche",
                      type: "button",
                    }}
                  />
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
                        navigate(
                          "/commandes/gestion_des_courriers/courrier_a_distribuer",
                        ),
                    }}
                  />
                </div>
              </form>
            </section>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

const CourrierDistributionWithAuth: (props: object) => ReactElement | null =
  WithAuth(CourrierDistribution);
export default CourrierDistributionWithAuth;
