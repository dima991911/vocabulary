import React, { FC } from "react";
import { connect } from "react-redux";
import { useLocation, useHistory } from 'react-router-dom'
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { LoginOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";

import './Header.css';

import { logout } from "../../store/user/user.actions";
import Route from "../../constants/Route";

import { IUserType } from "../../types/types";
import { AppStateType } from "../../store";

type MapStateToProps = {
    currentUser: IUserType | null
}

type MapDispatchToProps = {
    logout: () => void
}

type ComponentProps = MapStateToProps & MapDispatchToProps;

const HeaderMenuComponent: FC<ComponentProps> = ({ currentUser, logout }) => {
    const location = useLocation<Location>();
    const history = useHistory<History>();

    const renderCurrentUserMenu = () => {
        return (
            <>
                <Menu.Item key={Route.Login} icon={<LogoutOutlined />}>
                    <a onClick={onLogout}>Logout</a>
                </Menu.Item>
            </>
        )
    }

    const renderGuestMenu = () => {
        return (
            <>
                <Menu.Item key={Route.Login} icon={<LoginOutlined />}>
                    <Link to={Route.Login}>
                        Login
                    </Link>
                </Menu.Item>
                <Menu.Item key={Route.SignUp} icon={<UserOutlined />}>
                    <Link to={Route.SignUp}>
                        Sign up
                    </Link>
                </Menu.Item>
            </>
        )
    }

    const onLogout = () => {
        logout();
        history.push(Route.Login);
    };

    return (
        <Menu
            mode="horizontal"
            className="top-menu"
            defaultSelectedKeys={['/']}
            selectedKeys={[location.pathname]}
        >
            {currentUser ? renderCurrentUserMenu() : renderGuestMenu()}
        </Menu>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToProps => {
    const { user } = state;

    return {
        currentUser: user.currentUser
    }
}

export default connect<MapStateToProps, MapDispatchToProps, unknown, AppStateType>(mapStateToProps, { logout })(HeaderMenuComponent);
