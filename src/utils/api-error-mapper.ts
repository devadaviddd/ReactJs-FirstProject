import {
  NotFoundException,
  UnknownException,
  BadRequestionException,
  UnAuthenticated,
  UnAuthorized
} from '../exceptions';
import {AxiosResponse} from "axios";

export class ApiErrorMapper {
  public static toErrorResponse(error: AxiosResponse) {
    if (error.status === 500) {
      throw new UnknownException('Unknown exception');
    }
    if (error.status === 401) {
      throw new UnAuthenticated();
    }
    if (error.status === 403) {
      throw new UnAuthorized();
    }
    if (error.status === 400) {
      throw new BadRequestionException();
    }
    if (error.status === 404) {
      throw new NotFoundException();
    }

  }
}
