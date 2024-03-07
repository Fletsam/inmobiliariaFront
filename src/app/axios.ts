import Axios from "axios";
import Router from "next/router";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const axios = Axios.create({
  baseURL: API_URL,
  headers: {
    'Access-Control-Allow-Origin': "*",
    "Content-Type": "application/json",
  },
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      Router.push("/auth/login");
    }
    return Promise.reject(error);
  },
);