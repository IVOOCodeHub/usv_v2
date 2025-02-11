import "./modifCourrier.scss";

import { ReactElement, useContext, useEffect } from "react";
import { useNavigate, NavigateFunction, useParams } from "react-router-dom";

import { UserContext } from "../../../../context/userContext/UserContext.tsx";
import { CourrierContext } from "../../../../context/courrierContext/CourrierContext";

import WithAuth from "../../../auth/WithAuth.tsx";
import Header from "../../../../components/header/Header";
import Button from "../../../../components/button/Button.tsx";
import Footer from "../../../../components/footer/Footer";
import Select from "react-select";

function ModifCourrier(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const { userCredentials } = useContext(UserContext);
  const { courrier, getCourrier } = useContext(CourrierContext);
  const { courrierID } = useParams();

  useEffect((): void => {
    if (userCredentials && courrierID) {
      getCourrier(userCredentials, courrierID).finally();
    }
  }, [courrierID]);

  return (
    <>
      <Header
        props={{
          pageURL: `G_IVOO | GESTION DES COURRIERS | MODIFICATION DU COURRIER INTERNE N°${courrierID}`,
          helpBtn: true,
        }}
      />
      {typeof courrier === "object" && courrier && (
        <main id={"modifCourrier"}>
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
                    <label htmlFor={"cle"}>Site de réception :</label>
                    <Select
                      id={"cle"}
                      options={[
                        { value: "", label: "Choisir" },
                        { value: "", label: "Rochefort" },
                      ]}
                      defaultValue={{ value: "", label: "Rochefort" }}
                    />
                  </div>
                  <div className={"inputWrapper"}>
                    <label htmlFor={"cle"}>Sens :</label>
                    <Select
                      id={"naturePiece"}
                      options={[
                        { value: "", label: "Choisir" },
                        { value: "", label: "FactureF" },
                      ]}
                      defaultValue={{ value: "", label: "Entrant" }}
                    />
                  </div>
                  <div className={"inputWrapper"}>
                    <label htmlFor={"cle"}>Canal d'envoi :</label>
                    <Select
                      id={"naturePiece"}
                      options={[
                        { value: "", label: "Courrier" },
                        { value: "", label: "FactureF" },
                      ]}
                      defaultValue={{ value: "", label: "Courrier" }}
                    />
                  </div>
                  <div className={"inputWrapper"}>
                    <label htmlFor={"cle"}>Societé émettrice :</label>
                    <Select
                      id={"naturePiece"}
                      options={[
                        { value: "", label: "Courrier" },
                        { value: "", label: "FactureF" },
                      ]}
                      defaultValue={{ value: "", label: "Courrier" }}
                    />
                  </div>
                  <div className={"inputWrapper"}>
                    <label htmlFor={"cle"}>Nature pièce :</label>
                    <Select
                      id={"naturePiece"}
                      options={[
                        { value: "", label: "Choisir" },
                        { value: "", label: "FactureF" },
                      ]}
                      defaultValue={{ value: "", label: "Entrant" }}
                    />
                  </div>
                  <div className={"inputWrapper"}>
                    <label htmlFor={"cle"}>Date pièce :</label>
                    <input type={"date"} />
                  </div>
                  <div className={"inputWrapper"}>
                    <label htmlFor={"cle"}>Référence document :</label>
                    <input type={"text"} />
                  </div>
                  <div className={"inputWrapper"}>
                    <label htmlFor={"cle"}>Clé prévision :</label>
                    <input type={"text"} className={'readOnly'} readOnly={true} />
                  </div>
                  <div className={"inputWrapper"}>
                    <label htmlFor={"cle"}>Clé paiement :</label>
                    <input type={"text"} className={'readOnly'} readOnly={true} />
                  </div>
                </div>
                <div className={"rightColumn"}>
                  <div className={"inputWrapper"}>
                    <label htmlFor={"cle"}>Société destinataire :</label>
                    <Select
                      id={"naturePiece"}
                      options={[
                        { value: "", label: "Choisir" },
                        { value: "", label: "FactureF" },
                      ]}
                      defaultValue={{ value: "", label: "Entrant" }}
                    />
                  </div>
                  <div className={"inputWrapper"}>
                    <label htmlFor={"cle"}>Service destinataire :</label>
                    <Select
                      id={"naturePiece"}
                      options={[
                        { value: "", label: "Choisir" },
                        { value: "", label: "FactureF" },
                      ]}
                      defaultValue={{ value: "", label: "Entrant" }}
                    />
                  </div>
                  <div className={"inputWrapper"}>
                    <label htmlFor={"cle"}>Service copie :</label>
                    <Select
                      id={"naturePiece"}
                      options={[
                        { value: "", label: "Choisir" },
                        { value: "", label: "FactureF" },
                      ]}
                      defaultValue={{ value: "", label: "Entrant" }}
                    />
                  </div>
                  <div className={"inputWrapper"}>
                    <label htmlFor={"cle"}>action :</label>
                    <Select
                      id={"naturePiece"}
                      options={[
                        { value: "", label: "Choisir" },
                        { value: "", label: "FactureF" },
                      ]}
                      defaultValue={{ value: "", label: "Entrant" }}
                    />
                  </div>
                  <div className={"inputWrapper"}>
                    <label htmlFor={"cle"}>Statut :</label>
                    <Select
                      id={"naturePiece"}
                      options={[
                        { value: "", label: "Choisir" },
                        { value: "", label: "FactureF" },
                      ]}
                      defaultValue={{ value: "", label: "Entrant" }}
                    />
                  </div>
                  <div className={"inputWrapper"}>
                    <label htmlFor={"cle"}>Commentaire :</label>
                    <textarea></textarea>
                  </div>
                </div>
              </div>
              <div className={"archiveContainer"}>
                <div className={"inputWrapper"}>
                  <label htmlFor={"cle"}>Armoire :</label>
                  <Select
                    id={"naturePiece"}
                    options={[
                      { value: "", label: "Choisir" },
                      { value: "", label: "FactureF" },
                    ]}
                    defaultValue={{ value: "", label: "Entrant" }}
                  />
                </div>
                <div className={"inputWrapper"}>
                  <label htmlFor={"cle"}>Tiroir :</label>
                  <Select
                    id={"naturePiece"}
                    options={[
                      { value: "", label: "Choisir" },
                      { value: "", label: "FactureF" },
                    ]}
                    defaultValue={{ value: "", label: "Entrant" }}
                  />
                </div>
                <div className={"inputWrapper"}>
                  <label htmlFor={"cle"}>Classeur :</label>
                  <Select
                    id={"naturePiece"}
                    options={[
                      { value: "", label: "Choisir" },
                      { value: "", label: "FactureF" },
                    ]}
                    defaultValue={{ value: "", label: "Entrant" }}
                  />
                </div>
              </div>

              <div className={"buttonContainer"}>
                <Button
                  props={{
                      style: "green",
                      text: "Enregistrer les modifications",
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
                        "/commandes/gestion_des_courriers/courrier_utils/recherche_courrier",
                      ),
                  }}
                />
              </div>
            </form>
          </section>
        </main>
      )}
      <Footer />
    </>
  );
}

const ModifCourrierWithAuth: (props: object) => ReactElement | null =
  WithAuth(ModifCourrier);
export default ModifCourrierWithAuth;
