import "./courrierUtils.scss";
import { ReactElement } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

import WithAuth from "../../../auth/WithAuth.tsx";
import MenuContainer from "../../../../components/menu/MenuContainer";
import Header from "../../../../components/header/Header";
import Footer from "../../../../components/footer/Footer";
import Button from "../../../../components/button/Button.tsx";

function CourrierUtils(): ReactElement {
  const navigate: NavigateFunction = useNavigate();

  return (
    <>
      <Header
        props={{
          pageURL: "G_IVOO | GESTION DES COURRIERS | UTILITAIRES",
          helpBtn: true,
        }}
      />
      <main id={"courrierUtils"}>
        <MenuContainer
          menuData={[
            {
              title: "UTILITAIRES",
              items: [
                {
                  name: "Gérer les profils de distribution",
                  link: "/commandes/gestion_des_courriers/courrier_utils/gestion_des_profils_distribution",
                  isMigrated: true,
                  isCheckable: false,
                },
                {
                  name: "Rechercher un courrier",
                  link: "/commandes/gestion_des_courriers/courrier_utils/recherche_courrier",
                  isMigrated: true,
                  isCheckable: false,
                },
                {
                  name: "Gérer mon classement",
                  link: "/commandes/gestion_des_courriers/courrier_utils/gestion_classement",
                  isMigrated: true,
                  isCheckable: false,
                },
                {
                  name: "Archiver par date",
                  link: "/commandes/gestion_des_courriers/courrier_utils/archiver_courrier",
                  isMigrated: true,
                  isCheckable: false,
                },
              ],
            },
          ]}
        />
        <Button
          props={{
            style: "grey",
            text: "Retour",
            type: "button",
            onClick: (): void => navigate("/menu_general"),
          }}
        />
      </main>
      <Footer />
    </>
  );
}

const CourrierUtilsWithAuth: (props: object) => ReactElement | null =
  WithAuth(CourrierUtils);
export default CourrierUtilsWithAuth;
