import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.balldontlie.io/epl/v1",
  headers: {
    Authorization: `${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = process.env.NEXT_PUBLIC_API_TOKEN;
    if (!token) {
      throw new Error("Authorization token is missing");
    }
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
