import axios, { AxiosInstance } from "axios";
import { parseCookies } from "nookies";

export function getApiClient(ctx?: any) {
  const api: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    responseType: "json",
  });

  api;

  const { token: token } = parseCookies(ctx);

  if (token) api.defaults.headers["Authorization"] = `bearer ${token}`;

  return api;
}
