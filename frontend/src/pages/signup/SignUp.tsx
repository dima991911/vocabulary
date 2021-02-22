import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./SignUp.css";

import { PropsType } from "../../types/page";

type SignUpValuesType = {
    login: string
    email: string
    password: string
}

export const SignUp: FC<PropsType> = () => {
    const onSignup = (values: SignUpValuesType): void => {
        console.log(values);
    };

    return (
        <div className="centered-flex full-height">
            <Form
                name="signup-form"
                className="signup-form"
                initialValues={{ remember: true }}
                onFinish={onSignup}
            >
                <Form.Item
                    name="login"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
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
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Sign Up
                    </Button>
                    Or <Link to="/login">login now!</Link>
                </Form.Item>
            </Form>
        </div>
    )
}
