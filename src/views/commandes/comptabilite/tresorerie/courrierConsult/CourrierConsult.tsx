// auth Middleware
import withAuth from "../../../../auth/withAuth.tsx";

// styles
import "./courrierConsult.scss";

// custom types
import { ICourrierDepenses } from "../../../../../utils/types/courrier.interface.ts";

// hooks | libraries
import { useNavigate, useLocation, NavigateFunction } from "react-router-dom";
import { useContext, useState, useEffect, ReactElement } from "react";

// context
import { CourrierContext } from "../../../../../context/courrierContext.tsx";

// components
import Header from "../../../../../components/header/Header";
import Form from "../../../../../components/form/Form.tsx";
import Footer from "../../../../../components/footer/Footer";
import Button from "../../../../../components/button/Button.tsx";

export function CourrierConsult(): ReactElement {
  const location = useLocation();
  const { rowData } = location.state;
  const courrierID: string = rowData[0];
  const navigate: NavigateFunction = useNavigate();
  const { courrierDepenses } = useContext(CourrierContext);
  const getSelectedCourrier: () => ICourrierDepenses | undefined = ():
    | ICourrierDepenses
    | undefined => {
    if (Array.isArray(courrierDepenses)) {
      return courrierDepenses?.find(
        (courrier: ICourrierDepenses): boolean => courrier.index === courrierID,
      );
    }
  };
  const [selectedCourrier, setSelectedCourrier] = useState<
    ICourrierDepenses | null | undefined
  >(null);

  useEffect(() => {
    setSelectedCourrier(getSelectedCourrier());
  }, []);

  return (
    <>
      <Header
        props={{
          pageURL: `G_IVOO | Comptabilité | Nouvelle prévision de dépenses | Courrier ${courrierID}`,
          helpBtn: true,
        }}
      />
      {selectedCourrier && (
        <main id={"courrierConsult"}>
          <div className={"leftSide"}>
            <h2>Courrier {selectedCourrier.fileName}</h2>
            <dl>
              <dt>Société :</dt>
              <dd>{selectedCourrier.societe}</dd>
              <dt>Nature :</dt>
              <dd>{selectedCourrier.nature}</dd>
              <dt>Action :</dt>
              <dd>{selectedCourrier.action}</dd>
              <dt>Commentaire :</dt>
              <dd>{selectedCourrier.commentaire}</dd>
              <Button
                props={{
                  style: "blue",
                  text: "Modifier",
                  type: "button",
                  onClick: (): void =>
                    navigate("/commandes/tresorerie/courrier_depenses"),
                }}
              />
            </dl>
            <div>
              <iframe
                title={"courrier"}
                src={`http://192.168.0.254:8080/usv_prod/courriers/${selectedCourrier.fileName}`}
              />
            </div>
          </div>
          <div className={"rightSide"}>
            <div className={"formContainer"}>
              <Form
                props={{
                  title: "Nouvelle prévision de dépense",
                  inputs: [
                    {
                      label: "Date pièce :",
                      key: "datePiece",
                      type: "date",
                      required: true,
                    },
                    {
                      label: "Société :",
                      key: "society",
                      type: "select",
                      selectProps: {
                        placeholder: "Choisissez une société",
                        options: [
                          { value: "", label: "Choisissez une société" },
                          { value: "option1", label: "Option 1" },
                          { value: "option2", label: "Option 2" },
                          { value: "option3", label: "Option 3" },
                        ],
                      },
                      required: true,
                    },
                    {
                      label: "Rubrique :",
                      key: "rubrique",
                      type: "select",
                      selectProps: {
                        placeholder: "Choisissez une rubrique",
                        options: [
                          { value: "", label: "Choisissez une rubrique" },
                          { value: "option1", label: "Option 1" },
                          { value: "option2", label: "Option 2" },
                        ],
                      },
                      required: true,
                    },
                    {
                      label: "Montant TTC :",
                      key: "ttcAmount",
                      type: "number",
                      required: true,
                    },
                    {
                      label: "Banque règlement :",
                      key: "banqueReglement",
                      type: "select",
                      selectProps: {
                        placeholder: "Choisissez une banque",
                        options: [
                          { value: "", label: "Choisissez une banque" },
                          { value: "option1", label: "Option 1" },
                          { value: "option2", label: "Option 2" },
                        ],
                      },
                      required: true,
                    },
                    {
                      label: "Avec TVA :",
                      key: "withTVA",
                      type: "checkbox",
                      checked: true,
                      required: true,
                    },
                    {
                      label: "Moins de 20% de TVA :",
                      key: "TVALess20",
                      type: "checkbox",
                      checked: false,
                      required: true,
                    },
                    {
                      label: "TVA 20% :",
                      key: "TVA20",
                      type: "text",
                      required: true,
                    },
                    {
                      label: "Date échéance :",
                      key: "dateEcheance",
                      type: "date",
                      required: true,
                    },
                    {
                      label: "Date Ordo. :",
                      key: "dateOrdo",
                      type: "date",
                      required: true,
                    },
                  ],
                  isWithSubmitButton: true,
                  isWithCancelButton: true,
                  onCancelCallback: (): void =>
                    navigate("/commandes/tresorerie/courrier_depenses"),
                }}
              />
            </div>
          </div>
        </main>
      )}
      <Footer />
    </>
  );
}

const CourrierConsultWithAuth: (props: object) => ReactElement | null =
  withAuth(CourrierConsult);
export default CourrierConsultWithAuth;
