// lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api", // ganti sesuai API kamu
  withCredentials: true, // <--- INI YANG PENTING BANGET
});

export default api;
