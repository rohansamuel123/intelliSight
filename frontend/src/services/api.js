import axios from "axios";

const API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "http://172.17.9.192:8000",
});

export default API;
