// hooks | libraries
import { Context, createContext, Dispatch, SetStateAction } from "react";

interface IFileContext {
  files: string[] | null;
  setFiles: Dispatch<SetStateAction<string[]>>;
  getFiles: () => Promise<void>;
  fileURL: string | null;
  setFileURL: Dispatch<SetStateAction<string | null>>;
  getFileURL: (fileName: string) => Promise<void>;
}

const defaultFileContext: IFileContext = {
  files: null,
  setFiles: (): Dispatch<SetStateAction<string[]>> =>
    ({}) as Dispatch<SetStateAction<string[]>>,
  getFiles: async (): Promise<void> => {},
  fileURL: null,
  setFileURL: (): Dispatch<SetStateAction<string | null>> =>
    ({}) as Dispatch<SetStateAction<string | null>>,
  getFileURL: async (): Promise<void> => {},
};

export const FileContext: Context<IFileContext> =
  createContext<IFileContext>(defaultFileContext);
