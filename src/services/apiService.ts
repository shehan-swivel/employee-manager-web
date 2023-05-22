import axios from "axios";

const apiService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY,
  },
});

export default apiService;
