import React, {useEffect} from 'react';
import {Button, Form, Input, Modal} from 'antd';
import {PhoneNumber, Username} from "../../../models";
import {UserInformation} from "../profile";
import {useAppSelector} from "../../../../../hooks";
import {RootState} from "../../../../../store";

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

export const FormProfileUpdate: React.FC<CollectionCreateFormProps> = ({
   open, onCreate, onCancel
}) => {
  const user: UserInformation = useAppSelector((state: RootState) => state.user);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      username: user.username,
      phoneNumber: user.phoneNumber
    })
  })

  return (
    <Modal
      open={open}
      title="Editing your basic Profile"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Return
        </Button>,
        <Button key="submit" onClick={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}>
          Submit
        </Button>
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please input your username!' },
            {pattern: Username.usernameRegex, message: 'Username is invalid'}]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[{ required: true, message: 'Please input your phone number!' },
            {pattern: PhoneNumber.phoneNumberRegex, message: 'Phone number is invalid'}]}>
          <Input/>
        </Form.Item>
        </Form>
    </Modal>
  );
};


