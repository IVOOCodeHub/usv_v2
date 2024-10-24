// styles
import "./tresorerieMenu.scss";

// types
import { ReactElement } from "react";
import { NavigateFunction } from "react-router-dom";

// hooks | libraries
import { useNavigate } from "react-router-dom";

// components
import Header from "../../../../../components/header/Header";
import Button from "../../../../../components/button/Button.tsx";
import MenuContainer from "../../../../../components/menu/MenuContainer.tsx";
import Footer from "../../../../../components/footer/Footer";

export default function TresorerieMenu(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  return (
    <>
      <Header props={{ pageURL: "G_IVOO | Tresorerie" }} />
      <main id={'tresorerieMenu'}>
        <MenuContainer menuData={[]} />
        <Button
          props={{
            style: "grey",
            text: "Retour",
            type: "button",
            onClick: () => navigate("/commandes/compta_choix"),
          }}
        />
      </main>
      <Footer />
    </>
  );
}
