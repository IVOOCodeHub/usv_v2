// styles
import "./gestionDesAccesGIVOO.scss";

// types
import { ReactElement, FormEvent } from "react";
import { NavigateFunction } from "react-router-dom";
interface IOptionType {
  value: string;
  label: string;
}

// hooks | libraries
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// components
import Header from "../../../../components/header/Header";
import Select from "react-select";
import Button from "../../../../components/button/Button";
import Footer from "../../../../components/footer/Footer";
import AlertBox from "../../../../components/alertBox/AlertBox.tsx";

export default function GestionDesAccesGIVOO(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const [selectedRole, setSelectedRole] = useState<IOptionType | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleRoleChange = (selectedOption: IOptionType | null): void => {
    setSelectedRole(selectedOption);
  };

  const verifyRole: (role: IOptionType) => ReactElement | boolean = (
    role: IOptionType,
  ): ReactElement | boolean => {
    if (!role || !role.value) {
      setErrorMessage("Veuillez sélectionner un profil utilisateur");
      return false;
    }
    return true;
  };

  const handleSubmit: (e: FormEvent<HTMLFormElement>) => void = (
    e: FormEvent<HTMLFormElement>,
  ): void => {
    e.preventDefault();

    if (verifyRole(selectedRole!)) {
      navigate("/gestion_givoo/menu", { state: { role: selectedRole } });
    }
  };

  return (
    <>
      <Header
        props={{
          pageURL: "G_IVOO | Gestion des accès GIVOO",
          helpBtn: true,
        }}
      />
      <main id={"gestionDesAccesGIVOO"}>
        {errorMessage && (
          <AlertBox message={errorMessage} setMessage={setErrorMessage} />
        )}
        <form onSubmit={handleSubmit}>
          <div className={"inputWrapper"}>
            <label>Profil utilisateur à gérer :</label>
            <Select
              options={[
                { value: "", label: "Choisir" },
                { value: "A", label: "A – Administration" },
                { value: "C", label: "C – Comptabilité" },
                { value: "D", label: "D – Direction" },
                { value: "F", label: "F – Formation" },
                { value: "H", label: "H – Ressources Humaines" },
                { value: "M", label: "M - Data Mining" },
                { value: "N", label: "N – Recut. entretien N1" },
                { value: "P", label: "P – Relation partenaire" },
                { value: "Q", label: "Q – Qualité" },
                { value: "R", label: "R – Recrutement" },
                { value: "S", label: "S – Superviseur" },
                { value: "T", label: "T – Chef des ventes" },
                { value: "U", label: "U – Chef de zone" },
                { value: "V", label: "V – Secrétariat ventes" },
                { value: "X", label: "X – Resp prod" },
                { value: "Z", label: "Z – Recruteur externe" },
              ]}
              defaultValue={{ value: "", label: "Choisir" }}
              onChange={handleRoleChange}
            />
          </div>

          <div className={"buttonWrapper"}>
            <Button
              props={{
                style: "blue",
                text: "Valider",
                type: "submit",
                disabled: false,
              }}
            />
            <Button
              props={{
                style: "grey",
                text: "Retour",
                type: "button",
                onClick: (): void => navigate("/menu_general"),
              }}
            />
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
