import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.29.251:8000",
});

export default API;
