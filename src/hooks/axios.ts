import axios from "axios";
import { UserType } from "../types";

let API: string;
if (import.meta.env.VITE_NODE_ENV === "development") {
  API = import.meta.env.VITE_LOCAL_API_URL;
} else {
  API = import.meta.env.VITE_API_URL;
}

const axiosInstance = () => {
  return axios.create({
    baseURL: API,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

axiosInstance().interceptors.request.use(
  (config) => {
    const user: UserType = JSON.parse(
      localStorage.getItem("user-credentials") as string
    );
    if (user && user.accessToken) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance().interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("user-credentials");
      window.location.reload();
      return;
    }
  }
);
export default axiosInstance;
