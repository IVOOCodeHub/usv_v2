// styles
import "./header.scss";

// assets
import brandingLogo from "../../assets/branding/brandingLogo.png";

// types
import { ReactElement } from "react";
interface IHeaderProps {
  props: {
    pageURL: string;
    helpBtn?: boolean;
  };
}

// hooks | library
import { Link } from "react-router-dom";

// components
import Button from "../button/Button";

export default function Header({ props }: IHeaderProps): ReactElement {
  const { pageURL, helpBtn } = props;

  const openHelpDoc: (url: string) => Window = (url: string): Window => {
    const options = `width=${1280},height=${1024},left=${(window.innerWidth - 1280) / 2},top=${(window.innerHeight - 1024) / 2}`;
    return window.open(url, "_blank", options)!;
  };

  return (
    <header>
      <nav>
        <Link to={"/"}>
          <figure>
            <img
              src={brandingLogo}
              alt={brandingLogo}
              title={"Retour à l'accueil"}
            />
          </figure>
        </Link>
        <h1>{pageURL}</h1>
        <>
          {helpBtn && (
            <Button
              props={{
                style: "blue",
                text: "Aide",
                type: "button",
                onClick: (): Window => openHelpDoc("/"),
              }}
            />
          )}
        </>
      </nav>
    </header>
  );
}
