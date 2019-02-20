import axios from "axios";
import config from "../config.json";
import logger from "./logService";

var axiosInstance = axios.create({
  baseURL: config.apiEndpoint
});

axiosInstance.interceptors.response.use(null /* Success callback*/, error => {
  console.log("INTERCEPTOR CALLED");

  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
  }

  return Promise.reject(error);
});

export default {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete
};
