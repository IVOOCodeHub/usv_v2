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
          isMigrated: true,
        },
        { name: "Social", link: "/menu_general", isMigrated: false },
        { name: "Fiches processus", link: "/menu_general", isMigrated: false },
        { name: "GTT", link: "/menu_general", isMigrated: false },
        { name: "États info", link: "/menu_general", isMigrated: false },
        { name: "Outil Info", link: "/menu_general", isMigrated: false },
        { name: "MDP", link: "/menu_general", isMigrated: false },
        {
          name: "Gestion G_IVOO",
          link: "/gestion_givoo/acces",
          isMigrated: true,
        },
      ],
    },
    {
      title: "Incidents",
      items: [
        {
          name: "Gestion des incidents",
          link: "/menu_general",
          isMigrated: false,
        },
      ],
    },
    {
      title: "Dossiers",
      items: [
        {
          name: "Gestion des dossiers",
          link: "/menu_general",
          isMigrated: false,
        },
      ],
    },
    {
      title: "Tâches",
      items: [{ name: "Mes tâches", link: "/menu_general", isMigrated: false }],
    },
    {
      title: "Commandes",
      items: [
        {
          name: "Gestion des courriers",
          link: "/commandes/gestion_des_courriers",
          isMigrated: true,
        },
        {
          name: "Commandes Fournisseurs",
          link: "/menu_general",
          isMigrated: false,
        },
        {
          name: "Associer un document",
          link: "/menu_general",
          isMigrated: false,
        },
        { name: "Recherche", link: "/menu_general", isMigrated: false },
        { name: "Emissions", link: "/menu_general", isMigrated: false },
        { name: "Retours", link: "/menu_general", isMigrated: false },
        {
          name: "Gestion DOC clients",
          link: "/menu_general",
          isMigrated: false,
        },
        {
          name: "Annulation commande",
          link: "/menu_general",
          isMigrated: false,
        },
        {
          name: "Renvoi d'une commande au partenaire",
          link: "/menu_general",
          isMigrated: false,
        },
        { name: "Imp. courriers", link: "/menu_general", isMigrated: false },
        {
          name: "Réception règlement",
          link: "/menu_general",
          isMigrated: false,
        },
        {
          name: "Gestion Commandes & Factures",
          link: "/menu_general",
          isMigrated: false,
        },
        {
          name: "Comptabilité",
          link: "/commandes/compta_choix",
          isMigrated: true,
        },
        { name: "Litiges", link: "/menu_general", isMigrated: false },
      ],
    },
    {
      title: "Prospects",
      items: [
        { name: "Recherche", link: "/menu_general", isMigrated: false },
        { name: "Forcer Rappel", link: "/menu_general", isMigrated: false },
        {
          name: "Rappels Commandes",
          link: "/menu_general",
          isMigrated: false,
        },
        { name: "Rappels du jour", link: "/menu_general", isMigrated: false },
        {
          name: "Correction faux numéro",
          link: "/menu_general",
          isMigrated: false,
        },
        { name: "Correction SIRET", link: "/menu_general", isMigrated: false },
        { name: "TELPROV", link: "/menu_general", isMigrated: false },
        { name: "Blocage OPT OUT", link: "/menu_general", isMigrated: false },
        {
          name: "Déblocage d'une fiche",
          link: "/menu_general",
          isMigrated: false,
        },
        { name: "Blocage Commande", link: "/menu_general", isMigrated: false },
      ],
    },
    {
      title: "TLV",
      items: [
        { name: "Candidats", link: "/menu_general", isMigrated: false },
        { name: "Recrutement", link: "/menu_general", isMigrated: false },
        { name: "Formation", link: "/menu_general", isMigrated: false },
        { name: "Voir TO", link: "/menu_general", isMigrated: false },
        { name: "Gestion", link: "/menu_general", isMigrated: false },
        {
          name: "Validation des primes",
          link: "/menu_general",
          isMigrated: false,
        },
        {
          name: "Préparation des paies",
          link: "/menu_general",
          isMigrated: false,
        },
        { name: "Absence", link: "/menu_general", isMigrated: false },
      ],
    },
    {
      title: "Appels",
      items: [
        {
          name: "Préparation de période",
          link: "/menu_general",
          isMigrated: false,
        },
        { name: "Gestion DON", link: "/menu_general", isMigrated: false },
        {
          name: "Injections de vierges",
          link: "/menu_general",
          isMigrated: false,
        },
        { name: "Évaluations", link: "/menu_general", isMigrated: false },
        {
          name: "Demande rappels forcés",
          link: "/menu_general",
          isMigrated: false,
        },
        {
          name: "Demande rappels forcés NA",
          link: "/menu_general",
          isMigrated: false,
        },
      ],
    },
    {
      title: "Statistique",
      items: [
        { name: "CDV", link: "/menu_general", isMigrated: false },
        { name: "CFQ", link: "/menu_general", isMigrated: false },
        { name: "TE", link: "/menu_general", isMigrated: false },
        { name: "RH", link: "/menu_general", isMigrated: false },
        {
          name: "Progression plan d'appel",
          link: "/menu_general",
          isMigrated: false,
        },
        { name: "Imp. Affichage", link: "/menu_general", isMigrated: false },
        {
          name: "Administration des ventes",
          link: "/menu_general",
          isMigrated: false,
        },
        {
          name: "Contrôle trésorerie",
          link: "/menu_general",
          isMigrated: false,
        },
      ],
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
      </main>
      <Footer />
    </>
  );
}

const MenuGeneralWithAuth: (props: object) => ReactElement | null =
  withAuth(MenuGeneral);
export default MenuGeneralWithAuth;
