// styles
import "./gestionDesAccesMenuGIVOO.scss";

// types
import { ReactElement } from "react";
import { NavigateFunction } from "react-router-dom";

// hooks | libraries
import { useNavigate, useLocation } from "react-router-dom";

// components
import Header from "../../../../components/header/Header.tsx";
// import MenuContainer from "../../../../components/menuContainer/MenuContainer";
import Button from "../../../../components/button/Button.tsx";
import Footer from "../../../../components/footer/Footer.tsx";

export default function GestionDesAccesMenuGIVOO(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();
  const { role } = location.state;

  console.log("profil =>", role);

  return (
    <>
      <Header
        props={{
          pageURL: `G_IVOO | Gestion des accès menus GIVOO : ${role.label}`,
          helpBtn: true,
        }}
      />
      <main id={"gestionDesAccesMenuGIVOO"}>
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
