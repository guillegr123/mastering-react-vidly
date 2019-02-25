import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";
import auth from "./authService";

axios.defaults.headers.common["x-auth-token"] = auth.getJwt(); // If the value is undefined, the header won't be set

axios.interceptors.response.use(null /* Success callback*/, error => {
  console.log("INTERCEPTOR CALLED");

  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occurred."); // toast is a function, so the message can be passed directly: toast("An unexpected error occurred.")
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
