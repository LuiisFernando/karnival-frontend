import axios from 'axios';
import { setupInterceptorsTo } from './interceptors';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API
});

setupInterceptorsTo(api, null);

export default api;