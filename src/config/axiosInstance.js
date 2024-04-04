import axios from "axios";
import { clearStorage, getBusinessProfile, getItem, getToken } from "../utils/localStorage";
import { PINNTAG_USER } from "./routes/RoleProtectedRoute";

const API_URL = process.env.REACT_APP_API_URL ?? "https://api.pinntag.com/v1";
//http://74.208.62.59:8080/v1 
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to add the JWT token to the headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getItem(PINNTAG_USER)?.token;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle authentication errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let retry = true;
    if (error.response && error.response.status === 401 && retry) {
      retry = false;
      clearStorage();
    }
    return Promise.reject(error);
  }
);

// TEMPORARY INSTANCE

const axiosTempInstance = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to add the JWT token to the headers
axiosTempInstance.interceptors.request.use(
  (config) => {
    const token = getItem(PINNTAG_USER)?.token;
    const userToken = getToken() ?? 'INVALID_TOKEN';

    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle authentication errors
axiosTempInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let retry = true;
    if (error.response && error.response.status === 401 && retry) {
      retry = false;
      clearStorage();
    }
    return Promise.reject(error);
  }
);

export { axiosInstance, axiosTempInstance };
