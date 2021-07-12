import axios, { AxiosRequestConfig } from "axios";
import batchInterceptor from "./interceptor";

const config: AxiosRequestConfig = {
  headers: {},
  baseURL: "https://europe-west1-quickstart-1573558070219.cloudfunctions.net",
};

const instance = axios.create(config);

batchInterceptor(instance);

export default instance;
