import "./courrierDistribution.scss";

import { ReactElement, useContext, useEffect } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";

import { CourrierContext } from "../../../../context/courrierContext.tsx";
import { UserContext } from "../../../../context/userContext.tsx";

import WithAuth from "../../../auth/WithAuth.tsx";
import Header from "../../../../components/header/Header";
import Button from "../../../../components/button/Button";
import Footer from "../../../../components/footer/Footer";

function CourrierDistribution(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const { courrierID } = useParams();
  const { getCourrier, courrier } = useContext(CourrierContext);
  const { userCredentials } = useContext(UserContext);

  useEffect((): void => {
    if (userCredentials && courrierID && !courrier) {
      getCourrier(userCredentials, courrierID).finally();
    } else {
      navigate("/commandes/gestion_des_courriers/courrier_a_distribuer/");
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
            <div className={"goBackBtnWrapper"}>
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
