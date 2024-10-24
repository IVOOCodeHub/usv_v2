// styles
import "./comptaChoix.scss";

// types
import { ReactElement } from "react";
import { NavigateFunction } from "react-router-dom";

// hooks | libraries
import { useNavigate } from "react-router-dom";

// components
import Header from "../../../components/header/Header";
import Button from "../../../components/button/Button.tsx";
import MenuContainer, {
  IMenuContainerProps,
} from "../../../components/menu/MenuContainer.tsx";
import Footer from "../../../components/footer/Footer";

export default function ComptaChoix(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const menuData: IMenuContainerProps[] = [
    {
      title: "Comptabilité",
      items: [{ name: "Comptabilité", link: "/" }],
    },
    {
      title: "Trésorerie & Budget",
      items: [
        { name: "Trésorerie", link: "/commandes/tresorerie/menu" },
        { name: "Budget", link: "/" },
        { name: "Litiges", link: "/" },
      ],
    },
  ];
  return (
    <>
      <Header props={{ pageURL: "G_IVOO | Compta" }} />
      <main id={"comptaChoix"}>
        <MenuContainer menuData={menuData} />
        <Button
          props={{
            style: "grey",
            text: "Retour",
            type: "button",
            onClick: (): void => navigate("/menu_general"),
          }}
        />
      </main>
      <Footer />
    </>
  );
}
