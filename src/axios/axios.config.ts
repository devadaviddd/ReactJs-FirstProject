import axios from "axios";
import {BadRequestionException, NotFoundException, UnAuthorized, UnknownException} from "../exceptions";
import {BACKEND_SERVER, getAccessToken} from "../config";

export const axiosApiInstance = axios.create({
  baseURL: BACKEND_SERVER,
  headers: {
    Accept: 'application/json'
  }
});

export const getAuthHeader = () => {
  return {
    headers: {authorization: 'Bearer ' + getAccessToken()}
  }
}

axiosApiInstance.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
})

axiosApiInstance.interceptors.response.use((config) => {
  return config;
}, (error) => {
  const response = error.response;
  if(response.status === 404) {
    throw new NotFoundException('User not existed!');
  }
  if(response.status === 500) {
    throw new UnknownException('UnKnown Exception');
  }
  if(response.status === 403) {
    throw new UnAuthorized('Access is denied due to invalid credentials')
  }
  if(error.response.status === 400) {
    throw new BadRequestionException('Bad request');
  }
  return Promise.reject(response.status);
})







