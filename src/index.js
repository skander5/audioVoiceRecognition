import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import HomePage from  './home'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Listening from "./listening/listening";
import FacialRecognition from "./facialRecognition/authenticate";

ReactDOM.render(
    <Router>
        <Routes>
            <Route exact path="/" element={<App/>}/>
            <Route exact path="/home" element={<HomePage/>}/>
            <Route exact path="/listening" element={<Listening/>}/>
            <Route exact path="/signin" element={<FacialRecognition/>}/>
        </Routes>
    </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
