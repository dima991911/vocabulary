import React, { FC } from 'react';
import { connect } from "react-redux";
import { Spin } from 'antd';

import { AppStateType } from "../../store";

type MapStateToPropsType = {
    globalLoading: boolean
};

const Loading: FC<MapStateToPropsType> = ({ globalLoading }) => {
    return globalLoading ? (
        <div className="loader-container centered-flex">
            <Spin size="large" />
        </div>
    ) : null
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    const { app } = state;

    return {
        globalLoading: app.globalLoading
    }
}

export default connect<MapStateToPropsType, unknown, unknown, AppStateType>(mapStateToProps, null)(Loading);
