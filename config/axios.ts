import instance, { type AxiosRequestHeaders } from "axios";
import Cookies from "js-cookie";

const axios = instance.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers = config.headers || ({} as AxiosRequestHeaders);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
