import "./modificationCommande.scss";

import { ReactElement, useState, useEffect, useRef } from "react";
import { useNavigate, NavigateFunction, useParams } from "react-router-dom";

interface ICommande {
  cle: string;
  societe: string;
  tiers: string;
  prefixeEcriture: string;
  objet: string;
  modeReglement: string;
  delaiReglement: string;
  totalHT: string;
  totalTTC: string;
  acompte: string;
  commentaire: string;
  statut: string;
  solde?: string;
  dateReception?: string;
  reception?: string;
}

interface IArticle {
  commandeID: string;
  refArticle: string;
  description: string;
  quantite: string;
  prixUnitaireHorsTaxe: string;
  tauxTVA: string;
  prixUnitaireTTC: string;
}

interface IDocument {
  commandeID: string;
  type: string;
  dateTelechargement: string;
  commentaire: string;
}

import WithAuth from "../../../../views/auth/WithAuth";
import Header from "../../../../components/header/Header";
import Button from "../../../../components/button/Button";
import Footer from "../../../../components/footer/Footer";
import NRTL from "../../../../components/NRTL/NRTL.tsx";
import Select from "react-select";

function ModificationCommande(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const { commandeID } = useParams<{ commandeID: string }>();
  const [commande, setCommande] = useState<ICommande | null | undefined>(null);
  const [bodyArray, setBodyArray] = useState<string[][]>([]);
  const [documentsArray, setDocumentsArray] = useState<string[][]>([]);
  const [isDocumentsVisible, setIsDocumentsVisible] = useState<boolean>(false);
  const [isDocumentModalOpen, setIsDocumentModalOpen] =
    useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const iframeContainerRef = useRef<HTMLDivElement | null>(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const mockupCommande: ICommande[] = [
    {
      cle: "567",
      societe: "PVF",
      tiers: "TELECONVERGENCE",
      prefixeEcriture: "INFORMATIQUE",
      objet: "Commande Casques",
      modeReglement: "VIREMENT",
      delaiReglement: "45 JOURS",
      totalHT: "2 050,00",
      totalTTC: "2 460,00",
      acompte: "0",
      solde: "2 460,00",
      commentaire: "",
      statut: "Commande validée non modifiable",
    },
    {
      cle: "563",
      societe: "PVF",
      tiers: "KILOUTOU",
      prefixeEcriture: "BATIMENT",
      objet: "Chauffages",
      dateReception: "21/01/2025",
      modeReglement: "CARTE BLEUE",
      delaiReglement: "À LA COMMANDE",
      totalHT: "518,16",
      totalTTC: "619,41",
      acompte: "0",
      reception: "FERRARI Lolita (6285)",
      commentaire: "",
      statut: "Commande validée non modifiable",
    },
  ];

  const mockupArticle: IArticle[] = [
    {
      commandeID: "563",
      refArticle: "CH3KWH",
      description: "Location 3 chauffage",
      quantite: "3",
      prixUnitaireHorsTaxe: "152,00",
      tauxTVA: "20,00",
      prixUnitaireTTC: "182,40",
    },
    {
      commandeID: "563",
      refArticle: "",
      description: "Pack assurance casse, vol",
      quantite: "3",
      prixUnitaireHorsTaxe: "18,24",
      tauxTVA: "20,00",
      prixUnitaireTTC: "21,89",
    },
    {
      commandeID: "563",
      refArticle: "",
      description: "Contribution frais déchets",
      quantite: "3",
      prixUnitaireHorsTaxe: "1,82",
      tauxTVA: "20,00",
      prixUnitaireTTC: "2,18",
    },
    {
      commandeID: "567",
      refArticle: "BTE2011BAB",
      description: "MICROCASQUE TECHPHONE T2011 BINAURAL",
      quantite: "25",
      prixUnitaireHorsTaxe: "65,00",
      tauxTVA: "20,00",
      prixUnitaireTTC: "",
    },
    {
      commandeID: "567",
      refArticle: "QD2PTS",
      description: "CORDON JACK QD/JACK 4 POINTS",
      quantite: "25",
      prixUnitaireHorsTaxe: "17,00",
      tauxTVA: "20,00",
      prixUnitaireTTC: "",
    },
  ];

  const mockupDocuments: IDocument[] = [
    {
      commandeID: "563",
      type: "DEVIS",
      dateTelechargement: "20/01/2025",
      commentaire: "",
    },
    {
      commandeID: "567",
      type: "DEVIS",
      dateTelechargement: "20/01/2025",
      commentaire: "Commande casques",
    },
  ];

  const tableData = {
    tableHead: [
      "Référence Article",
      "Description",
      "Quantité",
      "Prix unitaire Hors Taxe",
      "Taux TVA",
      "Prix unitaire TTC",
    ],
    tableBody: bodyArray,
  };

  const documentTableData = {
    tableHead: ["Type", "Date téléchargement", "Commentaire"],
    tableBody: documentsArray,
  };

  const DisplayCommandeDocuments = (): ReactElement => {
    return (
      <NRTL
        datas={documentTableData}
        headerBackgroundColor={"linear-gradient(to left, #84CDE4FF, #1092B8)"}
        headerHoverBackgroundColor={"#1092B8"}
        language={"fr"}
        onRowClick={(): void => {
          setIsDocumentModalOpen(true);
        }}
      />
    );
  };

  const DisplayDocumentModal = (): ReactElement => {
    return (
      <section id={"documentModal"} ref={modalRef}>
        <div className={"iFrameContainer"} ref={iframeContainerRef}>
          <h2>Visualisation du document</h2>
          <iframe
            src="http://192.168.0.254:8080/usv_prod/documents_commandes/KILOUTOU-DEVIS_37786878-20012025-0347-P0K0PUSM5BTA7CKS0FTU.pdf"
          ></iframe>
        </div>
      </section>
    );
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

  const findDocuments = (cle: string): IDocument[] => {
    return mockupDocuments.filter(
      (document: IDocument): boolean => document.commandeID === cle,
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
          article.quantite,
          article.prixUnitaireHorsTaxe,
          article.tauxTVA,
          article.prixUnitaireTTC,
        ],
      );
      setBodyArray(tableRows);
    }
  }, [commandeID]);

  useEffect((): void => {
    if (commandeID) {
      const documents: IDocument[] = findDocuments(commandeID);
      const tableRows: string[][] = documents.map(
        (document: IDocument): string[] => [
          document.type,
          document.dateTelechargement,
          document.commentaire,
        ],
      );
      setDocumentsArray(tableRows);
    }
  }, [commandeID]);

  useEffect((): (() => void) | undefined => {
    const handleClickOutside: (event: MouseEvent) => void = (
      event: MouseEvent,
    ): void => {
      event.preventDefault();
      if (
        iframeContainerRef.current &&
        !iframeContainerRef.current.contains(event.target as Node)
      ) {
        setIsDocumentModalOpen(false);
      }
    };
    if (isDocumentModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return (): void => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDocumentModalOpen]);

  return (
    <>
      {isDocumentModalOpen && <DisplayDocumentModal />}
      {isPopupOpen && (
          <div className="popupOverlay" id="updateServiceModal">
            <form className={"updateServiceForm"}>
              <div className="popupContent">
                <h2>Télécharger une pièce pour la commande {commande?.cle}</h2>
                <div className={"formWrapper"}>
                  <div className={"inputWrapper"}>
                    <label htmlFor={"type"}>Type de document :</label>
                    <Select
                        id={"type"}
                        options={[
                          { value: "1", label: "Devis" },
                          { value: "2", label: "Courrier" },
                          { value: "3", label: "Autre" },
                        ]}
                    />
                  </div>
                </div>
                <input type="file" />
                <div className={"buttonContainer"}>
                  <Button
                      props={{
                        style: "green",
                        text: "Ajouter",
                        type: "button",
                        onClick: (): void => setIsPopupOpen(false)
                      }}
                  />
                  <Button
                      props={{
                        style: "grey",
                        text: "Annuler",
                        type: "button",
                        onClick: (): void => setIsPopupOpen(false)
                      }}
                  />
                </div>
              </div>
            </form>
          </div>
      )}
      <Header
        props={{
          pageURL: `G_IVOO | COMMANDES | MODIFICATION COMMANDE ${commandeID}`,
          helpBtn: true,
        }}
      />
      <main id={"modificationCommande"}>
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
              {commande.dateReception && (
                <div className={"inputWrapper"}>
                  <label htmlFor={"modeReglement"}>Date de rèception :</label>
                  <p>{commande.dateReception}</p>
                </div>
              )}
              <div className={"inputWrapper"}>
                <label htmlFor={"modeReglement"}>Mode de règlement :</label>
                <p>{commande.modeReglement}</p>
              </div>
              <div className={"inputWrapper"}>
                <label htmlFor={"delaiReglement"}>Délai de règlement</label>
                <p>{commande.delaiReglement}</p>
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
              {commande.reception && (
                <div className={"inputWrapper"}>
                  <label htmlFor={"reception"}>Reception :</label>
                  <p>{commande.reception}</p>
                </div>
              )}
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
              <div className={"inputWrapper"}>
                <label htmlFor={"statut"}>Statut :</label>
                <p>{commande.statut}</p>
              </div>
              <div className={"buttonWrapper"}>
                <Button
                  props={{
                    style: "green",
                    text: "Enregistrer",
                    type: "button",
                  }}
                />
                <Button
                  props={{
                    style: "blue",
                    text: "Accepter",
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
                        "/commandes/commandes_fournisseurs/utilitaire_commandes",
                      ),
                  }}
                />
              </div>
            </form>
          )}
          <div className={"buttonContainer"}>
            <Button
              props={{
                style: "red",
                text: "Supprimer",
                type: "button",
              }}
            />
            <Button
              props={{
                style: "blue",
                text: "Télécharger pièce",
                type: "button",
                onClick: (): void => setIsPopupOpen(true),
              }}
            />
            <Button
              props={{
                style: "blue",
                text: "Voir pièce",
                type: "button",
                onClick: (): void => setIsDocumentsVisible(!isDocumentsVisible),
              }}
            />
            <Button
              props={{
                style: "blue",
                text: "Imprimer",
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
                text: "Voir prévision",
                type: "button",
              }}
            />
          </div>
          <div className={"documentTableContainer"}>
            {isDocumentsVisible && <DisplayCommandeDocuments />}
          </div>
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
                style: "blue",
                text: "Ajouter une ligne d'article",
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

const ModificationCommandeWithAuth: (props: object) => ReactElement | null =
  WithAuth(ModificationCommande);
export default ModificationCommandeWithAuth;
