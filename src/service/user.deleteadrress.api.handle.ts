import {authInterceptor, getAuthHeader} from "../axios";
import {USER_DELETE_ADDRESS_URL} from "../config";
import {notificationToast} from "../utils";

export const UserDeleteAddressApi = async (addressId: string) => {
  try {
    const response: any  = await authInterceptor.delete(
      `${USER_DELETE_ADDRESS_URL}${addressId}`, getAuthHeader());
    notificationToast('success', 'Successfully Delete');

  } catch (error) {
    notificationToast('danger', 'Something went wrong!');
  }
};