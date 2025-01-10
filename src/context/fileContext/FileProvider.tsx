// hooks | libraries
import { useState, useMemo, ReactElement, useContext } from "react";

// context
import { FileContext } from "./FileContext.tsx";
import { LoaderContext } from "../loaderContext";

// services
import {
  getAllFilesNameService,
  getFileService,
} from "../../API/services/File.service.ts";

export const FileProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const { startLoading, stopLoading } = useContext(LoaderContext);
  const [files, setFiles] = useState<string[]>([]);
  const [fileURL, setFileURL] = useState<string | null>(null);

  const getFiles = async (): Promise<void> => {
    startLoading();
    await new Promise((resolve: (value: unknown) => void): number =>
      setTimeout(resolve, 500),
    );

    try {
      const res: string[] = await getAllFilesNameService();
      setFiles(res);
    } catch (error) {
      console.error("Error while getting files list :", error);
      setFiles([]);
    }
    stopLoading();
  };

  const getFileURL = async (fileName: string): Promise<void> => {
    await new Promise((resolve: (value: unknown) => void): number =>
      setTimeout(resolve, 500),
    );

    try {
      const res: string = await getFileService(fileName);
      setFileURL(res);
    } catch (error) {
      console.error(`Error while getting file: ${error}`);
      setFileURL(null);
    }
  };

  const contextValue = useMemo(
    () => ({
      files,
      setFiles,
      getFiles,
      fileURL,
      setFileURL,
      getFileURL,
    }),
    [files, fileURL],
  );

  return (
    <FileContext.Provider value={contextValue}>{children}</FileContext.Provider>
  );
};
