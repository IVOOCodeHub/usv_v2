import "./organisationGeneraleMenu.scss";

import { ReactElement } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

import { IMenuContainerProps } from "../../../../components/menu/MenuContainer";

import WithAuth from "../../../auth/WithAuth";
import Header from "../../../../components/header/Header";
import MenuContainer from "../../../../components/menu/MenuContainer";
import Button from "../../../../components/button/Button";
import Footer from "../../../../components/footer/Footer";

function OrganisationGeneraleMenu(): ReactElement {
  const navigate: NavigateFunction = useNavigate();

  const menuData: IMenuContainerProps[] = [
    {
      title: "Sociétés",
      items: [
        {
          name: "Gestion des sociétés",
          link: "/",
          isMigrated: false,
        },
        {
          name: "Gestion des comptes tiers",
          link: "/",
          isMigrated: false,
        },
        {
          name: "Gestion des comptes bancaires",
          link: "/",
          isMigrated: false,
        },
        {
          name: "Gestion des rubriques trésorerie",
          link: "/",
          isMigrated: false,
        },
      ],
    },
    {
      title: "Unités / Sous-unités",
      items: [
        {
          name: "Gestion des unités",
          link: "/",
          isMigrated: false,
        },
        {
          name: "Gestion des sous-unités",
          link: "/",
          isMigrated: false,
        },
        {
          name: "Gestion des applications",
          link: "/",
          isMigrated: false,
        },
      ],
    },
    {
      title: "Sites géographiques",
      items: [
        {
          name: "Gestion sites",
          link: "/",
          isMigrated: false,
        },
        {
          name: "Gestion emplacements",
          link: "/",
          isMigrated: false,
        },
      ],
    },
    {
      title: "Plateaux",
      items: [
        {
          name: "Gestion plateaux",
          link: "/",
          isMigrated: false,
        },
      ],
    },
    {
      title: "RH",
      items: [
        {
          name: "Gestion postes",
          link: "/",
          isMigrated: false,
        },
        {
          name: "Gestion fiches de postes",
          link: "/",
          isMigrated: false,
        },
        {
          name: "Gestion packs paies & primes",
          link: "/",
          isMigrated: false,
        },
      ],
    },
    {
      title: "Courrier",
      items: [
        {
          name: "Gestion des services destinataires",
          link: "/organisation_generale/gestion_services_destinataires",
          isMigrated: true,
        },
      ],
    },
  ];

  return (
    <>
      <Header
        props={{
          pageURL: `G_IVOO | PARAMÉTRAGES | ORGANISATION GENERALE`,
          helpBtn: true,
        }}
      />
      <main id={"organisationGeneraleMenu"}>
        <nav className={"organisationGenerale__nav"}>
          <div className={"organisationGenerale__nav__menuWrapper"}>
            <MenuContainer menuData={menuData} />
          </div>
        </nav>
        <div className={"buttonWrapper"}>
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
}

const OrganisationGeneraleMenuWithAuth: (props: object) => ReactElement | null =
  WithAuth(OrganisationGeneraleMenu);
export default OrganisationGeneraleMenuWithAuth;
