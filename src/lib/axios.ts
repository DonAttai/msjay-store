import axios from "axios";
import toast from "react-hot-toast";
import { useUserStore } from "../stores/user-store";

function getBaseURL() {
  const NODE_ENV = import.meta.env.VITE_NODE_ENV;
  if (NODE_ENV === "development") {
    return import.meta.env.VITE_LOCAL_API_URL;
  }
  return import.meta.env.VITE_API_UR;
}

const baseURL = getBaseURL();

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// get user and setCredentials from user-store
const user = useUserStore.getState().user;
const setCredentials = useUserStore.getState().actions.setCredentials;

// request interceptor
axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response.status ?? null;
    const errorMessage = error.response?.data?.message;
    if (status === 401 && errorMessage === "Invalid Access Token") {
      if (user) {
        setCredentials(null);
        window.location.href = "/auth/login";
        toast.error("Your session has expired! Log in again");
        return;
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
