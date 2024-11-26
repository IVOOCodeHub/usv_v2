// styles
import "./courrierDepenses.scss";
// import "nillys-react-table-library/style";

// hooks | libraries
import { useNavigate, NavigateFunction } from "react-router-dom";
// import { NRTL } from "nillys-react-table-library";
import NRTL from '../../../../../components/NRTL/NRTL.tsx'
import { useEffect, useState, useContext, ReactElement } from "react";

// components
import withAuth from "../../../../../views/auth/withAuth";
import Header from "../../../../../components/header/Header";
import Loader from "../../../../../components/loader/Loader";
import Button from "../../../../../components/button/Button.tsx";
import Footer from "../../../../../components/footer/Footer";

// context
import { LoaderContext } from "../../../../../context/loaderContext.tsx";
import { UserContext } from "../../../../../context/userContext";
import { CourrierContext } from "../../../../../context/courrierContext.tsx";
import { ICourrierDepenses } from "../../../../../utils/types/courrier.interface.ts";

function CourrierDepenses(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const { isLoading, startLoading, stopLoading } = useContext(LoaderContext);
  const { user } = useContext(UserContext);
  const { courrierDepenses, getCourrierDepenses } = useContext(CourrierContext);
  const [bodyArray, setBodyArray] = useState<string[][]>([]);

  const convertToArray: (datas: ICourrierDepenses[]) => string[][] = (
    datas: ICourrierDepenses[],
  ): string[][] => {
    return datas.map((data: ICourrierDepenses): string[] => [
      data.index,
      data.dhSaisie,
      data.societeEmettrice,
      data.societe,
      data.nature,
      data.action,
      data.commentaire,
    ]);
  };

  useEffect((): void => {
    startLoading();
    if (user) {
      const userCredentials = {
        matricule: user.matricule,
        password: user.password,
      };
      getCourrierDepenses(userCredentials).finally(stopLoading);
    }
  }, []);

  useEffect((): void => {
    if (Array.isArray(courrierDepenses)) {
      setBodyArray(convertToArray(courrierDepenses));
    }
  }, [getCourrierDepenses, courrierDepenses]);

  const tableData = {
    tableHead: [
      "Clé",
      "Date réception",
      "Émetteur",
      "Destinataire",
      "Pièce",
      "Action",
      "Commentaire",
    ],
    tableBody: bodyArray,
  };

  return (
    <>
      <Header props={{ pageURL: "G_IVOO | Comptabilité" }} />
      <main id={"courrierDepenses"}>
        <div className={"tableWrapper"}>
          {isLoading ? (
            <Loader />
          ) : (
            <NRTL
              datas={tableData}
              headerBackgroundColor={
                "linear-gradient(to left, #84CDE4FF, #1092B8)"
              }
              headerHoverBackgroundColor={"#1092B8"}
              showItemsPerPageSelector={true}
              showPreviousNextButtons={true}
              showSearchBar={true}
              filterableColumns={[false, false, true, true, true, true, false]}
              showPagination={true}
              enableColumnSorting={true}
              itemsPerPageOptions={[10, 25, 50]}
              onRowClick={(rowData: string[]): void =>
                navigate("/commandes/tresorerie/courrier_consult", {
                  state: { rowData },
                })
              }
              language={'fr'}
            />
          )}
        </div>
        <Button
          props={{
            style: "grey",
            text: "Retour",
            type: "button",
            onClick: (): void => navigate("/commandes/tresorerie/menu"),
          }}
        />
      </main>
      <Footer />
    </>
  );
}

const CourrierDepensesWithAuth: (props: object) => ReactElement | null =
  withAuth(CourrierDepenses);
export default CourrierDepensesWithAuth;