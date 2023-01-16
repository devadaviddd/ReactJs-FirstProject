import React, {ReactElement, useEffect, useState} from "react";
import {Button, Space, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {UserDeleteAddressApi} from "../../../../../service";
import {useAppDispatch, useAppSelector} from "../../../../../hooks";
import {getAddresses, getProfile, RootState} from "../../../../../store";
import {UserInformation} from "../profile";
import {getAuthHeader} from "../../../../../axios";
import {FormAddressUpdate} from "../forms";
import {UserUpdateAddressApiHandle} from "../../../../../service";

export const ProfileAddressTable: React.FC<any> = (props, context): ReactElement => {
  const dispatch = useAppDispatch();
  const user: UserInformation = useAppSelector((state: RootState) => state.user);
  const [onDeleteState, setOnDeleteState] = useState(false);
  const [open, setOpen] = useState(false);
  const [addressIdState, setAddressId] = useState<string>('');

  // should check falsy user
  useEffect(() => {
    dispatch(getProfile(getAuthHeader()));
    dispatch(getAddresses(getAuthHeader()));
  }, [dispatch, onDeleteState, open]);

  interface AddressInformation {
    key: string
    street: string;
    city: string;
    country: string;
  }

  const onDelete = async (event: any, key: string) => {
    await UserDeleteAddressApi(key);
    setOnDeleteState((): boolean => { return !onDeleteState});
  }

  const onUpdate = async (values: any) => {
    console.log('Received values of form: ', values);
    await UserUpdateAddressApiHandle(values);
    setOpen(false);
  };

  const columns: ColumnsType<AddressInformation> = [
    {
      title: 'Street',
      dataIndex: 'street',
      key: 'street',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Action',
      key: 'action',
      render: (value, record, index) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setOpen(true);
              setAddressId(record.key);
            }}>Edit
          </Button>
          <Button
            onClick={(event) => {
              onDelete(event, record.key)
            }}>Delete
          </Button>
        </Space>
      ),
    },
  ];
  const data: AddressInformation[] = [];



  const generateUniqueKey = () => {
    user.addresses?.map((address) => {
      let dataItem: AddressInformation = {
        key: address.id,
        street: address.street,
        city: address.city,
        country: address.country
      }
      data.push(dataItem);
      return data;
    })
  }

  generateUniqueKey();

  return (
    <div>
      {user.addresses &&  <Table columns={columns} dataSource={data}/>}
      <FormAddressUpdate addressId={addressIdState} open={open} onCreate={onUpdate} onCancel={() => {
        setOpen(false)
      }}/>
    </div>
  )
}