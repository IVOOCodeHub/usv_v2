import "./courrierDistribution.scss";

import { ReactElement, useContext, useEffect } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";

import { CourrierContext } from "../../../../context/courrierContext/CourrierContext";
import { UserContext } from "../../../../context/userContext/UserContext.tsx";

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
  }, [courrierID]);

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
                <div className={"formWrapper"}>
                  <div className={"leftColumn"}>
                    <div className={"inputWrapper"}>
                      <label htmlFor={"naturePiece"}>Nature Pièce :</label>
                      <Select
                        id={"naturePiece"}
                        options={[
                          { value: "", label: "Choisir" },
                          { value: "E", label: "FactureF" },
                        ]}
                      />
                    </div>
                    <div className={"inputWrapper"}>
                      <label htmlFor={"receptionSite"}>
                        Site de réception :
                      </label>
                      <Select
                        id={"receptionSite"}
                        options={[
                          { value: "", label: "Choisir" },
                          { value: "rochefort", label: "Rochefort" },
                          { value: "laRochelle", label: "La Rochelle" },
                        ]}
                      />
                    </div>
                    <div className={"inputWrapper"}>
                      <label htmlFor={"canalReception"}>
                        Canal d'arrivée :
                      </label>
                      <Select
                        id={"canalReception"}
                        options={[
                          { value: "", label: "Choisir" },
                          { value: "courrier", label: "Courrier" },
                        ]}
                      />
                    </div>
                    <div className={"inputWrapper"}>
                      <label htmlFor={"emetteur"}>Émetteur :</label>
                      <Select
                        id={"emetteur"}
                        options={[
                          { value: "", label: "Choisir" },
                          { value: "1", label: "Greffe du tribunal" },
                        ]}
                      />
                    </div>
                    <div className={"inputWrapper"}>
                      <label htmlFor={"destinataire"}>Destinataire :</label>
                      <Select
                        id={"destinataire"}
                        options={[
                          { value: "", label: "Choisir" },
                          { value: "1", label: "IVOS" },
                        ]}
                      />
                    </div>
                    <div className={"inputWrapper"}>
                      <label htmlFor={"serviceDestinataire"}>
                        Service destinataire :
                      </label>
                      <Select
                        id={"serviceDestinataire"}
                        options={[
                          { value: "", label: "Choisir" },
                          { value: "1", label: "Finance (compta/tréso)" },
                        ]}
                      />
                    </div>
                    <div className={"inputWrapper"}>
                      <label htmlFor={"datePiece"}>Date pièce :</label>
                      <input id={"datePiece"} type={"date"} />
                    </div>
                    <div className={"inputWrapper"}>
                      <label htmlFor={"refDoc"}>Référence du document :</label>
                      <input id={"refDoc"} type={"text"} />
                    </div>
                  </div>
                  <div className={"rightColumn"}>
                    <div className={"inputWrapper"}>
                      <label htmlFor={"saisirCompta"}>
                        A saisir en compta :
                      </label>
                      <Select
                        id={"saisirCompta"}
                        options={[
                          { value: "1", label: "Oui" },
                          { value: "0", label: "Non" },
                        ]}
                      />
                    </div>
                    <div className={"inputWrapper"}>
                      <label htmlFor={"action"}>Action :</label>
                      <Select
                        id={"action"}
                        options={[
                          { value: "0", label: "Choisir" },
                          { value: "1", label: "A classer" },
                        ]}
                      />
                    </div>
                    <div className={"inputWrapper"}>
                      <label htmlFor={"urgence"}>Urgence :</label>
                      <Select
                        id={"urgence"}
                        options={[
                          { value: "0", label: "Choisir" },
                          { value: "1", label: "Normale" },
                        ]}
                      />
                    </div>
                    <div className={"inputWrapper"}>
                      <label htmlFor={"comment"}>Commentaire :</label>
                      <textarea id={"comment"}></textarea>
                    </div>
                    <div className={"inputWrapper"}>
                      <label htmlFor={"copyTo"}>Copie à :</label>
                      <Select
                        id={"copyTo"}
                        options={[
                          { value: "0", label: "Choisir" },
                          { value: "1", label: "Direction" },
                        ]}
                      />
                    </div>
                    <div className={"inputWrapper"}>
                      <label htmlFor={"shareDrive"}>Partage drive :</label>
                      <Select
                        id={"shareDrive"}
                        options={[
                          { value: "1", label: "Oui" },
                          { value: "0", label: "Non" },
                        ]}
                      />
                    </div>
                    <div className={"inputWrapper"}>
                      <label htmlFor={"createTask"}>Tâche à créer :</label>
                      <Button
                        props={{
                          style: "blue",
                          text: "Créer tâche",
                          type: "button",
                        }}
                      />
                    </div>
                  </div>
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
