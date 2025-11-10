import axios from "axios";

const axiosInstance = axios.create({
  // https://artify-api-amber.vercel.app/
  baseURL: "http://localhost:5000/",
  // http://localhost:5000/
});
export const useAxios = () => {
  return axiosInstance;
};
