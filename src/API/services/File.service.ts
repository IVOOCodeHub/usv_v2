// types
import axios, { AxiosResponse } from "axios";

export const getAllFilesNameService: () => Promise<string[]> = async (): Promise<
  string[]
> => {
  const getAllFilesNameEndpoint: string = "http://192.168.0.112:8800/api/files";
  const res: AxiosResponse = await axios.get(getAllFilesNameEndpoint);
  return res.data;
};

export const getFileService= async (fileName: string) => {
  return `http://192.168.0.112:8800/api/files/${fileName}`
}
