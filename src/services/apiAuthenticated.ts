import axios, { InternalAxiosRequestConfig } from "axios";
import { NextPageContext } from "next";
import { parseCookies } from "nookies";

export function getApiAuthenticated(ctx: NextPageContext) {
  const apiAuth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  });

  const onRequest = (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig => {
    const { ["karnival.token"]: token } = parseCookies(ctx);
    if (token) {
      console.log(token);
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Accept"] = "application/json";
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  };

  apiAuth.interceptors.request.use(onRequest);

  return apiAuth;
}
