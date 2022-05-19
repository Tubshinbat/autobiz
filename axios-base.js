import axios from "axios";

const instance = axios.create({
  baseURL: "https://rest.queenbella.mn/api/v1/",
});

instance.defaults.withCredentials = true;

export default instance;
