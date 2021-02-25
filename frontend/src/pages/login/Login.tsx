import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./Login.css";

import { PropsType } from "../../types/page";

type FromValuesType = {
    loginOrEmail: string
    password: string
}

const Login: React.FC<PropsType> = () => {
    const onLogin = (values: FromValuesType): void => {
        console.log(values);
    };

    return (
        <div className="centered-flex full-height">
            <Form
                name="login-form"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onLogin}
            >
                <Form.Item
                    name="loginOrEmail"
                    rules={[{ required: true, message: 'Please input your Username or Email!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username or Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <Link to="/signup">register now!</Link>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login;
