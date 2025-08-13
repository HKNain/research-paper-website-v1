import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // lets cookies/JWT from backend flow automatically
});

export default API;
