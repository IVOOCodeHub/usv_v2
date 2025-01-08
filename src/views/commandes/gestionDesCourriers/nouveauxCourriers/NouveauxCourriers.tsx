// styles
import "./nouveauxCourriers.scss";

// hooks | libraries
import { ReactElement, useContext, useState, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

// components
import withAuth from "../../../auth/WithAuth.tsx";
import NRTL from "../../../../components/NRTL/NRTL.tsx";
import Header from "../../../../components/header/Header";
import Footer from "../../../../components/footer/Footer";
import Button from "../../../../components/button/Button";
import Loader from "../../../../components/loader/Loader.tsx";
import DisplayCourrierModal from "../../../../components/displayCourrierModal/DisplayCourrierModal";

// context
import { LoaderContext } from "../../../../context/loaderContext.tsx";
import { FileContext } from "../../../../context/fileContext/FileContext.tsx";

function NouveauxCourriers(): ReactElement {
  const navigate: NavigateFunction = useNavigate();
  const { isLoading, startLoading, stopLoading } = useContext(LoaderContext);
  const { files, getFiles } = useContext(FileContext);
  const [bodyArray, setBodyArray] = useState<string[][]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [courrier, setCourrier] = useState<string>("");

  const getFileDate = (file: string): string => {
    let datePart: string = "";

    const match1: RegExpMatchArray | null = file.match(/^(\d{8})-/);
    const match2: RegExpMatchArray | null = file.match(/_(\d{8})_/);

    if (match1) {
      datePart = match1[1];
    } else if (match2) {
      datePart = match2[1];
    }

    if (datePart) {
      const year: string = datePart.substring(0, 4);
      const month: string = datePart.substring(4, 6);
      const day: string = datePart.substring(6, 8);
      return `${day}/${month}/${year}`;
    } else {
      return "";
    }
  };

  const convertToArray: (datas: string[]) => string[][] = (
    datas: string[],
  ): string[][] => {
    return datas.map((data: string): string[] => [data, getFileDate(data)]);
  };

  const tableData = {
    tableHead: ["Fichier", "Date"],
    tableBody: bodyArray,
  };

  useEffect((): void => {
    startLoading();
    getFiles().finally();
  }, []);

  useEffect((): void => {
    if (Array.isArray(files)) {
      const sortedFiles: string[] = [...files].sort(
        (a: string, b: string): number => {
          const dateA: string = a.split("-")[0];
          const dateB: string = b.split("-")[0];
          return dateB.localeCompare(dateA);
        },
      );
      setBodyArray(convertToArray(sortedFiles));
    }
    stopLoading();
  }, [getFiles, files]);

  const displayCourrier = (index: number, fileName: string): void => {
    setCourrier(fileName);
    setIsModalOpen(true);
    console.log(`Row ${index} clicked`)
  };

  return (
    <>
      <Header
        props={{
          pageURL: "G_IVOO | Gestion des courriers | Nouveaux courriers",
        }}
      />
      <main id={"nouveauxCourriers"}>
        {isModalOpen && (
          <div className={"modalContainer"}>
            <DisplayCourrierModal
              props={{
                selectedCourrier: courrier,
                isModalOpen,
                setIsModalOpen: setIsModalOpen,
              }}
            />
          </div>
        )}
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
              onRowClick={(index: number, rowData?: string[]): void => displayCourrier(index, rowData![0])}
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
