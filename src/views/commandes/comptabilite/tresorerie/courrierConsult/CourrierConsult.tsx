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
            <div></div>
            <div>
              <iframe
                title={"courrier"}
                src={`http://192.168.0.254:8080/usv_prod/courriers/${selectedCourrier.fileName}`}
              />
            </div>
          </div>
          <div className={"rightSide"}>
            <Button
              props={{
                style: "grey",
                text: "Retour",
                type: "button",
                onClick: (): void =>
                  navigate("/commandes/tresorerie/courrier_depenses"),
              }}
            />
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
