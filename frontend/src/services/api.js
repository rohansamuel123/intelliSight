import axios from "axios";

const API = axios.create({
  // Fallback directly to the IP address shown in your Expo terminal logs
  baseURL: process.env.EXPO_PUBLIC_API_URL || "http://192.168.1.12:8000",
});

export default API;
