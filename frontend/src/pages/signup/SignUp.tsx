import React, { FC } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Form, Input, Select, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { signup } from "../../store/user/user.actions";

import { ILanguageType, IUserType, RequestStatusesEnum } from "../../types/types";

import { PropsType as PagePropsType } from "../../types/page";
import { AppStateType } from "../../store";

import "./SignUp.css";
import Route from "../../constants/Route";

const { Option } = Select;

type MapStateToProps = {
    currentUser: IUserType | null
    languages: Array<ILanguageType>
    user: IUserType | null
    signupStatus: RequestStatusesEnum | null
    signUpErrorMessage: string | null
}

type MapDispatchToProps = {
    signup: (login: string, password: string, email: string, nativeLanguage: string) => void
}

type PropsType = PagePropsType & MapStateToProps & MapDispatchToProps;

type SignUpValuesType = {
    login: string
    email: string
    password: string
    nativeLanguage: string
}

const SignUp: FC<PropsType> = ({ languages, signup,
                                   user, signupStatus, signUpErrorMessage, currentUser }) => {
    const onSignup = ({ login, password, email, nativeLanguage }: SignUpValuesType): void => {
        signup(login, password, email, nativeLanguage);
    };

    if (currentUser) {
        return <Redirect to={Route.Dashboard} />
    }

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
                    rules={[{ required: true, message: 'Please input your Email!' }, { type: 'email', message: 'Incorrect email' }]}
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

                <Form.Item
                    name="nativeLanguage"
                    rules={[{ required: true, message: 'Please select your native language!' }]}
                >
                    <Select
                        showSearch
                        placeholder="Native language"
                        optionFilterProp="children"
                        allowClear={true}
                    >
                        {languages.map(l => (<Option key={l._id} value={l._id}>{l.name}</Option>))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        loading={signupStatus === RequestStatusesEnum.Pending}
                    >
                        Sign Up
                    </Button>
                    Or <Link to="/login">login now!</Link>
                </Form.Item>
                {signUpErrorMessage && <Alert message={signUpErrorMessage} type="error" />}
            </Form>
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToProps => {
    const { app, user } = state;

    return {
        currentUser: user.currentUser,
        languages: app.languages,
        user: user.currentUser,
        signupStatus: user.signupStatus,
        signUpErrorMessage: user.signUpErrorMessage,
    }
};

export default connect<MapStateToProps, MapDispatchToProps, PagePropsType, AppStateType>(
    mapStateToProps,
    { signup }
    )(SignUp);
