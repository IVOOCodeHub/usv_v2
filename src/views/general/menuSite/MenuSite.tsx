// styles
import "./menuSite.scss";

// types
import { ReactElement, FormEvent } from "react";
import { NavigateFunction } from "react-router-dom";
interface OptionType {
  value: string;
  label: string;
}

// hooks | libraries
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select"; // https://www.npmjs.com/package/react-select

// components
import Header from "../../../components/header/Header";
import Button from "../../../components/button/Button";
import Footer from "../../../components/footer/Footer";

// context
import { UserContext } from "../../../context/userContext.tsx";
import { SiteContext } from "../../../context/siteContext.tsx";

export default function MenuSite(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { setSelectedSite } = useContext(SiteContext);

  const [selectedGroupSelect, setSelectedGroupSelect] =
    useState<OptionType | null>({
      value: "IVOO",
      label: "IVOO",
    });
  const [selectedSiteSelect, setSelectedSiteSelect] =
    useState<OptionType | null>({
      value: "TOUS SITES",
      label: "TOUS SITES",
    });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!selectedGroupSelect || !selectedSiteSelect) {
      return;
    }

    const selectedMenu = {
      groupe: selectedGroupSelect.value,
      site: selectedSiteSelect.value,
    };

    setSelectedSite(selectedMenu);

    navigate("/menu_general");
  };

  const handleGroupChange = (selectedOption: OptionType | null): void => {
    setSelectedGroupSelect(selectedOption);
  };

  const handleSiteChange = (selectedOption: OptionType | null): void => {
    setSelectedSiteSelect(selectedOption);
  };

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
        <form onSubmit={handleSubmit}>
          <div className={"inputWrapper"}>
            <Select
              options={[
                { value: "IVOO", label: "IVOO" },
                { value: "STENICO", label: "STENICO" },
              ]}
              defaultValue={{ value: "IVOO", label: "IVOO" }}
              placeholder={"Groupe"}
              onChange={handleGroupChange}
            />
            <Select
              options={[
                { value: "TOUS", label: "TOUS" },
                { value: "ROCHEFORT", label: "ROCHEFORT" },
                { value: "LA ROCHELLE", label: "LA ROCHELLE" },
                { value: "ALGER", label: "ALGER" },
              ]}
              defaultValue={{ value: "TOUS", label: "TOUS" }}
              placeholder={"Site"}
              onChange={handleSiteChange}
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
                style: "grey",
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
