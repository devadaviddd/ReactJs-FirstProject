import axios, {AxiosResponse} from "axios";
import {AUTH_SIGNIN_URL} from "../config";
import {SigninDto} from "../user";
import {notificationToast} from "../utils";
import {authInterceptor} from "../axios";
import {BadRequestionException, NotFoundException} from "../exceptions";

export const AuthSigninApiHandle = async (dto: SigninDto) => {
  try {
    const response: AxiosResponse  = await authInterceptor.post(AUTH_SIGNIN_URL, {
      email: dto.email,
      password: dto.password,
    });
    const token = response.data.accessToken;
    localStorage.setItem('token', token);
    axios.defaults.headers.authorization = `Bearer ${token}`;
    return true;
  } catch (error) {
    if(error instanceof BadRequestionException) {
      notificationToast('danger', 'Password is incorrect');
    }
    if(error instanceof NotFoundException) {
      notificationToast('danger', 'Login failed');
    }
  }
};