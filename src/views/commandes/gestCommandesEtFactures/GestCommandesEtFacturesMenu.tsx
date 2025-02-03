import "./gestCommandesEtFacturesMenu.scss";

import { ReactElement } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

import WithAuth from "../../auth/WithAuth.tsx";
import Header from "../../../components/header/Header.tsx";
import MenuContainer, {
  IMenuContainerProps,
} from "../../../components/menu/MenuContainer";
import Button from "../../../components/button/Button.tsx";
import Footer from "../../../components/footer/Footer.tsx";

const GestCommandesEtFactureMenu = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate();

  const menuData: IMenuContainerProps[] = [
    {
      title: "Facturation",
      items: [
        {
          name: "Impayées",
          link: "/gestion_commandes_et_factures/impayees",
          isMigrated: false,
        },
        {
          name: "Payées",
          link: "/gestion_commandes_et_factures/payees",
          isMigrated: false,
        },
        {
          name: "Annulation",
          link: "/gestion_commandes_et_factures/annulation",
          isMigrated: false,
        },
        {
          name: "Arrêt CA partenaires & Facturation",
          link: "/gestion_commandes_et_factures/arret_ca_partenaires_et_facturation",
          isMigrated: false,
        },
        {
          name: "Facturation manuelle",
          link: "/gestion_commandes_et_factures/facturation_manuelle",
          isMigrated: false,
        },
        {
          name: "Ré affectation de commande à TLV",
          link: "/gestion_commandes_et_factures/reaffectation_commande_tlv",
          isMigrated: false,
        },
        {
          name: "États",
          link: "/gestion_commandes_et_factures/etats",
          isMigrated: false,
        },
      ],
    },
  ];
  return (
    <>
      <Header
        props={{
          pageURL: "G_IVOO | GESTION DES COMMANDES ET FACTURES",
          helpBtn: false,
        }}
      />
      <main id={"gestCommandesEtFactureMenu"}>
        <nav className={"gestion_commandes_menuWrapper"}>
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

const GestCommandesEtFactureMenuWithAuth: (
  props: object,
) => ReactElement | null = WithAuth(GestCommandesEtFactureMenu);
export default GestCommandesEtFactureMenuWithAuth;
