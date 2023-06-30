
import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import { parseCookies } from "nookies";

let ctx: any;

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const { ['karnival.token']: token } = parseCookies(ctx);

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        config.headers['Accept'] = 'application/json';
        config.headers['Content-Type'] = 'application/json';
    }

    return config;
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
    console.info(`[response] [${JSON.stringify(response)}]`);
    return response;
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    console.error(`[response error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance, _ctx: any): AxiosInstance {
    ctx = _ctx;
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
}