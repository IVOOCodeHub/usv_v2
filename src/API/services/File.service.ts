// types
import axios, { AxiosResponse } from "axios";

// API
// import { getRequest } from "../APICalls";

export const getFileService = async () => {
  // const endpoint: string = '/files';
  // const res: AxiosResponse = await getRequest(endpoint)

  // const endpoint: string = "http://192.168.0.112:8800/api/files";
  const endpoint: string = `http://localhost:5173/api/files`
  const res: AxiosResponse = await axios.get(endpoint);
  console.log("file res =>", res);
};
