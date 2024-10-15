// styles
import "./footer.scss";

// assets
import logo from "../../assets/branding/brandingLogo--alt.png";

// types
import { ReactElement } from "react";

// hooks
import { Link } from "react-router-dom";

// components

export default function Footer(): ReactElement {
  return (
    <footer id={"footer"}>
      <Link to={"/auth"}>
        <figure title={"Accueil"}>
          <img src={logo} alt={"logo"} />
        </figure>
      </Link>
      <p>©2024 Utilitaires Superviseur --v2</p>
    </footer>
  );
}
