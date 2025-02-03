import "./rechercheCourrier.scss";

import { IPaginationParams } from "../../../../utils/types/courrier.interface";
import { ICourrier } from "../../../../utils/types/courrier.interface";

import { ReactElement, useContext, useEffect, useState } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

import { CourrierContext } from "../../../../context/courrierContext/CourrierContext";
import { UserContext } from "../../../../context/userContext";

import WithAuth from "../../../auth/WithAuth";
import Header from "../../../../components/header/Header";
import Footer from "../../../../components/footer/Footer";
import Button from "../../../../components/button/Button";
import NRTL from "../../../../components/NRTL/NRTL";

function RechercheCourrier(): ReactElement {
  const { getCourriers } = useContext(CourrierContext);
  const { userCredentials } = useContext(UserContext);
  const [courriersServer, setCourriersServer] = useState<ICourrier[] | []>([]);
  const [paginationParams, setPaginationParams] = useState<IPaginationParams>({
    offset: 0,
    limit: 10,
    search: "",
  });
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect((): void => {
    if (userCredentials) {
      getCourriers(userCredentials, paginationParams)
        .then((res: string | ICourrier[] | undefined): void => {
          if (Array.isArray(res)) {
            setCourriersServer(res);
            setTotalItems(res?.length || 0);
          }
        })
        .finally();
    }
  }, [userCredentials, paginationParams]);

  const navigate: NavigateFunction = useNavigate();

  const tableData = {
    tableHead: [
      "Clé",
      "Société",
      "Date",
      "Emetteur",
      "Nature",
      "Référence doc.",
      "Destinataire",
      "Action",
      "Statut",
      "Commentaire",
    ],
    tableBody: courriersServer.map((courrier: ICourrier): string[] => [
      courrier.cle,
      courrier.societe,
      courrier.datePiece,
      courrier.societeEmettrice,
      courrier.nature,
      courrier.refDoc,
      courrier.codeFournisseurSocieteDestinataire,
      courrier.action,
      courrier.statut,
      courrier.commentaire,
    ]),
  };
  return (
    <>
      <Header
        props={{
          pageURL: `G_IVOO | Gestion des courriers | Recherche de courriers`,
          helpBtn: true,
        }}
      />
      <main id={"rechercheCourrier"}>
        <div className={"tableContainer"}>
          <NRTL
            datas={tableData}
            headerBackgroundColor={
              "linear-gradient(to left, #84CDE4FF, #1092B8)"
            }
            headerHoverBackgroundColor={"#1092B8"}
            showItemsPerPageSelector={true}
            showPreviousNextButtons={true}
            showSearchBar={true}
            filterableColumns={[
              false,
              true,
              true,
              true,
              true,
              false,
              true,
              true,
              true,
              false,
            ]}
            showPagination={true}
            enableColumnSorting={true}
            itemsPerPageOptions={[10, 25, 50]}
            language={"fr"}
            onRowClick={(index: number, rowData?: string[] | undefined): void =>
              navigate(
                `/commandes/gestion_des_courriers/courrier_utils/modif_courrier/${rowData![0]}`,
                {
                  state: { index: index, courrierID: rowData![0] },
                },
              )
            }
            serverSidePagination={true}
            serverCurrentPage={paginationParams.offset}
            serverItemsPerPage={paginationParams.limit}
            serverTotalItems={totalItems}
            onServerPageChange={(newPage: number): void => {
              setPaginationParams({ ...paginationParams, offset: newPage });
            }}
            onServerItemsPerPageChange={(newLimit: number): void => {
              setPaginationParams({
                ...paginationParams,
                limit: newLimit,
                offset: 0,
              });
            }}
          />
        </div>
        <div className={"goBackBtnWrapper"}>
          <Button
            props={{
              style: "grey",
              text: "Retour",
              type: "button",
              onClick: (): void =>
                navigate("/commandes/gestion_des_courriers/courrier_utils"),
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

const RechercheCourrierWithAuth: (props: object) => ReactElement | null =
  WithAuth(RechercheCourrier);
export default RechercheCourrierWithAuth;
