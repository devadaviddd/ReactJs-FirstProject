import {AxiosResponse} from "axios";
import {AUTH_SIGNUP_URL} from "../config";
import {SignupDto} from "../user";
import {notificationToast} from "../utils";
import {authInterceptor} from "../axios";
import {BadRequestionException} from "../exceptions";

export const AuthSignupApiHandle = async (dto: SignupDto) => {
  try {
    const response: AxiosResponse  = await authInterceptor.post(AUTH_SIGNUP_URL, {
      email: dto.email,
      password: dto.password,
      username: dto.username,
      phoneNumber: dto.phoneNumber
    });

    notificationToast('success', 'Create Account Successfully!');
    return true;

  } catch (error) {
    if(error instanceof BadRequestionException) {
      notificationToast('danger', 'Email is already existed');
    }
  }
};