import { Form, Input, Button, Checkbox } from 'antd';
import styles from "./RegisterForm.module.css";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export const RegisterForm = () => {
  const history = useHistory();
  // const onFinish = async(values: any) => {
  //   console.log('Success:', values);
  //   try {
  //     await axios.post("http://123.56.149.216:8089/auth/register", {
  //       emil: values.username,
  //       password: values.password,
  //       confirmPassword: values.confirm,
  //     });
  //     history.push("/signIn/");
  //   } catch (error) {
  //     alert("註冊失敗！");
  //   }
  // };

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    try {
      await axios.post("http://123.56.149.216:8089/auth/register", {
        email: values.username,
        password: values.password,
        confirmPassword: values.confirm,
      });
      history.push("/signIn/");
    } catch (error) {
      alert("注册失败！");
    }
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

      <Form.Item
        label="Confirm Password"
        name="confirm"
        hasFeedback
        rules={[
          { required: true, message: 'Please confirm your password!' },
          (({getFieldValue})=>({
              validator(_,value){
                if(!value || getFieldValue("password")=== value){
                  return Promise.resolve("")
                }
                return Promise.reject("密碼不一致")
              }
          }))
      ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};