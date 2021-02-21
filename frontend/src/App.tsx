import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout } from "antd";

import './App.css';

import { Home, Login, SignUp } from "./pages";

import { store } from "./store";

const { Content, Footer, Header, Sider } = Layout;

function App() {
    return (
        <Provider store={store}>
            <Layout>
                <Sider>Left sidebar</Sider>

                <Layout className="main-section">
                    <Header className="site-layout-background">Header</Header>
                    <Layout className="content-section">
                        <Content>
                            <div className="site-layout-background">
                                <Router>
                                    <Route path="/" exact component={Home} />
                                    <Route path="/login" exact component={Login} />
                                    <Route path="/signup" exact component={SignUp} />
                                </Router>
                            </div>
                        </Content>
                    </Layout>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        </Provider>
    );
}

export default App;
