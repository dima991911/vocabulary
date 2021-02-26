import React, { FC } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { PropsType as PagePropsTypes } from "../../types/page";
import { Classes, Settings, Tests, Vocabulary } from "../index";

import RoutePaths from '../../constants/Route';
import { IUserType } from "../../types/types";
import { AppStateType } from "../../store";
import { connect } from "react-redux";

type MapStateToPropsType = {
    currentUser: IUserType | null
}

type PropsType = PagePropsTypes & MapStateToPropsType;

const Dashboard: FC<PropsType> = ({ currentUser }) => {

    if (!currentUser) {
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
    const { user } = state;

    return {
        currentUser: user.currentUser
    }
};



export default connect<MapStateToPropsType, unknown, PropsType, AppStateType>(mapStateToProps, null)(Dashboard);
