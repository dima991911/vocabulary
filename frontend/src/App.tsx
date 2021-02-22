import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import './App.css';

import { Home, Login, SignUp } from "./pages";
import { HeaderMenuComponent } from "./components";

import { store } from "./store";

const { Content, Footer, Header, Sider } = Layout;

function App() {
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
                                    <Route path="/" exact component={Home} />
                                    <Route path="/login" exact component={Login} />
                                    <Route path="/signup" exact component={SignUp} />
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
