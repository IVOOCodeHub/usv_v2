// hooks | libraries
import { useState, useMemo, ReactElement } from "react";

// context
import { FileContext } from "./FileContext.tsx";

// services
import { getFileService } from "../../API/services/File.service.ts";

export const FileProvider = ({ children }): ReactElement => {
  const [files, setFiles] = useState([]);

  const getFiles = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const res = await getFileService();
      setFiles(res);
    } catch (error) {
      console.error("Error while getting file :", error);
      setFiles(null);
    }
  };

  const contextValue = useMemo(
    () => ({
      files,
      setFiles,
      getFiles,
    }),
    [files],
  );

  return (
    <FileContext.Provider value={contextValue}>{children}</FileContext.Provider>
  );
};
