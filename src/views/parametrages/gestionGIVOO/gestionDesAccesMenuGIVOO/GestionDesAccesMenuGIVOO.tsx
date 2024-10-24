// styles
import "./gestionDesAccesMenuGIVOO.scss";

// types
import { ReactElement } from "react";
import { NavigateFunction } from "react-router-dom";

// hooks | libraries
import { useNavigate, useLocation } from "react-router-dom";

// components
import Header from "../../../../components/header/Header.tsx";
import MenuContainer from "../../../../components/menu/MenuContainer";
import Button from "../../../../components/button/Button.tsx";
import Footer from "../../../../components/footer/Footer.tsx";
import { IMenuContainerProps } from "../../../../components/menu/MenuContainer.tsx";

export default function GestionDesAccesMenuGIVOO(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();
  const { role } = location.state;

  const menuData: IMenuContainerProps[] = [
    {
      title: "Paramétrages",
      items: [
        {
          name: "Organisation générale",
          link: "/menu_general",
          isCheckable: true,
        },
        { name: "Social", link: "/menu_general", isCheckable: true },
        { name: "Fiches processus", link: "/menu_general", isCheckable: true },
        { name: "GTT", link: "/menu_general", isCheckable: true },
        { name: "États info", link: "/menu_general", isCheckable: true },
        { name: "Outil Info", link: "/menu_general", isCheckable: true },
        { name: "MDP", link: "/menu_general", isCheckable: true },
        {
          name: "Gestion G_IVOO",
          link: "/gestion_givoo/acces",
          isCheckable: true,
        },
      ],
      isCheckable: true,
    },
    {
      title: "Incidents",
      items: [
        {
          name: "Gestion des incidents",
          link: "/menu_general",
          isCheckable: true,
        },
      ],
      isCheckable: true,
    },
    {
      title: "Dossiers",
      items: [
        {
          name: "Gestion des dossiers",
          link: "/menu_general",
          isCheckable: true,
        },
      ],
      isCheckable: true,
    },
    {
      title: "Tâches",
      items: [{ name: "Mes tâches", link: "/menu_general", isCheckable: true }],
      isCheckable: true,
    },
    {
      title: "Commandes",
      items: [
        {
          name: "Gestion des courriers",
          link: "/menu_general",
          isCheckable: true,
        },
        {
          name: "Commandes Fournisseurs",
          link: "/menu_general",
          isCheckable: true,
        },
        {
          name: "Associer un document",
          link: "/menu_general",
          isCheckable: true,
        },
        { name: "Recherche", link: "/menu_general", isCheckable: true },
        { name: "Emissions", link: "/menu_general", isCheckable: true },
        { name: "Retours", link: "/menu_general", isCheckable: true },
        {
          name: "Gestion DOC clients",
          link: "/menu_general",
          isCheckable: true,
        },
        {
          name: "Annulation commande",
          link: "/menu_general",
          isCheckable: true,
        },
        {
          name: "Renvoi d'une commande au partenaire",
          link: "/menu_general",
          isCheckable: true,
        },
        { name: "Imp. courriers", link: "/menu_general", isCheckable: true },
        {
          name: "Réception règlement",
          link: "/menu_general",
          isCheckable: true,
        },
        {
          name: "Gestion Commandes & Factures",
          link: "/menu_general",
          isCheckable: true,
        },
        { name: "Comptabilité", link: "/menu_general", isCheckable: true },
        { name: "Litiges", link: "/menu_general", isCheckable: true },
      ],
      isCheckable: true,
    },
    {
      title: "Prospects",
      items: [
        { name: "Recherche", link: "/menu_general", isCheckable: true },
        { name: "Forcer Rappel", link: "/menu_general", isCheckable: true },
        {
          name: "Rappels Commandes",
          link: "/menu_general",
          isCheckable: true,
        },
        { name: "Rappels du jour", link: "/menu_general", isCheckable: true },
        {
          name: "Correction faux numéro",
          link: "/menu_general",
          isCheckable: true,
        },
        { name: "Correction SIRET", link: "/menu_general", isCheckable: true },
        { name: "TELPROV", link: "/menu_general", isCheckable: true },
        { name: "Blocage OPT OUT", link: "/menu_general", isCheckable: true },
        {
          name: "Déblocage d'une fiche",
          link: "/menu_general",
          isCheckable: true,
        },
        { name: "Blocage Commande", link: "/menu_general", isCheckable: true },
      ],
      isCheckable: true,
    },
    {
      title: "TLV",
      items: [
        { name: "Candidats", link: "/menu_general", isCheckable: true },
        { name: "Recrutement", link: "/menu_general", isCheckable: true },
        { name: "Formation", link: "/menu_general", isCheckable: true },
        { name: "Voir TO", link: "/menu_general", isCheckable: true },
        { name: "Gestion", link: "/menu_general", isCheckable: true },
        {
          name: "Validation des primes",
          link: "/menu_general",
          isCheckable: true,
        },
        {
          name: "Préparation des paies",
          link: "/menu_general",
          isCheckable: true,
        },
        { name: "Absence", link: "/menu_general", isCheckable: true },
      ],
      isCheckable: true,
    },
    {
      title: "Appels",
      items: [
        {
          name: "Préparation de période",
          link: "/menu_general",
          isCheckable: true,
        },
        { name: "Gestion DON", link: "/menu_general", isCheckable: true },
        {
          name: "Injections de vierges",
          link: "/menu_general",
          isCheckable: true,
        },
        { name: "Évaluations", link: "/menu_general", isCheckable: true },
        {
          name: "Demande rappels forcés",
          link: "/menu_general",
          isCheckable: true,
        },
        {
          name: "Demande rappels forcés NA",
          link: "/menu_general",
          isCheckable: true,
        },
      ],
      isCheckable: true,
    },
    {
      title: "Statistique",
      items: [
        { name: "CDV", link: "/menu_general", isCheckable: true },
        { name: "CFQ", link: "/menu_general", isCheckable: true },
        { name: "TE", link: "/menu_general", isCheckable: true },
        { name: "RH", link: "/menu_general", isCheckable: true },
        {
          name: "Progression plan d'appel",
          link: "/menu_general",
          isCheckable: true,
        },
        { name: "Imp. Affichage", link: "/menu_general", isCheckable: true },
        {
          name: "Administration des ventes",
          link: "/menu_general",
          isCheckable: true,
        },
        {
          name: "Contrôle trésorerie",
          link: "/menu_general",
          isCheckable: true,
        },
      ],
      isCheckable: true,
    },
  ];

  return (
    <>
      <Header
        props={{
          pageURL: `G_IVOO | Gestion des accès menus GIVOO : ${role.label}`,
          helpBtn: true,
        }}
      />
      <main id={"gestionDesAccesMenuGIVOO"}>
        <MenuContainer menuData={menuData} />

        <div className={"buttonWrapper"}>
          <Button
            props={{
              style: "blue",
              text: "Changer de profil",
              type: "button",
              onClick: (): void => navigate("/gestion_givoo/acces"),
            }}
          />
          <Button
            props={{
              style: "blue",
              text: "Aperçu du résultat",
              type: "button",
            }}
          />
          <Button
            props={{
              style: "grey",
              text: "Fin de la gestion",
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
