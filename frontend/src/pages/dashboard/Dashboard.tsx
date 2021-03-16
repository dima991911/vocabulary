import React, { FC } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { PropsType as PagePropsTypes } from "../../types/page";
import { Classes, Settings, Tests, Vocabulary } from "../index";

import RoutePaths from '../../constants/Route';
import { IUserType, RequestStatusesEnum } from "../../types/types";
import { AppStateType } from "../../store";
import { connect } from "react-redux";

type MapStateToPropsType = {
    currentUser: IUserType | null
    userAuthStatus: RequestStatusesEnum | null
}

type PropsType = PagePropsTypes & MapStateToPropsType;

const Dashboard: FC<PropsType> = ({ currentUser, userAuthStatus }) => {

    if (!currentUser && userAuthStatus !== RequestStatusesEnum.Pending) {
        return <Redirect to={RoutePaths.Login} />
    }

    return (
        <Switch>
            <Route exact path={RoutePaths.Dashboard} render={() => <Redirect to={RoutePaths.Vocabulary} />} />
            <Route exact path={RoutePaths.Vocabulary} component={Vocabulary} />
            <Route exact path={RoutePaths.Classes} component={Classes} />
            <Route exact path={RoutePaths.Settings} component={Settings} />
            <Route exact path={RoutePaths.Tests} component={Tests} />
        </Switch>
    )
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    const { currentUser, userAuthStatus } = state.user;

    return {
        currentUser,
        userAuthStatus
    }
};

export default connect<MapStateToPropsType, unknown, PropsType, AppStateType>(mapStateToProps, null)(Dashboard);
