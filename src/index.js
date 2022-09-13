import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { initialState } from "./context/initialState";
import reducer from "./context/reducer";
import { StateProvider } from "./context/StateProvider";
import "./index.css";

ReactDOM.render(
    <Router>
        <StateProvider intialState={initialState} reducer={reducer}>
            <App/>
        </StateProvider>
       
    </Router>

, document.getElementById("root"));



