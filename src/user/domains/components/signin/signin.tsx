import React, {ReactElement, useState} from "react";
import { Button, Checkbox, Form, Input } from 'antd';
import {SigninDto} from "../../dtos";
import {Email, Password} from "../../models";
import {AuthSigninApiHandle} from "../../../../service";
import {Navigate} from "react-router-dom";


export const Signin: React.FC<any> = (props, context):ReactElement => {
  const [signinState, setSignin] = useState<boolean>(false);

  const onFinish = async (values: SigninDto) => {
    console.log('Submit Form:', values);
    const signinSuccess = await AuthSigninApiHandle(values);
    if(signinSuccess) {
      setSignin(true);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      {signinState && <Navigate to={'/profile'}/>}
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
            rules={[
              { required: true, message: 'Please input your email!'  },
              { pattern: Email.emailRegex, message: 'Email is invalid'}
            ]}>
            <Input/>
          </Form.Item>

          <Form.Item className={"w-1/3"}
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { pattern: Password.passwordRegex, message: 'Password is invalid'}
              ]
            }>
            <Input.Password  />
          </Form.Item>
          <div className={'flex flex-row w-1/3 justify-center'}>
            <Form.Item name="remember" valuePropName="checked" className={""}>
              <Checkbox className={"truncate "}>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" className={"bg-sky-500 hover:bg-sky-700 text-white"}>
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
    </div>
  );

}
