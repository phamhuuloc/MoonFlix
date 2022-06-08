import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: "https://sever-json-netflix.herokuapp.com",
  // baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use((config) => {
  // Handle token here ...
  let accessToken = window.localStorage.getItem("token");
  if (accessToken) {
    config.headers.token = `Bearer ${accessToken}`;
  }

  return config;
});

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
