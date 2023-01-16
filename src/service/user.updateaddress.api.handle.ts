import {authInterceptor, getAuthHeader} from "../axios";
import {USER_UPDATE_ADDRESS_URL} from "../config";
import {notificationToast} from "../utils";
import {UpdateAddressDto} from "../user";

export const UserUpdateAddressApiHandle = async (dto: UpdateAddressDto) => {
  try {
    const response: any = await authInterceptor.put(`${USER_UPDATE_ADDRESS_URL}${dto.id}`, {
      street: dto.street,
      city: dto.city,
      country: dto.country
    }, getAuthHeader());
    notificationToast('success', 'Successfully Update');

  } catch (error) {
    notificationToast('danger', 'Something went wrong!');
  }
};