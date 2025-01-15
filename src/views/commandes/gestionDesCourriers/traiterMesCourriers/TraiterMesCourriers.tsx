import "./traiterMesCourriers.scss";

import { ReactElement, useState, useEffect } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

import WithAuth from "../../../auth/WithAuth.tsx";
import Header from "../../../../components/header/Header";
import Select from "react-select";
import Button from "../../../../components/button/Button.tsx";
import Footer from "../../../../components/footer/Footer";
import NRTL from "../../../../components/NRTL/NRTL.tsx";
function TraiterMesCourriers(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const [userService, setUserService] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");

  const translate = (shortForm: string): string => {
    switch (shortForm) {
      case "A":
        return "Administration";
      case "option2":
        return "Option 2";
      case "option3":
        return "Option 3";
      default:
        return "Option 4";
    }
  };

  const tableDatas = {
    tableHead: [
      "Réf.",
      "Destinataire",
      "Emetteur",
      "Date",
      "Pièce",
      "Réf.doc",
      "Sél.",
      "Action",
    ],
    tableBody: [
      ["62639", "A", "B", "2022-01-01", "C", "D", "E", "F"],
      ["28373", "A", "B", "2022-01-01", "C", "D", "E", "F"],
    ],
  };

  useEffect((): void => {
    setUserService("A");
  }, []);

  return (
    <>
      <Header
        props={{
          pageURL: `G_IVOO | GESTION DES COURRIERS | TRAITER MES COURRIERS | ${translate(userService)}`,
          helpBtn: true,
        }}
      />
      <main id={"traiterMesCourriers"}>
        {selectedService === "A" && (
          <>
            <NRTL
              datas={tableDatas}
              headerBackgroundColor={
                "linear-gradient(to left, #84CDE4FF, #1092B8)"
              }
              headerHoverBackgroundColor={"#1092B8"}
              language={"fr"}
            />
          </>
        )}

          {/* Le sélecteur disparait si un service est sélectionné. Il faudrait qu'il n'apparaisse */}
          {/* que si un utilisateur a accès à plusieurs services, sinon le tableau du service concerné */}
          {/* Apparait par défaut. À voir avec de vrais datas user.right */}

        {!selectedService && (
          <form className={"selectContainer"}>
            <label htmlFor={"selectDest"}>Destinataire</label>
            <Select
              id={"selectDest"}
              options={[
                { value: "A", label: "Administration" },
                { value: "option2", label: "Option 2" },
                { value: "option3", label: "Option 3" },
              ]}
              onChange={(selectedOption): void => {
                if (selectedOption) {
                  console.log("selectedOption:", selectedOption);
                  setSelectedService(selectedOption.value);
                }
              }}
            />
          </form>
        )}
        <div className={"goBackBtnWrapper"}>
          <Button
            props={{
              style: "grey",
              text: "Retour",
              type: "button",
              onClick: (): void => navigate("/commandes/gestion_des_courriers"),
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

const TraiterMesCourriersWithAuth: (props: object) => ReactElement | null =
  WithAuth(TraiterMesCourriers);
export default TraiterMesCourriersWithAuth;
