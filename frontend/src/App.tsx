import React, { FC } from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import './App.css';

import RoutePaths from "./constants/Route";

import { Dashboard, Login, SignUp } from "./pages";
import { HeaderMenuComponent, GuardRoute } from "./components";

import { store } from "./store";

const { Content, Footer, Header, Sider } = Layout;

const App: FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <Layout>
                    <Sider>Left sidebar</Sider>

                    <Layout className="main-section">
                        <Header className="site-layout-background">
                            <HeaderMenuComponent />
                        </Header>

                        <Layout className="content-section">
                            <Content className="site-layout-background">
                                <Switch>
                                    <Route path={RoutePaths.Dashboard} exact component={Dashboard} />
                                    <Route path={RoutePaths.Login} exact component={Login} />
                                    <Route path={RoutePaths.SignUp} exact component={SignUp} />
                                </Switch>
                            </Content>
                        </Layout>
                        <Footer>Footer</Footer>
                    </Layout>
                </Layout>
            </Router>
        </Provider>
    );
}

export default App;
