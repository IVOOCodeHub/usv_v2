// auth Middleware
import withAuth from "../../../../auth/WithAuth.tsx";

// styles
import "./courrierConsult.scss";

// custom types
import { ICourrierDepenses } from "../../../../../utils/types/courrier.interface.ts";

// hooks | libraries
import { useNavigate, useLocation, NavigateFunction } from "react-router-dom";
import { useContext, useState, useEffect, ReactElement } from "react";

// context
import { CourrierContext } from "../../../../../context/courrierContext.tsx";

// components
import Header from "../../../../../components/header/Header";
import Select from "react-select";
import Button from "../../../../../components/button/Button.tsx";
import Footer from "../../../../../components/footer/Footer";
import SelectGroup from "../../../../../components/selectGroup/SelectGroup.tsx";

export function CourrierConsult(): ReactElement {
  const location = useLocation();
  const { rowData } = location.state;
  const courrierData = rowData
  const courrierID: string = courrierData[0];
  const navigate: NavigateFunction = useNavigate();
  const { courrierDepenses } = useContext(CourrierContext);
  const getSelectedCourrier: () => ICourrierDepenses | undefined = ():
    | ICourrierDepenses
    | undefined => {
    if (Array.isArray(courrierDepenses)) {
      return courrierDepenses?.find(
        (courrier: ICourrierDepenses): boolean => courrier.index === courrierID,
      );
    }
  };
  const [selectedCourrier, setSelectedCourrier] = useState<
    ICourrierDepenses | null | undefined
  >(null);

  useEffect(() => {
    setSelectedCourrier(getSelectedCourrier());
  }, []);

  return (
    <>
      <Header
        props={{
          pageURL: `G_IVOO | Comptabilité | Nouvelle prévision de dépenses | Courrier ${courrierID}`,
          helpBtn: true,
        }}
      />
      {selectedCourrier && (
        <main id={"courrierConsult"}>
          <div className={"leftSide"}>
            <h2>Courrier {selectedCourrier.fileName}</h2>
            <dl>
              <dt>Société :</dt>
              <dd>{selectedCourrier.societe}</dd>
              <dt>Nature :</dt>
              <dd>{selectedCourrier.nature}</dd>
              <dt>Action :</dt>
              <dd>{selectedCourrier.action}</dd>
              <dt>Commentaire :</dt>
              <dd>{selectedCourrier.commentaire}</dd>
              <Button
                props={{
                  style: "blue",
                  text: "Modifier",
                  type: "button",
                  onClick: (): void =>
                    navigate("/commandes/tresorerie/courrier_depenses"),
                }}
              />
            </dl>
            <div>
              <iframe
                title={"courrier"}
                src={`http://192.168.0.254:8080/usv_prod/courriers/${selectedCourrier.fileName}`}
              />
            </div>
          </div>
          <div className={"rightSide"}>
            <div className={"formContainer"}>
              <form>
                <h3>Nouvelle prévision de dépense</h3>
                <div className={"inputWrapper"}>
                  <label>Date pièce : </label>
                  <input type={"date"} />
                </div>
                <div className={"inputWrapper"}>
                  <label>Société : </label>
                  <Select
                    options={[
                      { value: "", label: "Choisir" },
                      { value: "BB", label: "BB" },
                      { value: "ECOASSIS", label: "ECOASSIS" },
                      { value: "FAJ", label: "FAJ" },
                      { value: "FI_IMMO", label: "FI_IMMO" },
                      { value: "FLEURIAU", label: "FLEURIAU" },
                      { value: "GEAS", label: "GEAS" },
                      { value: "GELS", label: "GELS" },
                      { value: "GEMP", label: "GEMP" },
                      { value: "GEMV", label: "GEMV" },
                      { value: "IVOB", label: "IVOB" },
                      { value: "IVOO", label: "IVOO" },
                      { value: "IVOR", label: "IVOR" },
                      { value: "IVOS", label: "IVOS" },
                      { value: "PVF", label: "PVF" },
                      { value: "SBL", label: "SBL" },
                      { value: "SBL BNC", label: "SBL BNC" },
                      { value: "SCI_IMO_BECQUET", label: "SCI_IMO_BECQUET" },
                      { value: "SITAP", label: "SITAP" },
                      { value: "STENICO_RE", label: "STENICO_RE" },
                    ]}
                  />
                </div>
                <div className={"inputWrapper"}>
                    <label>Tiers</label>
                  <div className={"tiersWrapper"}>
                    <p>1424 - MMA</p>
                    <Button
                      props={{
                        style: "grey",
                        text: "Prév",
                        type: "button",
                      }}
                    />
                    <Button
                      props={{
                        style: "grey",
                        text: "Edit. tiers",
                        type: "button",
                      }}
                    />
                  </div>
                </div>
                <div className={"inputWrapper"}>
                  <label>Rubrique : </label>
                  <Select
                    options={[
                      { value: "", label: "Choisir" },
                      {
                        value: "CHARGES SALARIALES",
                        label: "CHARGES SALARIALES",
                      },
                    ]}
                  />
                </div>
                <div className={"inputWrapper"}>
                  <label>Libellé :</label>
                  <SelectGroup
                    props={{
                      selectProps: {
                        isClearable: true,
                      },
                      optionsData: [
                        {
                          libelle: "Préfixe libellé",
                          options: [
                            { value: "0", label: "Choisir" },
                            { value: "ADMIN", label: "ADMIN" },
                            { value: "ANIM", label: "ANIM" },
                            { value: "AVOIR", label: "AVOIR" },
                            { value: "CIONS", label: "CIONS" },
                            { value: "FORM", label: "FORM" },
                            { value: "MADP", label: "MADP" },
                            { value: "REMBT", label: "REMBT" },
                            { value: "RETRO", label: "RETRO" },
                            { value: "VIRT", label: "VIRT" },
                            { value: "VIVIF", label: "VIVIF" },
                            { value: "VIVMA", label: "VIVMA" },
                            { value: "VIVRE", label: "VIVRE" },
                          ],
                        },
                        {
                          libelle: "Mois",
                          options: [
                            { value: "01", label: "Janvier" },
                            { value: "02", label: "Février" },
                            { value: "03", label: "Mars" },
                            { value: "04", label: "Avril" },
                            { value: "05", label: "Mai" },
                            { value: "06", label: "Juin" },
                            { value: "07", label: "Juillet" },
                            { value: "08", label: "Août" },
                            { value: "09", label: "Septembre" },
                            { value: "10", label: "Octobre" },
                            { value: "11", label: "Novembre" },
                            { value: "12", label: "Décembre" },
                          ],
                        },
                        {
                          libelle: "Trim",
                          options: [
                            { value: "0", label: "Choisir" },
                            { value: "1er trimestre", label: "1er trimestre" },
                            {
                              value: "2ème trimestre",
                              label: "2ème trimestre",
                            },
                            {
                              value: "3ème trimestre",
                              label: "3ème trimestre",
                            },
                            {
                              value: "4ème trimestre",
                              label: "4ème trimestre",
                            },
                          ],
                        },
                      ],
                    }}
                  />
                </div>
                <div className={"inputWrapper"}>
                  <label>Montant TTC : </label>
                  <input type={"number"} />
                </div>
                <div className={"inputWrapper"}>
                  <label>Banque réglement : </label>
                  <Select
                    options={[
                      { value: "", label: "Choisir" },
                      {
                        value: "00025711726",
                        label: "00025711726 - SOCIETE GENERALE",
                      },
                    ]}
                  />
                </div>
                <div className={"inputWrapper"}>
                  <label>Avec TVA : </label>
                  <input type={"checkbox"} />
                </div>
                <div className={"inputWrapper"}>
                  <label>Moins de 20% TVA : </label>
                  <input type={"checkbox"} />
                </div>
                <div className={"inputWrapper"}>
                  <label>TVA 20% : </label>
                  <input type={"number"} />
                </div>
                <div className={"inputWrapper"}>
                  <label>Date échéance : </label>
                  <input type={"date"} />
                </div>
                <div className={"inputWrapper"}>
                  <label>Date Ordo. : </label>
                  <input type={"date"} />
                </div>
                <div className={"buttonWrapper"}>
                  <Button
                    props={{
                      style: "blue",
                      text: "Valider",
                      type: "submit",
                    }}
                  />
                  <Button
                    props={{
                      style: "grey",
                      text: "Annuler",
                      type: "button",
                      onClick: (): void => navigate(-1),
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
        </main>
      )}
      <Footer />
    </>
  );
}

const CourrierConsultWithAuth: (props: object) => ReactElement | null =
  withAuth(CourrierConsult);
export default CourrierConsultWithAuth;
