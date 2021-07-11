import axios from "axios";
import batchInterceptor from "./interceptor";

const config = {
  headers: {},
  host: "https://europe-west1-quickstart-1573558070219.cloudfunctons.net",
  baseAPI: "https://europe-west1-quickstart-1573558070219.cloudfunctions.net",
};

const instance = axios.create(config);

batchInterceptor(instance);

export default instance;
