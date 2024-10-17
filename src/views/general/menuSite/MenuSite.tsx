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
import { UserContext } from "../../../context/UserContext.tsx";

export default function MenuSite(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [selectedGroup, setSelectedGroup] = useState<OptionType | null>({
    value: "IVOO",
    label: "IVOO",
  });
  const [selectedSite, setSelectedSite] = useState<OptionType | null>({
    value: "TOUS",
    label: "TOUS",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const selectedMenu = {
      groupe: selectedGroup?.value,
      site: selectedSite?.value,
    };

    navigate("/menu_general", { state: selectedMenu });
  };

  const handleGroupChange = (selectedOption: OptionType | null) => {
    setSelectedGroup(selectedOption);
  };

  const handleSiteChange = (selectedOption: OptionType | null) => {
    setSelectedSite(selectedOption);
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
