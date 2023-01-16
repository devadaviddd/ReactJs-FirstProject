import { v4 as uuid } from 'uuid';
import {Address} from "./Address";
import {isStringEmptyOrUndefined} from "../../../utils";
import {BadRequestionException} from "../../../exceptions";

export interface UserProps {
  email: string | null | undefined;
  password: string | null | undefined;
  username: string | null | undefined;
  id?: string;
  phoneNumber?: string;
  addresses?: Address[] ;
}
export class User {
  public get email() {
    return this.props.email;
  }
  public get username() {
    return this.props.username;
  }
  public get id() {
    return this.props.id;
  }

  constructor(private readonly props: UserProps) {
    if (!props)
      throw new BadRequestionException('Props of user is null/undefined');

    const { email, password, username, phoneNumber, id, addresses } = props;
    if (isStringEmptyOrUndefined(email)) {
      throw new BadRequestionException('Email is null/undefined');
    }

    if (isStringEmptyOrUndefined(password)) {
      throw new BadRequestionException('Password is null/undefined');
    }
    if (isStringEmptyOrUndefined(username)) {
      throw new BadRequestionException('Username is null/undefined');
    }
    if (!phoneNumber) {
      this.props.phoneNumber = '';
    }
    if (!id) {
      this.props.id = uuid();
    }
    if (!addresses) {
      this.props.addresses = [];
    }
  }
}
