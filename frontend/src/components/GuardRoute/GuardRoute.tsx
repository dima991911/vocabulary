import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';

// TODO: change type any
type GuardRoutePropsType = {
    component: any
    path: string
    exact: boolean
    canBeOpen: boolean
}

const  PrivateRoute: FC<GuardRoutePropsType> = ({ exact = true, path, component, canBeOpen }) => (
    canBeOpen ? <Route path={path} exact={exact} component={component} /> : <Redirect to="/login" />
)

export default PrivateRoute;
