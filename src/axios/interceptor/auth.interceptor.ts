import axios, {AxiosError} from "axios";
import {BACKEND_SERVER} from "../../config";
import {ApiErrorMapper} from "../../utils";

export const authInterceptor = axios.create({
  baseURL: BACKEND_SERVER,
  headers: {
    Accept: 'application/json'
  }
});

authInterceptor.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
})

authInterceptor.interceptors.response.use((config) => {
  return config;
}, (error: AxiosError) => {
  if(error.response) {
    return ApiErrorMapper.toErrorResponse(error.response);
  }
})