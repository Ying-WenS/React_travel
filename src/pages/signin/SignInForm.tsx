import { Form, Input, Button, Checkbox } from 'antd';
import styles from "./SignInForm.module.css";
import { useSelector } from '../../redux/hook';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { userSlice, signIn } from "../../redux/user/slice";
import { useEffect } from 'react';

export const SignInForm = () => {

  const jwt = useSelector(s => s.user.token);
  const loading = useSelector(s=> s.user.loading);
  const error = useSelector(s=> s.user.error);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(()=>{
    if(jwt !== null){
      history.push("/");
    }
  },[jwt])

  const onFinish = (values: any) => {
    console.log('Success:', values);
    dispatch(signIn({
      email: values.username,
      password: values.password
    }))
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form className={styles["register-form"]}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading} >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};