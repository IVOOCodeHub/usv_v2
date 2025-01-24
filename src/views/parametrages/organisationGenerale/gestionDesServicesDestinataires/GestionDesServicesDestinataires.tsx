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

interface IService {
  name: string;
  label: string;
  profile: string;
  profileAuthorizedToRead?: string;
  labelAuthorizedToRead?: string;
}

function GestionDesServicesDestinataires(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const serviceFormRef = useRef<HTMLFormElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<
    IService | string[] | null | undefined
  >(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);

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
      if (
        serviceFormRef.current &&
        !serviceFormRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
        setIsUpdateModalOpen(false);
      }
    };
    if (isModalOpen || isUpdateModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return (): void => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, isUpdateModalOpen]);

  useEffect((): void => {
    trapFocus(modalRef.current);
  }, [isModalOpen, isUpdateModalOpen]);

  const CreateNewServiceModal = (): ReactElement => {
    return (
      <section id={"createNewServiceModal"} ref={modalRef}>
        <form className={"createServiceForm"} ref={serviceFormRef}>
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
                style: "grey",
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

  const UpdateServiceModal = (): ReactElement => {
    const { name, label, profileAuthorizedToRead, labelAuthorizedToRead } =
      selectedService as IService;

    console.log("selectedService:", selectedService);

    return (
      <section id={"updateServiceModal"} ref={modalRef}>
        <form className={"updateServiceForm"} ref={serviceFormRef}>
          <h2>Modification du service courrier {name}</h2>
          <div className={"inputWrapper"}>
            <label>Service :</label>
            <input type={"text"} defaultValue={name} />
          </div>
          <div className={"inputWrapper"}>
            <label>Libellé: </label>
            <input type={"text"} defaultValue={label} />
          </div>
          <div className={"inputWrapper"}>
            <label>Profil autorisé à la lecture</label>
            <Select
              options={[
                { value: "", label: "Choisir" },
                { value: "D", label: "Direction" },
                { value: "B", label: "Profil B" },
              ]}
              defaultValue={{
                value: profileAuthorizedToRead,
                label: labelAuthorizedToRead,
              }}
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
                style: "grey",
                text: "Annuler la modification",
                type: "button",
                onClick: (): void => setIsUpdateModalOpen(false),
              }}
            />
          </div>
        </form>
        <div className={"buttonWrapper deleteButtonWrapper"}>
          <Button
            props={{
              style: "red",
              text: "Supprimer le service",
              type: "button",
            }}
          />
        </div>
      </section>
    );
  };

  return (
    <>
      {isModalOpen && <CreateNewServiceModal />}
      {isUpdateModalOpen && <UpdateServiceModal />}
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
          onRowClick={(index: number, rowData: string[] | undefined): void => {
            console.log("row index:", index);
            if (rowData) {
              const selectedService = {
                name: rowData[0],
                label: rowData[1],
                profile: rowData[2],
                profileAuthorizedToRead: 'D', // TODO : MOCKUP NEEDS A FIND FROM DB
                labelAuthorizedToRead: 'Direction', // TODO : MOCKUP NEEDS A FIND FROM DB
              };
              setSelectedService(selectedService);
              setIsUpdateModalOpen(true);
            }
          }}
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
