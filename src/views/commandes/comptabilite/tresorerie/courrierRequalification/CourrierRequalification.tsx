// styles
import "./courrierRequalification.scss";

// hooks | library
import { ReactElement, useContext } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

// components
import WithAuth from "../../../../auth/WithAuth.tsx";
import Header from "../../../../../components/header/Header";
import Select from "react-select";
import Button from "../../../../../components/button/Button.tsx";
import Footer from "../../../../../components/footer/Footer";

// context
import { CourrierContext } from "../../../../../context/courrierContext.tsx";

export function CourrierRequalification(): ReactElement {
  const { courrier } = useContext(CourrierContext);
  const navigate: NavigateFunction = useNavigate();

  return (
    <>
      {courrier && typeof courrier === "object" && (
        <>
          <Header
            props={{
              pageURL: `G_IVOO | Comptabilité | Trésorerie | Courrier Relance ${courrier.cle} | Requalification du courrier`,
              helpBtn: true,
            }}
          />
          <main id={"courrierRequalification"}>
            <div className={"contentContainer"}>
              <section className={"leftContainer"}>
                <iframe
                  title={"courrier"}
                  src={`http://192.168.0.254:8080/usv_prod/courriers/${courrier.nomFichier}`}
                />
              </section>
              <section className={"rightContainer"}>
                <h2>Courrier {courrier.cle}</h2>
                <form>
                  <div className={"inputWrapper"}>
                    <label htmlFor={"tiers"}>Tiers : </label>
                    <p className={"tiers"}>{courrier.societeEmettrice}</p>
                  </div>
                  <div className={"inputWrapper"}>
                    <label htmlFor={"type"}>Type courrier : </label>
                    <Select
                      name={"type"}
                      options={[
                        { value: "", label: "Choisir" },
                        { value: "Avis", label: "Avis" },
                        { value: "Avoir", label: "Avoir" },
                        { value: "Chèque", label: "Chèque" },
                        { value: "Courrier", label: "Courrier" },
                        { value: "Demande", label: "Demande" },
                        { value: "Facture CLIENT", label: "Facture CLIENT" },
                        {
                          value: "Facture FOURNISSEUR",
                          label: "Facture FOURNISSEUR",
                        },
                        { value: "Justificatif", label: "Justificatif" },
                        { value: "Litige", label: "Litige" },
                        { value: "Note de frais", label: "Note de frais" },
                        { value: "Relance", label: "Relance" },
                        { value: "Relevé bancaire", label: "Relevé bancaire" },
                        { value: "Retour AR", label: "Retour AR" },
                      ]}
                    />
                  </div>
                  <div className={"inputWrapper"}>
                    <label htmlFor={"action"}>Action : </label>
                    <Select
                      name={"action"}
                      options={[
                        { value: "", label: "Choisir" },
                        { value: "A classer", label: "A classer" },
                        { value: "A justifier", label: "A justifier" },
                        { value: "A traiter", label: "A traiter" },
                        { value: "Poubelle", label: "Poubelle" },
                        { value: "Demande", label: "Demande" },
                      ]}
                    />
                  </div>
                  <div className={"inputWrapper"}>
                    <label htmlFor={"datePAction"}>
                      Date de prochaine action :{" "}
                    </label>
                    <input name={"datePAction"} type={"date"} />
                  </div>
                  <div className={"inputWrapper"}>
                    <label htmlFor={"comment"}>Commentaire : </label>
                    <textarea name={"comment"}></textarea>
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
                  onClick: (): void => navigate(-1),
                }}
              />
            </div>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

const CourrierRequalificationWithAuth: (props: object) => ReactElement | null =
  WithAuth(CourrierRequalification);

export default CourrierRequalificationWithAuth;
