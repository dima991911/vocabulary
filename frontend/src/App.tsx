import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';

import { Home, Login, SignUp } from "./pages";

import { store } from "./store";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/signup" exact component={SignUp} />
                </div>
            </Router>
        </Provider>
    );
}

export default App;
