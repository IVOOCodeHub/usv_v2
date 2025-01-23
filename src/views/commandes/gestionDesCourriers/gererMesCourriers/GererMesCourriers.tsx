import "./gererMesCourriers.scss";

import { ReactElement, useEffect, useContext, useState } from "react";
import { useNavigate, NavigateFunction, useParams } from "react-router-dom";

import { UserContext } from "../../../../context/userContext.tsx";
import { CourrierContext } from "../../../../context/courrierContext.tsx";

import WithAuth from "../../../auth/WithAuth.tsx";
import Header from "../../../../components/header/Header";
import Select from "react-select";
import Button from "../../../../components/button/Button.tsx";
import Footer from "../../../../components/footer/Footer";
import SendMail from "../../../../components/sendMail/SendMail";



function GererMesCourriers(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const { courrierID } = useParams();
  const { courrier, getCourrier } = useContext(CourrierContext);
  const { userCredentials } = useContext(UserContext);
  const [isMailModalOpen, setIsMailModalOpen] = useState<boolean>(false);

  useEffect((): void => {
    if (userCredentials && courrierID) {
      getCourrier(userCredentials, courrierID).finally();
    }
  }, [courrierID]);

  return (
    <>
      <Header
        props={{
          pageURL: `G_IVOO | GESTION DES COURRIERS | TRAITER MES COURRIERS | Courrier n°${courrierID}`,
          helpBtn: true,
        }}
      />
      {typeof courrier === "object" && courrier && (
        <main id={"gererMesCourriers"}>
          {isMailModalOpen && <SendMail isModalOpen={isMailModalOpen} setIsModalOpen={setIsMailModalOpen} />}
          <section className={"iFrameContainer leftContainer"}>
            <iframe
              title={"courrier"}
              src={`http://192.168.0.254:8080/usv_prod/courriers/${courrier!.nomFichier}`}
            />
          </section>
          <section className={"formContainer rightContainer"}>
            <form>
              <h2>Courrier n°{courrier.cle}</h2>
              <div className={"inputWrapper"}>
                <label htmlFor={"siteDeReception"}>Site de réception :</label>
                <p>{courrier.site}</p>
              </div>
              <div className={"inputWrapper"}>
                <label htmlFor={"siteDeReception"}>Canal d'arrivée : </label>
                <p>{courrier.canal}</p>
              </div>
              <div className={"inputWrapper"}>
                <label htmlFor={"siteDeReception"}>Société émettrice : </label>
                <p>{courrier.societeEmettrice}</p>
              </div>
              <div className={"inputWrapper"}>
                <label htmlFor={"siteDeReception"}>Nature pièce : </label>
                <Select
                  id={"naturePiece"}
                  options={[
                    { value: "0", label: "Choisir" },
                    { value: "1", label: "INFORMATION REÇU" },
                    { value: "2", label: "ARRÊT DE TRAVAIL" },
                  ]}
                  defaultValue={{ value: "0", label: `${courrier.nature}` }}
                />
              </div>
              <div className={"inputWrapper"}>
                <label htmlFor={"siteDeReception"}>
                  Société destinataire :{" "}
                </label>
                <p>{courrier.codeFournisseurSocieteDestinataire}</p>
              </div>
              <div className={"inputWrapper"}>
                <label htmlFor={"siteDeReception"}>Service : </label>
                <p>{courrier.service}</p>
              </div>
              <div className={"inputWrapper"}>
                <label htmlFor={"siteDeReception"}>Copie à : </label>
                <p>{courrier.serviceCopie}</p>
              </div>
              <div className={"inputWrapper"}>
                <label htmlFor={"siteDeReception"}>Action : </label>
                <p>{courrier.action}</p>
              </div>
              <h2>Statut</h2>
              <div className={"inputWrapper"}>
                <label htmlFor={"siteDeReception"}>Commentaire : </label>
                <textarea defaultValue={courrier.commentaire}></textarea>
              </div>
              <div className={"inputWrapper"}>
                <label htmlFor={"siteDeReception"}>Décision : </label>
                <Select
                  id={"decision"}
                  options={[
                    { value: "0", label: "Choisir" },
                    {
                      value: "1",
                      label:
                        "J'enregistre les modif. je me déciderais plus tard",
                    },
                    { value: "2", label: "A classer" },
                    { value: "3", label: "A traiter" },
                    { value: "4", label: "A supprimer" },
                  ]}
                />
              </div>
              <div className={"buttonContainer"}>
                <Button
                  props={{
                    style: "green",
                    text: "Enregistrer",
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
                        "/commandes/gestion_des_courriers/traiter_mes_courriers",
                      ),
                  }}
                />
              </div>
            </form>
            <form className={"actionButtonContainer"}>
              <Button
                props={{
                  style: "blue",
                  text: "Envoyer par mail",
                  type: "button",
                  onClick: (): void => setIsMailModalOpen(true),
                }}
              />
              <Button
                props={{
                  style: "blue",
                  text: "Crée tâche",
                  type: "button",
                }}
              />
              <Button
                props={{
                  style: "blue",
                  text: "Visualiser tâche",
                  type: "button",
                }}
              />
            </form>
          </section>
        </main>
      )}
      <Footer />
    </>
  );
}

const GererMesCourriersWithAuth: (props: object) => ReactElement | null =
  WithAuth(GererMesCourriers);
export default GererMesCourriersWithAuth;
