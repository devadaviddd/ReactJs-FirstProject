import {AddAddressDto} from "../user";
import {authInterceptor, getAuthHeader} from "../axios";
import {USER_ADD_ADDRESS_URL} from "../config";
import {notificationToast} from "../utils";

export const UserAddaddressApiHandle = async (dto: AddAddressDto) => {
  try {
    const response: any = await authInterceptor.post(USER_ADD_ADDRESS_URL, {
      street: dto.street,
      city: dto.city,
      country: dto.country
    }, getAuthHeader());
    notificationToast('success', 'Successfully Add Address');
  } catch (error) {
    notificationToast('danger', 'Something went wrong!');
  }
};