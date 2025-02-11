// styles
import "./menuSite.scss";

// types
interface OptionType {
  value: string;
  label: string;
}

// hooks | libraries
import { useContext, useState, ReactElement, FormEvent } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import Select from "react-select"; // https://www.npmjs.com/package/react-select

// components
import withAuth from "../../auth/WithAuth.tsx";
import Header from "../../../components/header/Header";
import Button from "../../../components/button/Button";
import Footer from "../../../components/footer/Footer";

// context
import { UserContext } from "../../../context/userContext/UserContext.tsx";
import { SiteContext } from "../../../context/siteContext.tsx";

function MenuSite(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const { setUser } = useContext(UserContext);
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

const MenuSiteWithAuth: (props: object) => ReactElement | null =
  withAuth(MenuSite);
export default MenuSiteWithAuth;
