// types
import { AxiosResponse } from "axios";

// utils
import { isOnProduction } from "../utils/scripts/utils.ts";

// libraries
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.timeout = 10000;
axios.defaults.baseURL = isOnProduction
  ? "http://192.168.0.112:8800/api"
  : "http://192.168.0.112/Public/usv--v2/php";

export const getRequest: (url: string) => Promise<AxiosResponse> = async (
  url: string,
): Promise<AxiosResponse> => {
  return await axios.get(url);
};

export const postRequest: <T, R>(
  url: string,
  data: T,
) => Promise<AxiosResponse<R>> = async <T, R>(
  url: string,
  data: T,
): Promise<AxiosResponse<R>> => {
  return await axios.post<R>(url, data);
};
