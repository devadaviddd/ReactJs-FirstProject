import React, {ReactElement, useEffect, useState} from "react"
import {Button, Card, Descriptions, Space, Divider} from 'antd';
import {
  getAddresses,
  getProfile,
  RootState,
} from "../../../../store";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {Navigate} from "react-router-dom";
import {ProfileAddressTable} from "./address_table";
import 'antd/dist/reset.css';
import {FormProfileUpdate} from "./forms";
import {UserUpdateBasicInformationApiHandle} from "../../../../service";
import {AddAddressDto, UpdateUserInformationDto} from "../../dtos";
import {getAccessToken} from "../../../../config";
import {getAuthHeader} from "../../../../axios";
import {FormAddressAdd} from "./forms";
import {UserAddaddressApiHandle} from "../../../../service";

export interface UserInformation {
  username: string,
  email: string,
  phoneNumber: string
  addresses?: [{
    id: string
    street: string,
    city: string,
    country: string
  }],
}


export const Profile: React.FC<any> = (): ReactElement => {
  const token: string | null = getAccessToken();
  const dispatch = useAppDispatch();
  const user: UserInformation = useAppSelector((state: RootState) => state.user);
  const [openProfileUpdate, setOpenProfile] = useState(false);
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const [updateProfileState, setUpdateProfileState] = useState<UpdateUserInformationDto>(
    {
      username: user.username,
      phoneNumber: user.phoneNumber
    }
  );

  useEffect(() => {
    dispatch(getProfile(getAuthHeader()));
    dispatch(getAddresses(getAuthHeader()));
  }, [dispatch, updateProfileState,openAddAddress ]);



  const onProfileUpdate = async (values: any) => {
    await UserUpdateBasicInformationApiHandle(values as UpdateUserInformationDto);
    setUpdateProfileState(values);
    setOpenProfile(false);
  };

  const onAddressCreate = async (values: any) => {
    await UserAddaddressApiHandle(values as AddAddressDto);
    setOpenAddAddress(false);
  };

  const renderUserInformation = () => {
    if(token) {
      return (
        <div>
          <Descriptions title= 'User Info'>
            <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
            <Descriptions.Item label="Phone number">{user.phoneNumber}</Descriptions.Item>
          </Descriptions>

          <Space>
            <Button
              onClick={() => {
                setOpenProfile(true);
              }}
            >
              Edit Basic Profile
            </Button>

            <Button
              onClick={() => {
                setOpenAddAddress(true);
              }}
            >
              Add New Address
            </Button>


          </Space>

          <FormProfileUpdate open={openProfileUpdate} onCreate={onProfileUpdate} onCancel={() => {
            setOpenProfile(false)
          }}/>

          <FormAddressAdd open={openAddAddress} onCreate={onAddressCreate} onCancel={() => {
            setOpenAddAddress(false)}}/>


          <Divider />
          <ProfileAddressTable/>
        </div>
      )
    }
    return <Navigate to={'/'}/>
  }
  return (
    <Card>
      {renderUserInformation()}
    </Card>
  );
}