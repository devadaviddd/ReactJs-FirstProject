import {UpdateUserInformationDto} from "../user";
import {authInterceptor, getAuthHeader} from "../axios";
import {USER_UPDATE_PROFILE_URL} from "../config";
import {notificationToast} from "../utils";

export const UserUpdateBasicInformationApiHandle = async (dto: UpdateUserInformationDto) => {
  try {
    const response: any = await authInterceptor.patch(USER_UPDATE_PROFILE_URL, {
      username: dto.username,
      phoneNumber: dto.phoneNumber,
      id: dto.id
    }, getAuthHeader());
    notificationToast('success', 'Successfully Update');

  } catch (error) {
    notificationToast('danger', 'Something went wrong!');
  }
};