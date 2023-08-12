import React, { useContext, useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { login } from '../../service/loginService';
import { AppContext } from '../../context/AppContext'
import { Alert, Space } from 'antd';
import jwt from 'jwt-decode'


const Login = () => {
  const { setRole,setLoggedIn } = useContext(AppContext);
  const { user,setUser } = useContext(AppContext);
  const [errores, setErrores] = useState(false);

  const onFinish = (values) => {
    const credentials = {
      email: values.username,
      password: values.password

    }
    fetch('http://localhost:8081/api/v1/auth/authenticate'
      , {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          //'authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IkFETUlOIiwic3ViIjoiZGFnYXJheTFAbWFpbC5jb20iLCJpYXQiOjE2OTE4MTcyMDIsImV4cCI6MTY5MTgxODY0Mn0.8-CIoeRBQKMWhg6nyDkVPm0RP5QaaajOjShcn4_4Cxc',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
      }
    ).then(response => {
      if (!response.ok) {
        throw new Error("Error")
      }
      return response.json();
    }).then(data => {
      document.cookie = `token=${data.token};max-age=${60 * 60 * 3}; path=/; samesite=strict`
      setRole(jwt(data.token).roles);
      setUser(jwt(data.token).sub);
      setLoggedIn(true);

    }
    ).catch(error => {

      setErrores(true);
    })


  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Space direction="vertical" style={{ width: '100%' }}>
        {errores && (

          <Alert
            message="Error"
            description="Error de usuario."
            type="error"
            showIcon
          />

        )}

      </Space>
    </>
  );
}
export default Login;