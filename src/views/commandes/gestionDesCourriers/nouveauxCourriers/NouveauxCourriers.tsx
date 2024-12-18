// styles
import "./nouveauxCourriers.scss";

// hooks | libraries
import { ReactElement, useContext, useState, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

// components
import withAuth from "../../../auth/withAuth.tsx";
import NRTL from "../../../../components/NRTL/NRTL.tsx";
import Header from "../../../../components/header/Header";
import Footer from "../../../../components/footer/Footer";
import Button from "../../../../components/button/Button";
import Loader from "../../../../components/loader/Loader.tsx";

// context
import { LoaderContext } from "../../../../context/loaderContext.tsx";
import { UserContext } from "../../../../context/userContext.tsx";
import { FileContext } from "../../../../context/fileContext/FileContext.tsx";

function NouveauxCourriers(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const { isLoading, startLoading, stopLoading } = useContext(LoaderContext);
  const { useCredentials } = useContext(UserContext);
  const { files, getFiles } = useContext(FileContext);
  const [bodyArray, setBodyArray] = useState<string[][]>([]);

  const tableData = {
    tableHead: ["Fichier", "Date"],
    tableBody: bodyArray,
  };

  useEffect((): void => {
    getFiles().finally();
  }, [files]);

  console.log('files =>', files)

  return (
    <>
      <Header
        props={{
          pageURL: "G_IVOO | Gestion des courriers | Nouveaux courriers",
        }}
      />
      <main id={"nouveauxCourriers"}>
        <div className={"tableContainer"}>
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
              filterableColumns={[false, true]}
              showPagination={true}
              enableColumnSorting={true}
              itemsPerPageOptions={[10, 25, 50]}
              language={"fr"}
            />
          )}
        </div>
        <div className={"buttonWrapper"}>
          <Button
            props={{
              style: "grey",
              text: "Retour",
              type: "button",
              onClick: (): void => navigate(-1),
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

const NouveauxCourriersWithAuth: (props: object) => ReactElement | null =
  withAuth(NouveauxCourriers);
export default NouveauxCourriersWithAuth;
