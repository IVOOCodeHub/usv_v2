import "./litigesMenu.scss";

import { ReactElement } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

import WithAuth from "../../../auth/WithAuth.tsx";
import Header from "../../../../components/header/Header.tsx";
import MenuContainer, {
  IMenuContainerProps,
} from "../../../../components/menu/MenuContainer";
import Button from "../../../../components/button/Button.tsx";
import Footer from "../../../../components/footer/Footer.tsx";

const LitigesMenu = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate();

  const menuData: IMenuContainerProps[] = [
    {
      title: "Litiges",
      items: [
        {
          name: "Courrier a affecter",
          link: "affectation_courrier",
          isMigrated: true,
        },
        {
          name: "Liste des dossiers",
          link: "liste_dossiers",
          isMigrated: true,
        },
        {
          name: "Liste des évènements",
          link: "/litiges/gestion_factures",
          isMigrated: false,
        },
        {
          name: "Calendrier évènements",
          link: "/litiges/gestion_commandes",
          isMigrated: false,
        },
        {
          name: "Alertes",
          link: "/litiges/gestion_courriers",
          isMigrated: false,
        },
        {
          name: "Thèmes",
          link: "/litiges/gestion_courriers",
          isMigrated: false,
        },
        {
          name: "Tiers",
          link: "/litiges/gestion_courriers",
          isMigrated: false,
        },
      ],
    },
  ];
  return (
    <>
      <Header
        props={{
          pageURL: "G_IVOO | LITIGES",
          helpBtn: false,
        }}
      />
      <main id={"litigesMenu"}>
        <nav className={"litiges_menuWrapper"}>
          <MenuContainer menuData={menuData} />
        </nav>
        <div className={"goBackBtnWrapper"}>
          <Button
            props={{
              style: "grey",
              text: "Retour",
              type: "button",
              onClick: (): void => navigate("/menu_general"),
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

const LitigesMenuWithAuth: (props: object) => ReactElement | null =
  WithAuth(LitigesMenu);
export default LitigesMenuWithAuth;
