import "./modifProfilDistribution.scss";
import { ReactElement } from "react";
import { useNavigate, NavigateFunction, useParams } from "react-router-dom";
import WithAuth from "../../../auth/WithAuth";
import Select from "react-select";
import Header from "../../../../components/header/Header";
import Button from "../../../../components/button/Button";
import Footer from "../../../../components/footer/Footer";

function ModifProfilDistribution(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const { profilID } = useParams();
  return (
    <>
      <Header
        props={{
          pageURL: `G_IVOO | GESTION DES COURRIERS | UTILITAIRES | MODIFIER LE PROFIL DE DISTRIBUTION ${profilID} –NOM PROFIL–`,
          helpBtn: true,
        }}
      />
      <main id={"modifProfilDistribution"}>
        <form>
          <div className={"inputWrapper"}>
            <label htmlFor={"nom"}>Nature pièce :</label>
            <p>Arrêt de travail</p>
          </div>
          <div className={"inputWrapper"}>
            <label htmlFor={"prenom"}>Pièce sans profil :</label>
            <Select
              id={"prenom"}
              options={[
                { value: "0", label: "Non" },
                { value: "1", label: "Oui" },
              ]}
            />
          </div>
          <div className={"inputWrapper"}>
            <label htmlFor={"adresse"}>Sens :</label>
            <Select
              id={"prenom"}
              options={[
                { value: "0", label: "Choisir" },
                { value: "1", label: "Reçu" },
                { value: "2", label: "Expédier" },
                { value: "3", label: "Interne" },
              ]}
              defaultValue={{ value: "0", label: "Choisir" }}
            />
          </div>
          <div className={"inputWrapper"}>
            <label htmlFor={"ville"}>Service destinataire :</label>
            <Select
              id={"prenom"}
              options={[
                { value: "0", label: "Choisir" },
                { value: "1", label: "Gestion des ressources humaines" },
                { value: "2", label: "Expédier" },
                { value: "3", label: "Interne" },
              ]}
              defaultValue={{
                value: "1",
                label: "Gestion des ressources humaines",
              }}
            />
          </div>
          <div className={"inputWrapper"}>
            <label htmlFor={"codePostal"}>Action service destinataire :</label>
            <Select
              id={"prenom"}
              options={[{ value: "0", label: "A traiter" }]}
              defaultValue={{ value: "0", label: "A traiter" }}
            />
          </div>
          <div className={"inputWrapper"}>
            <label htmlFor={"pays"}>Service en copie :</label>
            <Select
              id={"prenom"}
              options={[{ value: "0", label: "Aucun" }]}
              defaultValue={{ value: "0", label: "Aucun" }}
            />
          </div>
          <div className={"inputWrapper"}>
            <label htmlFor={"pays"}>Action service en copie :</label>
            <Select
              id={"prenom"}
              options={[{ value: "0", label: "Non applicable" }]}
              defaultValue={{ value: "0", label: "Non applicable" }}
            />
          </div>
          <div className={"inputWrapper"}>
            <label htmlFor={"pays"}>Copie drive :</label>
            <Select
              id={"prenom"}
              options={[
                { value: "0", label: "Non" },
                { value: "1", label: "Oui" },
              ]}
              defaultValue={{ value: "0", label: "Non" }}
            />
          </div>
          <div className={"inputWrapper"}>
            <label htmlFor={"pays"}>Commentaire :</label>
            <textarea></textarea>
          </div>
          <div className={"buttonContainer"}>
            <Button
              props={{
                style: "green",
                text: "Enregistrer les modifications",
                type: "button",
              }}
            />
            <Button
              props={{
                style: "grey",
                text: "Retour",
                type: "button",
                onClick: (): void =>
                  navigate(
                    "/commandes/gestion_des_courriers/courrier_utils/gestion_des_profils_distribution",
                  ),
              }}
            />
          </div>
          <div className={"actionButtonContainer"}>
            <Button
              props={{
                style: "red",
                text: "Supprimer le profil",
                type: "button",
              }}
            />
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}

const ModifProfilDistributionWithAuth: (props: object) => ReactElement | null =
  WithAuth(ModifProfilDistribution);
export default ModifProfilDistributionWithAuth;
