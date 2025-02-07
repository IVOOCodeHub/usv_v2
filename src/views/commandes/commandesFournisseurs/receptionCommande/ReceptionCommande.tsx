import "./receptionCommande.scss";

import { ReactElement, useState, useEffect } from "react";
import { useNavigate, NavigateFunction, useParams } from "react-router-dom";

interface ICommande {
  cle: string;
  societe: string;
  tiers: string;
  prefixeEcriture: string;
  objet: string;
  modeReglement: string;
  totalHT: string;
  totalTTC: string;
  acompte: string;
  commentaire: string;
  statut?: string;
  delaiReglement?: string;
  solde?: string;
  dateReception?: string;
  reception?: string;
}

interface IArticle {
  commandeID: string;
  refArticle: string;
  description: string;
  prixUnitaireHorsTaxe: string;
  tauxTVA: string;
  quantiteCommandee: string;
  quantiteLivree: string;
}

import WithAuth from "../../../../views/auth/WithAuth";
import Header from "../../../../components/header/Header";
import Button from "../../../../components/button/Button";
import Footer from "../../../../components/footer/Footer";
import NRTL from "../../../../components/NRTL/NRTL.tsx";

function ReceptionCommande(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const { commandeID } = useParams<{ commandeID: string }>();
  const [commande, setCommande] = useState<ICommande | null | undefined>(null);
  const [bodyArray, setBodyArray] = useState<string[][]>([]);
  const mockupCommande: ICommande[] = [
    {
      cle: "80",
      societe: "IVOO",
      tiers: "GANDI SAS",
      prefixeEcriture: "INFORMATIQUE",
      objet: "Abonnement Certificat SSL pour serveur mail pour un an",
      modeReglement: "CARTE BANCAIRE",
      totalHT: "40,00",
      totalTTC: "48,00",
      acompte: "0",
      solde: "48,00",
      commentaire: "Abonnement Certificat SSL pour serveur Mail pour un an",
    },
    {
      cle: "91",
      societe: "IVOO",
      tiers: "LEROY MERLIN",
      prefixeEcriture: "BATIMENT",
      objet: "Commande matériels pour réparations",
      modeReglement: "VIREMENT",
      totalHT: "436,80",
      totalTTC: "524,16",
      acompte: "0",
      solde: "524,16",
      commentaire:
        "Attente facture reception Leroy MERLIN pour validation commande",
    },
  ];

  const mockupArticle: IArticle[] = [
    {
      commandeID: "91",
      refArticle: "82003983",
      description: "Lot de 2 piles alcaline 6lr61,9V,LEXMAN",
      prixUnitaireHorsTaxe: "5,50",
      tauxTVA: "20,00",
      quantiteCommandee: "1",
      quantiteLivree: "1",
    },
    {
      commandeID: "91",
      refArticle: "82003978",
      description: "Lot de 2 piles alcaline lr14c, 1.5V, LEXMAN",
      prixUnitaireHorsTaxe: "3,50",
      tauxTVA: "20,00",
      quantiteCommandee: "1",
      quantiteLivree: "1",
    },
    {
      commandeID: "80",
      refArticle: "Certificat SSL",
      description: "Abonnement Certificat SSL pour serveur Mail pour u",
      prixUnitaireHorsTaxe: "40",
      tauxTVA: "20,00",
      quantiteCommandee: "1",
      quantiteLivree: "1",
    },
  ];

  const tableData = {
    tableHead: [
      "Référence Article",
      "Description",
      "Prix unitaire Hors Taxe",
      "Quantité commandée",
      "Quantité livrée",
    ],
    tableBody: bodyArray,
  };

  const findCommande = (cle: string): ICommande | null | undefined => {
    if (!cle) {
      return null;
    } else {
      return mockupCommande.find(
        (commande: ICommande): boolean => commande.cle === cle,
      );
    }
  };

  const findArticles = (cle: string): IArticle[] => {
    return mockupArticle.filter(
      (article: IArticle): boolean => article.commandeID === cle,
    );
  };

  useEffect((): void => {
    if (commandeID) {
      const commande: ICommande | null | undefined = findCommande(commandeID);
      setCommande(commande);
    }
  }, [commandeID]);

  useEffect((): void => {
    if (commandeID) {
      const articles: IArticle[] = findArticles(commandeID);
      const tableRows: string[][] = articles.map(
        (article: IArticle): string[] => [
          article.refArticle,
          article.description,
          article.prixUnitaireHorsTaxe,
          article.quantiteCommandee,
          article.quantiteLivree,
        ],
      );
      setBodyArray(tableRows);
    }
  }, [commandeID]);

  return (
    <>
      <Header
        props={{
          pageURL: `G_IVOO | COMMANDES | RECEPTION COMMANDE ${commandeID}`,
          helpBtn: true,
        }}
      />
      <main id={"receptionCommande"}>
        <section className={"topSection"}>
          {commande && (
            <form>
              <div className={"inputWrapper"}>
                <label htmlFor={"societe"}>Société :</label>
                <p>{commande.societe}</p>
              </div>
              <div className={"inputWrapper"}>
                <label htmlFor={"tiers"}>Tiers :</label>
                <p>{commande.tiers}</p>
              </div>
              <div className={"inputWrapper"}>
                <label htmlFor={"prefixeEcriture"}>Préfixe écriture :</label>
                <p>{commande.prefixeEcriture}</p>
              </div>
              <div className={"inputWrapper"}>
                <label htmlFor={"objet"}>Objet :</label>
                <p>{commande.objet}</p>
              </div>
              <div className={"inputWrapper"}>
                <label htmlFor={"modeReglement"}>Mode de règlement :</label>
                <p>{commande.modeReglement}</p>
              </div>
              <div className={"inputWrapper"}>
                <label htmlFor={"TotalHT"}>Total HT :</label>
                <p>{commande.totalHT}€</p>
              </div>
              <div className={"inputWrapper"}>
                <label htmlFor={"totalTTC"}>Total TTC :</label>
                <p>{commande.totalTTC}€</p>
              </div>
              <div className={"inputWrapper"}>
                <label htmlFor={"acompte"}>Acompte :</label>
                <p>{commande.acompte}€</p>
              </div>
              {commande.solde && (
                <div className={"inputWrapper"}>
                  <label htmlFor={"solde"}>Solde :</label>
                  <p>{commande.solde}€</p>
                </div>
              )}
              <div className={"inputWrapper"}>
                <label htmlFor={"comment"}>Commentaire :</label>
                <p>{commande.commentaire}</p>
              </div>
              <div className={"buttonWrapper"}>
                <Button
                  props={{
                    style: "green",
                    text: "Receptionner",
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
                        "/commandes/commandes_fournisseurs/commandes_reception_list",
                      ),
                  }}
                />
              </div>
            </form>
          )}
          <div className={"buttonContainer"}>
            <Button
              props={{
                style: "blue",
                text: "imprimer",
                type: "button",
                onClick: (): WindowProxy | null =>
                    window.open(
                        `http://srv-web:8081/CrystalWebViewerURL/view.aspx?mode=E&etat=commandes_f&xml=commandes_f&p1=so:${mockupCommande[0].societe}&p2=numBC:$${mockupCommande[0].societe}`, '_blank'
                    ),
              }}
            />

            <Button
              props={{
                style: "blue",
                text: "Voir pièce",
                type: "button",
              }}
            />
          </div>
          <div className={"documentTableContainer"}></div>
        </section>
        <section className={"bottomSection"}>
          <div className={"tableContainer"}>
            <NRTL
              datas={tableData}
              headerBackgroundColor={
                "linear-gradient(to left, #84CDE4FF, #1092B8)"
              }
              headerHoverBackgroundColor={"#1092B8"}
              language={"fr"}
            />
          </div>
          <div className={"buttonContainer"}>
            <Button
              props={{
                style: "green",
                text: "Valider toutes les quantités livrées",
                type: "button",
              }}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const ReceptionCommandeWithAuth: (props: object) => ReactElement | null =
  WithAuth(ReceptionCommande);
export default ReceptionCommandeWithAuth;
