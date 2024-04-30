import axios from "axios";
import { UserType } from "../types";
import toast from "react-hot-toast";

let baseURL: string;
if (import.meta.env.VITE_NODE_ENV === "development") {
  baseURL = import.meta.env.VITE_LOCAL_API_URL;
} else {
  baseURL = import.meta.env.VITE_API_URL;
}

const axiosInstance = () => {
  return axios.create({
    baseURL,
    withCredentials: true,
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
    const status = error.response.status ?? null;
    const user = localStorage.getItem("user-credentials");
    if (status === 401) {
      if (user) {
        localStorage.removeItem("user-credentials");
        window.location.href = "/login";
        toast.error("Your session has expired! Log in again");
        return;
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
