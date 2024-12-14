// styles
import "./menuGeneral.scss";

// hooks | libraries
import { useContext, ReactElement } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

// context
import { SiteContext } from "../../../context/siteContext.tsx";

// components
import withAuth from "../../auth/withAuth.tsx";
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
          link: "/menu_general",
          isCheckable: false,
        },
        { name: "Social", link: "/menu_general", isCheckable: false },
        { name: "Fiches processus", link: "/menu_general", isCheckable: false },
        { name: "GTT", link: "/menu_general", isCheckable: false },
        { name: "États info", link: "/menu_general", isCheckable: false },
        { name: "Outil Info", link: "/menu_general", isCheckable: false },
        { name: "MDP", link: "/menu_general", isCheckable: false },
        {
          name: "Gestion G_IVOO",
          link: "/gestion_givoo/acces",
          isCheckable: false,
        },
      ],
      isCheckable: false,
    },
    {
      title: "Incidents",
      items: [
        {
          name: "Gestion des incidents",
          link: "/menu_general",
          isCheckable: false,
        },
      ],
      isCheckable: false,
    },
    {
      title: "Dossiers",
      items: [
        {
          name: "Gestion des dossiers",
          link: "/menu_general",
          isCheckable: false,
        },
      ],
      isCheckable: false,
    },
    {
      title: "Tâches",
      items: [
        { name: "Mes tâches", link: "/menu_general", isCheckable: false },
      ],
      isCheckable: false,
    },
    {
      title: "Commandes",
      items: [
        {
          name: "Gestion des courriers",
          link: "/commandes/gestion_des_courriers",
          isCheckable: false,
        },
        {
          name: "Commandes Fournisseurs",
          link: "/menu_general",
          isCheckable: false,
        },
        {
          name: "Associer un document",
          link: "/menu_general",
          isCheckable: false,
        },
        { name: "Recherche", link: "/menu_general", isCheckable: false },
        { name: "Emissions", link: "/menu_general", isCheckable: false },
        { name: "Retours", link: "/menu_general", isCheckable: false },
        {
          name: "Gestion DOC clients",
          link: "/menu_general",
          isCheckable: false,
        },
        {
          name: "Annulation commande",
          link: "/menu_general",
          isCheckable: false,
        },
        {
          name: "Renvoi d'une commande au partenaire",
          link: "/menu_general",
          isCheckable: false,
        },
        { name: "Imp. courriers", link: "/menu_general", isCheckable: false },
        {
          name: "Réception règlement",
          link: "/menu_general",
          isCheckable: false,
        },
        {
          name: "Gestion Commandes & Factures",
          link: "/menu_general",
          isCheckable: false,
        },
        {
          name: "Comptabilité",
          link: "/commandes/compta_choix",
          isCheckable: false,
        },
        { name: "Litiges", link: "/menu_general", isCheckable: false },
      ],
      isCheckable: false,
    },
    {
      title: "Prospects",
      items: [
        { name: "Recherche", link: "/menu_general", isCheckable: false },
        { name: "Forcer Rappel", link: "/menu_general", isCheckable: false },
        {
          name: "Rappels Commandes",
          link: "/menu_general",
          isCheckable: false,
        },
        { name: "Rappels du jour", link: "/menu_general", isCheckable: false },
        {
          name: "Correction faux numéro",
          link: "/menu_general",
          isCheckable: false,
        },
        { name: "Correction SIRET", link: "/menu_general", isCheckable: false },
        { name: "TELPROV", link: "/menu_general", isCheckable: false },
        { name: "Blocage OPT OUT", link: "/menu_general", isCheckable: false },
        {
          name: "Déblocage d'une fiche",
          link: "/menu_general",
          isCheckable: false,
        },
        { name: "Blocage Commande", link: "/menu_general", isCheckable: false },
      ],
      isCheckable: false,
    },
    {
      title: "TLV",
      items: [
        { name: "Candidats", link: "/menu_general", isCheckable: false },
        { name: "Recrutement", link: "/menu_general", isCheckable: false },
        { name: "Formation", link: "/menu_general", isCheckable: false },
        { name: "Voir TO", link: "/menu_general", isCheckable: false },
        { name: "Gestion", link: "/menu_general", isCheckable: false },
        {
          name: "Validation des primes",
          link: "/menu_general",
          isCheckable: false,
        },
        {
          name: "Préparation des paies",
          link: "/menu_general",
          isCheckable: false,
        },
        { name: "Absence", link: "/menu_general", isCheckable: false },
      ],
      isCheckable: false,
    },
    {
      title: "Appels",
      items: [
        {
          name: "Préparation de période",
          link: "/menu_general",
          isCheckable: false,
        },
        { name: "Gestion DON", link: "/menu_general", isCheckable: false },
        {
          name: "Injections de vierges",
          link: "/menu_general",
          isCheckable: false,
        },
        { name: "Évaluations", link: "/menu_general", isCheckable: false },
        {
          name: "Demande rappels forcés",
          link: "/menu_general",
          isCheckable: false,
        },
        {
          name: "Demande rappels forcés NA",
          link: "/menu_general",
          isCheckable: false,
        },
      ],
      isCheckable: false,
    },
    {
      title: "Statistique",
      items: [
        { name: "CDV", link: "/menu_general", isCheckable: false },
        { name: "CFQ", link: "/menu_general", isCheckable: false },
        { name: "TE", link: "/menu_general", isCheckable: false },
        { name: "RH", link: "/menu_general", isCheckable: false },
        {
          name: "Progression plan d'appel",
          link: "/menu_general",
          isCheckable: false,
        },
        { name: "Imp. Affichage", link: "/menu_general", isCheckable: false },
        {
          name: "Administration des ventes",
          link: "/menu_general",
          isCheckable: false,
        },
        {
          name: "Contrôle trésorerie",
          link: "/menu_general",
          isCheckable: false,
        },
      ],
      isCheckable: false,
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
