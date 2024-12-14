// styles
import "./gestionDesCourriersMenu.scss";

// custom types

// hooks | libraries
import { ReactElement } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

// components
import Header from "../../../components/header/Header";
import MenuContainer, {
  IMenuContainerProps,
} from "../../../components/menu/MenuContainer.tsx";
import Footer from "../../../components/footer/Footer";
import withAuth from "../../auth/withAuth.tsx";
import Button from "../../../components/button/Button.tsx";

function GestionDesCourriersMenu(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const menuData: IMenuContainerProps[] = [
    {
      title: "Nouveaux",
      items: [
        {
          name: "Nouveaux courriers",
          link: "/commandes/gestion_des_courriers/nouveaux_courriers",
        },
      ],
    },
    {
      title: "A distribuer",
      items: [{ name: "Courriers à distribuer", link: "/" }],
    },
    {
      title: "Distribués",
      items: [{ name: "Traiter mes courriers", link: "/" }],
    },
  ];

  const secondMenuData: IMenuContainerProps[] = [
    {
      title: "Utilitaires",
      items: [{ name: "Utilitaires", link: "/" }],
    },
  ];

  return (
    <>
      <Header props={{ pageURL: "G_IVOO | Gestion des courriers" }} />
      <main id={"gestionDesCourriersMenu"}>
        <MenuContainer menuData={menuData} />
        <div className={"secondMenuWrapper"}>
          <MenuContainer menuData={secondMenuData} />
        </div>
        <Button
          props={{
            style: "grey",
            text: "Retour",
            type: "button",
            onClick: (): void => navigate(-1),
          }}
        />
      </main>
      <Footer />
    </>
  );
}

const GestionDesCourriersMenuWithAuth: (props: object) => ReactElement | null =
  withAuth(GestionDesCourriersMenu);
export default GestionDesCourriersMenuWithAuth;
