import "./gestionDesServicesDestinataires.scss";
import { trapFocus } from "../../../../utils/scripts/utils.ts";

import { ReactElement, useState, useRef, useEffect } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

import WithAuth from "../../../auth/WithAuth";
import NRTL from "../../../../components/NRTL/NRTL";
import Header from "../../../../components/header/Header";
import Footer from "../../../../components/footer/Footer";
import Button from "../../../../components/button/Button";
import Select from "react-select";

function GestionDesServicesDestinataires(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const createServiceFormRef = useRef<HTMLFormElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const tableData = {
    tableHead: ["Service", "Libellé", "Profil"],
    tableBody: [
      ["DIRECTION", "Direction", "D"],
      ["FINANCE", "Finance (compta/tréso)", "C"],
    ],
  };

  useEffect((): (() => void) | undefined => {
    const handleClickOutside: (event: MouseEvent) => void = (
      event: MouseEvent,
    ): void => {
      event.preventDefault();
      if (
        createServiceFormRef.current &&
        !createServiceFormRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return (): void => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  useEffect((): void => {
    trapFocus(modalRef.current);
  }, [isModalOpen]);

  const CreateNewServiceModal = (): ReactElement => {
    return (
      <section id={"createNewServiceModal"} ref={modalRef}>
        <form className={"createServiceForm"} ref={createServiceFormRef}>
          <h2>Création nouveau service courrier</h2>
          <div className={"inputWrapper"}>
            <label>Service :</label>
            <input type={"text"} />
          </div>
          <div className={"inputWrapper"}>
            <label>Libellé: </label>
            <input type={"text"} />
          </div>
          <div className={"inputWrapper"}>
            <label>Profil autorisé à la lecture</label>
            <Select
              options={[
                { value: "", label: "Choisir" },
                { value: "D", label: "Direction" },
                { value: "B", label: "Profil B" },
              ]}
              defaultValue={{ value: "", label: "Choisir" }}
            />
          </div>
          <div className={"buttonWrapper"}>
            <Button
              props={{
                style: "green",
                text: "Crée le service",
                type: "button",
              }}
            />
            <Button
              props={{
                style: "red",
                text: "Annuler la création",
                type: "button",
                onClick: (): void => setIsModalOpen(false),
              }}
            />
          </div>
        </form>
      </section>
    );
  };

  return (
    <>
      {isModalOpen && <CreateNewServiceModal />}
      <Header
        props={{
          pageURL: `G_IVOO | PARAMÉTRAGES | ORGANISATION GENÉRALE | GESTION DES SERVICES DESTINATAIRES COURRIER`,
          helpBtn: true,
        }}
      />
      <main id={"gestionDesServicesDestinataires"}>
        <NRTL
          datas={tableData}
          headerBackgroundColor={"linear-gradient(to left, #84CDE4FF, #1092B8)"}
          headerHoverBackgroundColor={"#1092B8"}
          showPreviousNextButtons={true}
          showSearchBar={true}
          itemsPerPageOptions={[10, 25, 50]}
          language={"fr"}
        />
        <div className={"buttonWrapper"}>
          <Button
            props={{
              style: "blue",
              text: "Ajouter",
              type: "button",
              onClick: (): void => setIsModalOpen(true),
            }}
          />
          <Button
            props={{
              style: "grey",
              text: "Retour",
              type: "button",
              onClick: (): void => navigate("/organisation_generale"),
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

const GestionDesServicesDestinatairesWithAuth: (
  props: object,
) => ReactElement | null = WithAuth(GestionDesServicesDestinataires);
export default GestionDesServicesDestinatairesWithAuth;
