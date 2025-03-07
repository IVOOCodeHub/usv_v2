import "./creationCommandes.scss";

import { ReactElement, useState, useEffect } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import WithAuth from "../../../auth/WithAuth.tsx";
import Select from "react-select";
import Header from "../../../../components/header/Header.tsx";
import Footer from "../../../../components/footer/Footer.tsx";
import Button from "../../../../components/button/Button.tsx";
import NRTL from "../../../../components/NRTL/NRTL.tsx";
import ModalContainer from "../../../../components/modaleContainer/modalContainer.tsx";

function CreationCommandes(): ReactElement {
  const [isNewArticleModalOpen, setIsNewArticleModalOpen] =
    useState<boolean>(false);
  const [isPreviousOrderModalOpen, setIsPreviousOrderModalOpen] =
    useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
  const [bodyArray, setBodyArray] = useState<string[][]>([]);
  const [isVirementSelected, setIsVirementSelected] = useState<boolean>(false);

  const mockupBodyArray: string[][] = [];

  const tableDatas = {
    tableHead: [
      "Ref. Article",
      "Description",
      "Quantité",
      "Prix unitaire HT",
      "Taux de TVA",
      "Prix unitaire TTC",
    ],
    tableBody: bodyArray,
  };

  const previousOrdersTableDatas = {
    tableHead: [
      "Numéro de commande",
      "Société",
      "Tiers",
      "Date de commande",
      "Objet",
      "Montant TTC",
    ],
    tableBody: [
      ["62639", "A", "B", "2022-01-01", "C", `850 ${"€"}`],
      ["28373", "A", "B", "2022-01-01", "C", `850 ${"€"}`],
      ["28373", "A", "B", "2022-01-01", "C", `850 ${"€"}`],
      ["28373", "A", "B", "2022-01-01", "C", `850 ${"€"}`],
      ["28373", "A", "B", "2022-01-01", "C", `850 ${"€"}`],
    ],
  };

  useEffect((): void => {
    setBodyArray(mockupBodyArray);
  }, []);

  const CreateNewArticleForm = (): ReactElement => {
    return (
      <form>
        <div className={"inputWrapper"}>
          <label htmlFor={"articleRef"}>Référence de l'article :</label>
          <input type={"text"} id={"articleRef"} />
        </div>
        <div className={"inputWrapper"}>
          <label htmlFor={"label"}>Libellé de l'article :</label>
          <input type={"text"} id={"label"} />
        </div>
        <div className={"inputWrapper"}>
          <label htmlFor={"quantity"}>Quantité :</label>
          <input type={"number"} id={"quantity"} />
        </div>
        <div className={"inputWrapper"}>
          <label htmlFor={"priceHT"}>Prix unitaire Hors taxe :</label>
          <input type={"number"} id={"priceHT"} />
        </div>
        <div className={"inputWrapper"}>
          <label htmlFor={"tva"}>Taux TVA :</label>
          <Select
            id={"tva"}
            options={[
              { value: "", label: "Choisir" },
              { value: "2.5", label: "2,5%" },
              { value: "5.5", label: "5,5%" },
              { value: "20", label: "20%" },
            ]}
            defaultValue={{ value: "", label: "Choisir" }}
            onChange={(selectedOption) => {
              console.log(selectedOption);
            }}
          />
        </div>
        <div className={"buttonWrapper"}>
          <Button
            props={{
              style: "green",
              text: "Crée la ligne d'article",
              type: "submit",
            }}
          />
          <Button
            props={{
              style: "grey",
              text: "Annuler",
              type: "button",
              onClick: (): void => setIsNewArticleModalOpen(false),
            }}
          />
        </div>
      </form>
    );
  };

  const SelectPreviousOrders = (): ReactElement => {
    return (
      <div className={"tableWrapper"}>
        <NRTL
          datas={previousOrdersTableDatas}
          headerBackgroundColor={"linear-gradient(to left, #84CDE4FF, #1092B8)"}
          headerHoverBackgroundColor={"#1092B8"}
          showSearchBar={true}
          showItemsPerPageSelector={true}
          showPreviousNextButtons={true}
          filterableColumns={[false, true, true, true, false, false]}
          showPagination={true}
          enableColumnSorting={true}
          itemsPerPageOptions={[10, 25, 50]}
          language={"fr"}
        />
      </div>
    );
  };

  return (
    <>
      {isNewArticleModalOpen && (
        <ModalContainer
          isModalOpen={isNewArticleModalOpen}
          setIsModalOpen={setIsNewArticleModalOpen}
          reactElement={<CreateNewArticleForm />}
        />
      )}
      {isPreviousOrderModalOpen && (
        <ModalContainer
          isModalOpen={isPreviousOrderModalOpen}
          setIsModalOpen={setIsPreviousOrderModalOpen}
          reactElement={<SelectPreviousOrders />}
        />
      )}
      <Header
        props={{
          pageURL: `G_IVOO | COMMANDES | CREATION NOUVELLE COMMANDE`,
          helpBtn: true,
        }}
      />
      <main id={"creationCommandes"}>
        <form>
          <div className={"inputWrapper"}>
            <label htmlFor={""}>Société :</label>
            <Select
              id={"societe"}
              options={[{ value: "", label: "Choisir" }]}
              defaultValue={{ value: "", label: "Choisir" }}
              onChange={(selectedOption) => {
                console.log(selectedOption);
              }}
            />
          </div>
          <div className={"inputWrapper"}>
            <label htmlFor={""}>Fournisseur :</label>
            <Select
              id={"tiers"}
              options={[{ value: "", label: "Choisir" }]}
              defaultValue={{ value: "", label: "Choisir" }}
              onChange={(selectedOption) => {
                console.log(selectedOption);
              }}
            />
          </div>
          <div className={"inputWrapper"}>
            <label htmlFor={""}>Nature:</label>
            <Select
              id={"tiers"}
              options={[{ value: "", label: "Choisir" }]}
              defaultValue={{ value: "", label: "Choisir" }}
              onChange={(selectedOption) => {
                console.log(selectedOption);
              }}
            />
          </div>
          <div className={"inputWrapper"}>
            <label htmlFor={"object"}>Objet :</label>
            <input type={"text"} id={"object"} />
          </div>
          <div className={"inputWrapper"}>
            <label htmlFor={""}>Payment à la commande :</label>
            <Select
              id={"tiers"}
              options={[
                { value: "", label: "Choisir" },
                { value: "1", label: "Oui" },
                { value: "0", label: "Non" },
              ]}
              defaultValue={{ value: "", label: "Choisir" }}
              onChange={(selectedOption) => {
                console.log(selectedOption);
              }}
            />
          </div>
          <div className={"inputWrapper"}>
            <label htmlFor={""}>Mode de règlement :</label>
            <Select
              id={"tiers"}
              options={[
                { value: "", label: "Choisir" },
                { value: "CAISSE", label: "Caisse" },
                { value: "CARTE BLEUE", label: "Carte bleue" },
                { value: "CHEQUE", label: "Chèque" },
                { value: "VIREMENT", label: "Virement" },
              ]}
              defaultValue={{ value: "", label: "Choisir" }}
              onChange={(selectedOption) => {
                if (selectedOption!.value === "VIREMENT") {
                  console.log("selectedOption:", selectedOption);
                  setIsVirementSelected(true);
                } else {
                  setIsVirementSelected(false);
                }
              }}
            />
          </div>

          {isVirementSelected && (
            <>
              <div className={"inputWrapper"}>
                <label htmlFor={"delaiReglement"}>Délai de règlement :</label>
                <p id={"delaiReglement"}>45 jours</p>
              </div>
              <div className={"inputWrapper"}>
                <label htmlFor={"totalHT"}>Total HT :</label>
                <p id={"totalHT"}>2 050,00€</p>
              </div>
              <div className={"inputWrapper"}>
                <label htmlFor={"totalTTC"}>Total TTC :</label>
                <p id={"totalTTC"}>2 460, 00€</p>
              </div>
            </>
          )}

          <div className={"inputWrapper"}>
            <label htmlFor={""}>Date de livraison:</label>
            <input type={"date"} />
          </div>
          <div className={"inputWrapper"}>
            <label htmlFor={"comment"}>Commentaire :</label>
            <textarea id={"comment"} defaultValue={""}></textarea>
          </div>
          <div className={"buttonWrapper"}>
            <Button
              props={{
                style: "green",
                text: "Créer la demande de commande",
                type: "button",
                onClick: (): void =>
                  navigate("/commandes/commandes_fournisseurs"),
              }}
            />
          </div>
        </form>
        <div className={"buttonWrapper"}>
          <Button
            props={{
              style: "blue",
              text: "Ajouter une ligne d'article",
              type: "button",
              onClick: (): void => {
                setIsNewArticleModalOpen(true);
                setIsPreviousOrderModalOpen(false);
              },
            }}
          />
          <Button
            props={{
              style: "blue",
              text: "Dupliquer une ancienne commande",
              type: "button",
              onClick: (): void => {
                setIsNewArticleModalOpen(false);
                setIsPreviousOrderModalOpen(true);
              },
            }}
          />
          <Button
            props={{
              style: "grey",
              text: "Annuler",
              type: "button",
              onClick: (): void =>
                navigate("/commandes/commandes_fournisseurs"),
            }}
          />
        </div>
        <NRTL
          datas={tableDatas}
          headerBackgroundColor={"linear-gradient(to left, #84CDE4FF, #1092B8)"}
          headerHoverBackgroundColor={"#1092B8"}
          showSearchBar={true}
          showItemsPerPageSelector={true}
          showPreviousNextButtons={true}
          filterableColumns={[false, false, true, false, true, false]}
          showPagination={true}
          enableColumnSorting={true}
          itemsPerPageOptions={[10, 25, 50]}
          language={"fr"}
        />
      </main>
      <Footer />
    </>
  );
}

const CreationCommandesWithAuth: (props: object) => ReactElement | null =
  WithAuth(CreationCommandes);
export default CreationCommandesWithAuth;
