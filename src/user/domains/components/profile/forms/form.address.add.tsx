import React from 'react';
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
}

export const FormAddressAdd: React.FC<CollectionCreateFormProps> = ({open, onCreate, onCancel}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Adding new Address"
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
      </Form>
    </Modal>
  );
};


