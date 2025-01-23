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
        },
        {
          name: "Gestion des comptes tiers",
          link: "/",
        },
        {
          name: "Gestion des comptes bancaires",
          link: "/",
        },
        {
          name: "Gestion des rubriques trésorerie",
          link: "/",
        },
      ],
    },
    {
      title: "Unités / Sous-unités",
      items: [
        {
          name: "Gestion des unités",
          link: "/",
        },
        {
          name: "Gestion des sous-unités",
          link: "/",
        },
        {
          name: "Gestion des applications",
          link: "/",
        },
      ],
    },
    {
      title: "Sites géographiques",
      items: [
        {
          name: "Gestion sites",
          link: "/",
        },
        {
          name: "Gestion emplacements",
          link: "/",
        },
      ],
    },
    {
      title: "Plateaux",
      items: [
        {
          name: "Gestion plateaux",
          link: "/",
        },
      ],
    },
    {
      title: "RH",
      items: [
        {
          name: "Gestion postes",
          link: "/",
        },
        {
          name: "Gestion fiches de postes",
          link: "/",
        },
        {
          name: "Gestion packs paies & primes",
          link: "/",
        },
      ],
    },
    {
      title: "Courrier",
      items: [
        {
          name: "Gestion des services destinataires",
          link: "/organisation_generale/gestion_services_destinataires",
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
