import React, { FC } from "react";
import { useLocation } from 'react-router-dom'
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { LoginOutlined, UserOutlined } from "@ant-design/icons";

import './Header.css';

export const HeaderMenuComponent: FC = () => {
    const location = useLocation<Location>();

    return (
        <Menu
            mode="horizontal"
            className="top-menu"
            defaultSelectedKeys={['/']}
            selectedKeys={[location.pathname]}
        >
            <Menu.Item key="/login" icon={<LoginOutlined />}>
                <Link to="/login">
                    Login
                </Link>
            </Menu.Item>
            <Menu.Item key="/signup" icon={<UserOutlined />}>
                <Link to="signup">
                    Sign up
                </Link>
            </Menu.Item>
        </Menu>
    )
}
