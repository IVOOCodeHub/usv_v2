// styles
import "./menuGeneral.scss";
import "nillys-react-table-library/style";

// types
import { ReactElement } from "react";
import { NavigateFunction } from "react-router-dom";

// hooks | libraries
import { useNavigate, useLocation } from "react-router-dom";

// components
import Header from "../../../components/header/Header";
import { NRTL } from "nillys-react-table-library";
import Button from "../../../components/button/Button";
import Footer from "../../../components/footer/Footer";

export default function MenuGeneral(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();
  const { site } = location.state || { groupe: "", site: "" };

  console.log("location state =>", location.state);

  const parametrages = {
    tableHead: ["Paramétrages"],
    tableBody: [
      ["Organisation générale"],
      ["Social"],
      ["Fiches processus"],
      ["GTT"],
      ["États info"],
      ["MDP"],
      ["Gestion G_IVOO"],
    ],
  };

  const commandes = {
    tableHead: ["Commandes"],
    tableBody: [
      ["Gestion des courriers"],
      ["Commandes Fournisseurs"],
      ["Associer un document"],
      ["Recherche"],
      ["Emissions"],
      ["Retours"],
      ["Gestion DOC clients"],
      ["Annulation commande"],
      ["Renvoi d'une commande au partenaire"],
      ["Imp. courriers"],
      ["Réception règlement"],
      ["Gestion Commandes & Factures"],
      ["Comptabilité"],
      ["Litiges"],
    ],
  };

  return (
    <>
      <Header
        props={{
          pageURL: `G_IVOO | ${site} | ACCUEIL ADMINISTRATION`,
          helpBtn: true,
        }}
      />
      <main id={"menuGeneral"}>
        <nav className={"menuGeneral__nav"}>
          <div className={"tableContainer"}>
            <NRTL
              datas={parametrages}
              headerBackgroundColor={
                "linear-gradient(to left, #84CDE4FF, #1092B8)"
              }
              headerHoverBackgroundColor={"#84CDE4FF"}
            />
            <NRTL
              datas={commandes}
              headerBackgroundColor={
                "linear-gradient(to left, #84CDE4FF, #1092B8)"
              }
              headerHoverBackgroundColor={"#84CDE4FF"}
            />
          </div>

          <Button
            props={{
              style: "blue",
              text: "Retour",
              type: "button",
              onClick: (): void => navigate("/menu_site"),
            }}
          />
        </nav>
        <nav className={"menuGeneral__testZone"}>
          <Button
            props={{
              style: "blue",
              text: "Test config son",
              type: "button",
              onClick: (): void => navigate("/test"),
            }}
          />
          <Button
            props={{
              style: "blue",
              text: "Test mscal.ocx",
              type: "button",
              onClick: (): void => navigate("/test"),
            }}
          />
          <Button
            props={{
              style: "blue",
              text: "Test envoi mail",
              type: "button",
              onClick: (): void => navigate("/test"),
            }}
          />
          <Button
            props={{
              style: "blue",
              text: "Maintenance XP par IE",
              type: "button",
              onClick: (): void => navigate("/test"),
            }}
          />
        </nav>
      </main>
      <Footer />
    </>
  );
}
