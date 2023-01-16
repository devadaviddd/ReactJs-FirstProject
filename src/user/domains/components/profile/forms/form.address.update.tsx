import React, {useEffect} from 'react';
import {Button, Form, Input, Modal} from 'antd';

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  addressId: string,
}

export const FormAddressUpdate: React.FC<CollectionCreateFormProps> = ({ addressId, open, onCreate, onCancel}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      id: addressId
    })
  })

  return (
    <Modal
      open={open}
      title="Editing your Address Information"
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
          name="street"
          label="Street"
          rules={[{ required: true, message: 'Please input street name!' },
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="city"
          label="City"
          rules={[{ required: true, message: 'Please input city name!' },
          ]}>
          <Input/>
        </Form.Item>
        <Form.Item
          name="country"
          label="Country"
          rules={[{ required: true, message: 'Please input country name!' },
          ]}>
          <Input/>
        </Form.Item>
        <Form.Item name="id" label={"Id"} style={{ display: 'none' }}></Form.Item>
      </Form>
    </Modal>
  );
};


