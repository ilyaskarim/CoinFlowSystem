import axiosInstance from "axios";

export const axios = axiosInstance.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
