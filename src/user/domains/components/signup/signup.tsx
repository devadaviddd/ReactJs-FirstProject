import React, {ReactElement, useState} from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {SignupDto} from "../../dtos";
import {Email, Password, PhoneNumber, Username} from "../../models";
import {AuthSignupApiHandle} from "../../../../service";
import {Navigate} from "react-router-dom";


export const Signup: React.FC<any> = (props, context):ReactElement => {
  const [signupState, setSignup] = useState<boolean>(false);
  const [phoneNumberField, setPhoneNumberAble] = useState<boolean>(false);

  const onFinish = async (values: SignupDto) => {
    const signupSuccess = await AuthSignupApiHandle(values);
    if(signupSuccess) {
      setSignup(true);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      {signupState && <Navigate to={'/signin'}/>}
      <Form className={"h-screen flex flex-col items-center justify-center"}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
      >
        <Form.Item className={"w-1/3"}
                   label="Email"
                   name="email"
                   rules={[{ required: true, message: 'Please input your email!' },
                     {pattern: Email.emailRegex, message: 'Email is invalid'}]}
        >
          <Input id={'email'} />
        </Form.Item>

        <Form.Item className={"w-1/3"}
                   label="Password"
                   name="password"
                   rules={[{ required: true, message: 'Please input your password!' },
                     {pattern: Password.passwordRegex, message: 'Password is invalid'}]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item className={"w-1/3"}
                   label="Username"
                   name="username"
                   rules={[{ required: true, message: 'Please input your username!' },
                     {pattern: Username.usernameRegex, message: 'Username is invalid'}]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={'PhoneNumber: '} name="disabled" valuePropName="checked"  className={"w-1/3"}>
          <Checkbox className={"truncate "}
            checked={phoneNumberField}
            onChange={(e) => setPhoneNumberAble(e.target.checked)}></Checkbox>
        </Form.Item>

        {phoneNumberField &&
          <Form.Item className={"w-1/3"}
                     label="Phone Number"
                     name="phoneNumber"
                     rules={[{ required: true, message: 'Please input your phone number!' },
                       {pattern: PhoneNumber.phoneNumberRegex, message: 'Phone number is invalid'}]}
          >
            <Input />
          </Form.Item>
        }

        <div className={'flex flex-row w-1/3 justify-center'}>
          <Form.Item name="remember" valuePropName="checked" className={""}>
            <Checkbox className={"truncate "} >Remember me</Checkbox>
          </Form.Item>

          <Form.Item >
            <Button htmlType="submit" className={"bg-sky-500 hover:bg-sky-700 text-white"}>
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
