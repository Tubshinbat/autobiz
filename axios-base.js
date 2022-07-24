import axios from "axios";

const instance = axios.create({
  baseURL: "https://autobiz.mn/api/",
  // baseURL: "http://localhost:8022/api/v1/",
});

instance.defaults.withCredentials = true;

export default instance;
