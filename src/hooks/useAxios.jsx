import axios from "axios";

const axiosInstance = axios.create({
  // https://artify-api-amber.vercel.app/
  baseURL: "https://artify-api-amber.vercel.app/",
  // http://localhost:5000/
});
export const useAxios = () => {
  return axiosInstance;
};
