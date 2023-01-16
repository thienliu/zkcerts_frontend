import axios from "axios";
import { API_BASE_URL } from "@/constants/common";
import { getLocalAccessToken } from "@/services/localstorage/token";
/**
 * Create main axios instance
 */
const mainHTTP = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

mainHTTP.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token && config.headers) {
      config.headers["Authorization"] = "Bearer " + token; // for Spring Boot back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

mainHTTP.interceptors.response.use(
  (response) => {
    // Return JSON data
    if (response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    const err = (error.response && error.response.data) || error;

    if (error.response && error.response.status) {
      error.status = error.response.status;
      err.status = error.response.status;
    }

    return Promise.reject(err);
  }
);

export default mainHTTP;

/**
 * Create custom axios instance
 * @param baseURL Base URL to use in axios
 */
export const createHTTP = (baseURL: string) =>
  axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });
