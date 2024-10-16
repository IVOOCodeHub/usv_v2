// styles
import "./menuSite.scss";

// types
import { ReactElement, useEffect } from "react";
import { NavigateFunction } from "react-router-dom";

// hooks | libraries
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select"; // https://www.npmjs.com/package/react-select

// components
import Header from "../../../components/header/Header";
import Button from "../../../components/button/Button";
import Footer from "../../../components/footer/Footer";

// context
import { UserContext } from "../../../context/UserContext.tsx";

export default function MenuSite(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect((): void => {
    if (!user) {
      navigate("/auth");
    }
  }, []);

  return (
    <>
      <Header
        props={{
          pageURL: "G_IVOO | MENU SITES",
          helpBtn: true,
        }}
      />
      <main id={"menuSite"}>
        <form>
          <div className={"inputWrapper"}>
            <Select
              options={[
                { value: "IVOO", label: "IVOO" },
                { value: "STENICO", label: "STENICO" },
              ]}
              placeholder={"Groupe"}
            />
            <Select
              options={[
                { value: "TOUS", label: "TOUS" },
                { value: "ROCHEFORT", label: "ROCHEFORT" },
                { value: "LA ROCHELLE", label: "LA ROCHELLE" },
                { value: "ALGER", label: "ALGER" },
              ]}
              placeholder={"Site"}
            />
          </div>
          <div className={"buttonWrapper"}>
            <Button
              props={{
                style: "blue",
                text: "Ok",
                type: "submit",
                disabled: false,
              }}
            />
            <Button
              props={{
                style: "blue",
                text: "Retour",
                type: "button",
                onClick: (): void => {
                  setUser(null);
                  navigate("/");
                },
              }}
            />
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
