import axios from "axios";

const instance = axios.create({
  baseURL: "https://beta.queenbella.mn/rest/api/v1/",
});

instance.defaults.withCredentials = true;

export default instance;
