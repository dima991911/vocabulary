import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Alert, Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { login } from "../../store/user/user.actions";

import "./Login.css";

import { AppStateType } from "../../store";
import { PropsType as PagePropsType } from "../../types/page";
import { IUserType, RequestStatusesEnum } from "../../types/types";
import Route from "../../constants/Route";

type MapStateToPropsType = {
    currentUser: IUserType | null
    loginStatus: RequestStatusesEnum | null
    loginErrorMessage: string | null
}

type MapDispatchToProps = {
    login: (loginOrEmail: string, password: string) => void
}

type FromValuesType = {
    loginOrEmail: string
    password: string
}

type PropsType = PagePropsType & MapStateToPropsType & MapDispatchToProps;

const Login: React.FC<PropsType> = ({ loginErrorMessage, loginStatus, login, currentUser }) => {
    const onLogin = (values: FromValuesType): void => {
        login(values.loginOrEmail, values.password);
    };

    if (currentUser) {
        return <Redirect to={Route.Dashboard} />
    }

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
                    <a className="login-form-forgot" href="#">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        loading={loginStatus === RequestStatusesEnum.Pending}
                    >
                        Log in
                    </Button>
                    Or <Link to="/signup">register now!</Link>
                </Form.Item>
                {loginErrorMessage && <Alert message={loginErrorMessage} type="error" />}
            </Form>
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    const { user } = state;

    return {
        currentUser: user.currentUser,
        loginStatus: user.loginStatus,
        loginErrorMessage: user.loginErrorMessage
    }
}

export default connect<MapStateToPropsType, MapDispatchToProps, PagePropsType, AppStateType>(mapStateToProps, { login })(Login);
