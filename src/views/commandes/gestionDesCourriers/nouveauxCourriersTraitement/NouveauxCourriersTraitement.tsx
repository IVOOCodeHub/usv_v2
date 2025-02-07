// styles
import "./nouveauCourriersTraitement.scss";

// hooks | libraries
import { ReactElement, useContext, useEffect } from "react";
import { useNavigate, NavigateFunction, useLocation } from "react-router-dom";

// components
import Header from "../../../../components/header/Header";
import Button from "../../../../components/button/Button";
import Select from "react-select";
import Footer from "../../../../components/footer/Footer";
import WithAuth from "../../../auth/WithAuth";

// context
import { FileContext } from "../../../../context/fileContext/FileContext.tsx";
function NouveauxCourriersTraitement(): ReactElement {
  const { fileURL } = useContext(FileContext);
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { kindOfPiece } = state;

  const translateKindOfPiece = (kindOfPiece: string): string => {
    switch (kindOfPiece) {
      case "RECEIVED":
        return "entrant";
      case "INTERNAL":
        return "interne";
      case "SENT":
        return "sortant";
      default:
        return "non défini";
    }
  };

  useEffect((): void => {
    if (!fileURL) {
      navigate(-1);
    }
  });

  console.log("kindOfPiece =>", kindOfPiece);

  return (
    <>
      <Header
        props={{
          pageURL:
            "G_IVOO | Gestion des courriers | Nouveaux courriers | Traitement du courrier",
          helpBtn: true,
        }}
      />
      {fileURL && (
        <main id={"nouveauxCourriersTraitement"}>
          <div className={"container"}>
            <section className={"leftSide iFrameContainer"}>
              <iframe title={"courrier"} src={fileURL} />
            </section>
            <section className={"rightSide"}>
              <h2>Définir un courrier {translateKindOfPiece(kindOfPiece)}</h2>
              <form>
                <div className={"inputWrapper"}>
                  <label htmlFor={"naturePiece"}>Nature de la pièce :</label>
                  <Select
                    id={"naturePiece"}
                    options={[
                      { value: "1", label: "Article" },
                      { value: "2", label: "Lettre" },
                      { value: "3", label: "Document" },
                    ]}
                  />
                </div>
                <div className={"inputWrapper"}>
                  <label htmlFor={"naturePiece"}>
                    {kindOfPiece === "SENT"
                      ? "Site d'envoi"
                      : "Site de réception :"}
                  </label>
                  <Select
                    id={"naturePiece"}
                    options={[
                      { value: "1", label: "Article" },
                      { value: "2", label: "Lettre" },
                      { value: "3", label: "Document" },
                    ]}
                  />
                </div>
                <div className={"inputWrapper"}>
                  <label htmlFor={"naturePiece"}>
                    {kindOfPiece === "SENT"
                      ? "Canal d'envoi :"
                      : "Canal d'arrivée :"}
                  </label>
                  <Select
                    id={"naturePiece"}
                    options={[
                      { value: "1", label: "Article" },
                      { value: "2", label: "Lettre" },
                      { value: "3", label: "Document" },
                    ]}
                  />
                </div>
                <div className={"inputWrapper"}>
                  <label htmlFor={"naturePiece"}>Société émettrice :</label>
                  <Select
                    id={"naturePiece"}
                    options={[
                      { value: "1", label: "Article" },
                      { value: "2", label: "Lettre" },
                      { value: "3", label: "Document" },
                    ]}
                  />
                </div>
                <div className={"inputWrapper destinataireInputWrapper"}>
                  <label htmlFor={"naturePiece"}>Société destinataire :</label>
                  <Button
                    props={{ style: "blue", text: "Nouveau destinataire", type: "button" }}
                  />
                  <Select
                    id={"naturePiece"}
                    options={[
                      { value: "1", label: "Article" },
                      { value: "2", label: "Lettre" },
                      { value: "3", label: "Document" },
                    ]}
                  />
                </div>
                <div className={"inputWrapper"}>
                  <label htmlFor={"datePiece"}>Date pièce :</label>
                  <input type={"date"} id={"datePiece"} />
                </div>
                <div className={"inputWrapper"}>
                  <label htmlFor={"refDoc"}>Référence du document :</label>
                  <input type={"text"} id={"refDoc"} />
                </div>
                <div className={"inputWrapper"}>
                  <label htmlFor={"commentaire"}>Commentaire</label>
                  <textarea></textarea>
                </div>
                <div className={"inputWrapper"}>
                  <label htmlFor={"distributionDirecte"}>Distribution directe :</label>
                  <Select
                    options={[
                      { value: "0", label: "Non" },
                      { value: "1", label: "Oui" },
                    ]}
                    id={"distributionDirecte"}
                  />
                </div>
                <div className={"buttonWrapper"}>
                  <Button
                    props={{
                      style: "green",
                      text: "Enregistrer",
                      type: "submit",
                    }}
                  />
                </div>
              </form>
            </section>
          </div>
          <div className={"goBackBtnWrapper"}>
            <Button
              props={{
                style: "grey",
                text: "Retour",
                type: "button",
                onClick: (): void => {
                  navigate(-1);
                },
              }}
            />
          </div>
        </main>
      )}
      <Footer />
    </>
  );
}

const NouveauxCourriersTraitementWithAuth: (
  props: object,
) => ReactElement | null = WithAuth(NouveauxCourriersTraitement);
export default NouveauxCourriersTraitementWithAuth;
