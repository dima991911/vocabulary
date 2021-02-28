import React, { FC, ReactNode } from 'react';
import { Button, Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import "./DropdownActions.css";

export type DropdownAction = {
    title: string
    onClick: () => void
    danger?: boolean
}

type PropsType = {
    actions: Array<DropdownAction>
    icon?: ReactNode
}

const DropdownActions: FC<PropsType> = ({ actions, icon }) => {
    const renderActions = () => {
        return (
            <div className="actions-container">
                {actions.map((action, index) => (
                    <Button
                        key={index}
                        type="text"
                        danger={action.danger}
                        className="actions-container-item"
                        onClick={action.onClick}
                    >
                        {action.title}
                    </Button>
                ))}
            </div>
        )
    }

    const renderIcon = () => icon ? icon : <MoreOutlined style={{ fontSize: 26 }} />

    return (
        <div className="word-item-actions">
            <Dropdown
                overlay={renderActions()}
                placement="bottomRight"
                trigger={['click']}
            >
                <div className="dropdown-wrapper">
                    {renderIcon()}
                </div>
            </Dropdown>
        </div>
    )
}

export default DropdownActions;
