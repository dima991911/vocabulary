import React, { FC } from 'react';
import { connect } from "react-redux";
import { useLocation, Link } from 'react-router-dom';
import { Menu } from "antd";
import { PieChartOutlined, FormOutlined, TeamOutlined, SettingOutlined } from "@ant-design/icons";

import { logout } from "../../store/user/user.actions";
import { AppStateType } from "../../store";
import { IUserType } from "../../types/types";

import logo from '../../images/logo.svg';
import './LeftSidebar.css';
import Route from "../../constants/Route";

const { SubMenu } = Menu;

type MapStateToPropsType = {
    currentUser: IUserType | null
}

const LeftSidebar: FC<MapStateToPropsType> = ({ currentUser }) => {
    const location = useLocation<Location>();

    return currentUser ? (
        <>
            <div className="logo centered-flex">
                <img src={logo} alt="Logo Vocabulary"/>
            </div>
            <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
                <Menu.Item key={Route.Vocabulary} icon={<PieChartOutlined />}>
                    <Link to={Route.Vocabulary}>
                        Vocabulary
                    </Link>
                </Menu.Item>
                <Menu.Item key={Route.Classes} icon={<TeamOutlined />}>
                    <Link to={Route.Classes}>
                        Classes
                    </Link>
                </Menu.Item>
                <SubMenu key="sub1" icon={<FormOutlined />} title="Quizes">
                    <Menu.Item key={Route.Tests}>
                        <Link to={Route.Tests}>
                            History
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">Create</Menu.Item>
                </SubMenu>
                <Menu.Item key={Route.Settings} icon={<SettingOutlined />}>
                    <Link to={Route.Settings}>
                        Settings
                    </Link>
                </Menu.Item>
            </Menu>
        </>
    ) : null
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    const { user } = state;

    return {
        currentUser: user.currentUser
    }
}

export default connect<MapStateToPropsType, unknown, unknown, AppStateType>(mapStateToProps, { logout })(LeftSidebar);
