import React, { FC } from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import './App.css';

import RoutePaths from "./constants/Route";

import { Dashboard, Login, SignUp } from "./pages";
import { HeaderMenuComponent, LeftSidebar, GuardRoute, Loading } from "./components";

import { store } from "./store";

const { Content, Footer, Header, Sider } = Layout;

const App: FC = () => {
    return (
        <Provider store={store}>
            <Router>
                <Layout>
                    <Sider>
                        <LeftSidebar />
                    </Sider>

                    <Layout className="main-section">
                        <Header className="site-layout-background">
                            <HeaderMenuComponent />
                        </Header>

                        <Layout className="content-section">
                            <Content className="site-layout-background">
                                <Switch>
                                    <Route exact path={RoutePaths.Login} component={Login} />
                                    <Route exact path={RoutePaths.SignUp} component={SignUp} />
                                    <Route path={RoutePaths.Dashboard} component={Dashboard} />
                                    <Route render={() => (
                                        <div>Not found</div>
                                    )} />
                                </Switch>
                            </Content>
                        </Layout>
                        <Footer>Footer</Footer>
                    </Layout>
                </Layout>

                <Loading  />
            </Router>
        </Provider>
    );
}

export default App;
