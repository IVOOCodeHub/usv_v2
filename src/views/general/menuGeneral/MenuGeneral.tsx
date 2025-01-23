// styles
import "./menuGeneral.scss";

// hooks | libraries
import { useContext, ReactElement } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

// context
import { SiteContext } from "../../../context/siteContext.tsx";

// components
import withAuth from "../../auth/WithAuth.tsx";
import Header from "../../../components/header/Header";
import MenuContainer, {
  IMenuContainerProps,
} from "../../../components/menu/MenuContainer.tsx";
import Button from "../../../components/button/Button";
import Footer from "../../../components/footer/Footer";

function MenuGeneral(): ReactElement {
  const { selectedSite } = useContext(SiteContext);

  const navigate: NavigateFunction = useNavigate();

  const menuData: IMenuContainerProps[] = [
    {
      title: "Paramétrages",
      items: [
        {
          name: "Organisation générale",
          link: "/organisation_generale",
        },
        { name: "Social", link: "/menu_general" },
        { name: "Fiches processus", link: "/menu_general" },
        { name: "GTT", link: "/menu_general" },
        { name: "États info", link: "/menu_general" },
        { name: "Outil Info", link: "/menu_general" },
        { name: "MDP", link: "/menu_general" },
        {
          name: "Gestion G_IVOO",
          link: "/gestion_givoo/acces",
        },
      ]

    },
    {
      title: "Incidents",
      items: [
        {
          name: "Gestion des incidents",
          link: "/menu_general",
        },
      ]

    },
    {
      title: "Dossiers",
      items: [
        {
          name: "Gestion des dossiers",
          link: "/menu_general",
        },
      ]

    },
    {
      title: "Tâches",
      items: [{ name: "Mes tâches", link: "/menu_general" }]

    },
    {
      title: "Commandes",
      items: [
        {
          name: "Gestion des courriers",
          link: "/commandes/gestion_des_courriers",
        },
        {
          name: "Commandes Fournisseurs",
          link: "/menu_general",
        },
        {
          name: "Associer un document",
          link: "/menu_general",
        },
        { name: "Recherche", link: "/menu_general" },
        { name: "Emissions", link: "/menu_general" },
        { name: "Retours", link: "/menu_general" },
        {
          name: "Gestion DOC clients",
          link: "/menu_general",
        },
        {
          name: "Annulation commande",
          link: "/menu_general",
        },
        {
          name: "Renvoi d'une commande au partenaire",
          link: "/menu_general",
        },
        { name: "Imp. courriers", link: "/menu_general" },
        {
          name: "Réception règlement",
          link: "/menu_general",
        },
        {
          name: "Gestion Commandes & Factures",
          link: "/menu_general",
        },
        {
          name: "Comptabilité",
          link: "/commandes/compta_choix",
        },
        { name: "Litiges", link: "/menu_general" },
      ]

    },
    {
      title: "Prospects",
      items: [
        { name: "Recherche", link: "/menu_general" },
        { name: "Forcer Rappel", link: "/menu_general" },
        {
          name: "Rappels Commandes",
          link: "/menu_general",
        },
        { name: "Rappels du jour", link: "/menu_general" },
        {
          name: "Correction faux numéro",
          link: "/menu_general",
        },
        { name: "Correction SIRET", link: "/menu_general" },
        { name: "TELPROV", link: "/menu_general" },
        { name: "Blocage OPT OUT", link: "/menu_general" },
        {
          name: "Déblocage d'une fiche",
          link: "/menu_general",
        },
        { name: "Blocage Commande", link: "/menu_general" },
      ]

    },
    {
      title: "TLV",
      items: [
        { name: "Candidats", link: "/menu_general" },
        { name: "Recrutement", link: "/menu_general" },
        { name: "Formation", link: "/menu_general" },
        { name: "Voir TO", link: "/menu_general" },
        { name: "Gestion", link: "/menu_general" },
        {
          name: "Validation des primes",
          link: "/menu_general",
        },
        {
          name: "Préparation des paies",
          link: "/menu_general",
        },
        { name: "Absence", link: "/menu_general" },
      ]

    },
    {
      title: "Appels",
      items: [
        {
          name: "Préparation de période",
          link: "/menu_general",
        },
        { name: "Gestion DON", link: "/menu_general" },
        {
          name: "Injections de vierges",
          link: "/menu_general",
        },
        { name: "Évaluations", link: "/menu_general" },
        {
          name: "Demande rappels forcés",
          link: "/menu_general",
        },
        {
          name: "Demande rappels forcés NA",
          link: "/menu_general",
        },
      ]

    },
    {
      title: "Statistique",
      items: [
        { name: "CDV", link: "/menu_general" },
        { name: "CFQ", link: "/menu_general" },
        { name: "TE", link: "/menu_general" },
        { name: "RH", link: "/menu_general" },
        {
          name: "Progression plan d'appel",
          link: "/menu_general",
        },
        { name: "Imp. Affichage", link: "/menu_general" },
        {
          name: "Administration des ventes",
          link: "/menu_general",
        },
        {
          name: "Contrôle trésorerie",
          link: "/menu_general",
        },
      ]

    },
  ];

  return (
    <>
      <Header
        props={{
          pageURL: `G_IVOO | ${selectedSite?.site} | ACCUEIL ADMINISTRATION`,
          helpBtn: true,
        }}
      />
      <main id={"menuGeneral"}>
        <nav className={"menuGeneral__nav"}>
          <div className={"menuGeneral__nav__menuWrapper"}>
            <MenuContainer menuData={menuData} />
          </div>
          <Button
            props={{
              style: "grey",
              text: "Retour",
              type: "button",
              onClick: (): void => navigate("/menu_site"),
            }}
          />
        </nav>
        <nav className={"menuGeneral__testZone"}>
          <Button
            props={{
              style: "blue",
              text: "Test config son",
              type: "button",
              onClick: (): void => navigate("/test"),
            }}
          />
          <Button
            props={{
              style: "blue",
              text: "Test mscal.ocx",
              type: "button",
              onClick: (): void => navigate("/test"),
            }}
          />
          <Button
            props={{
              style: "blue",
              text: "Test envoi mail",
              type: "button",
              onClick: (): void => navigate("/test"),
            }}
          />
          <Button
            props={{
              style: "blue",
              text: "Maintenance XP par IE",
              type: "button",
              onClick: (): void => navigate("/test"),
            }}
          />
        </nav>
      </main>
      <Footer />
    </>
  );
}

const MenuGeneralWithAuth: (props: object) => ReactElement | null =
  withAuth(MenuGeneral);
export default MenuGeneralWithAuth;
