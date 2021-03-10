import React, { FC } from 'react';
import { Rate } from "antd";
import { FrownOutlined, MehOutlined, SmileOutlined, StarFilled } from "@ant-design/icons";

const customIcons = [
    <FrownOutlined />,
    <MehOutlined />,
    <SmileOutlined />,
];

type PropsType = {
    value: number
    onChange: (value: number) => void
    count?: number
    character?: 'star' | 'faces'
}

const RateComponent: FC<PropsType> = ({ value, count= 3,
                                          character = 'faces', onChange }) => {

    const renderCharacter = (options: any) => {
        if (character === 'star') {
            return <StarFilled />
        }
        return customIcons[options.index];
    };

    return (
        <div>
            <Rate
                allowClear={false}
                value={value}
                count={count}
                character={renderCharacter}
                onChange={onChange}
            />
        </div>
    )
}

export default RateComponent;
