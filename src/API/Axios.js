// import axios from "axios";
// import { baseURL } from "./Api";
// import Cookies from "universal-cookie";
// const cookie = new Cookies();
// const token = cookie.get("e-commerce");
// export const Axios = axios.create({
//   baseURL: baseURL,
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });
import axios from "axios";
import Cookies from "universal-cookie";
import { baseURL } from "./Api";

const Axios = axios.create({
  baseURL: baseURL,
});

// Interceptor
Axios.interceptors.request.use((config) => {
  const cookie = new Cookies();
  const token = cookie.get("e-commerce");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default Axios;
