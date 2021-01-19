import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

/* Redux */
import reducers from "./redux/index";
import { Provider } from "react-redux";

//change axios base url
axios.defaults.baseURL = "http://localhost:5000/";

//redux config
const preloadedState = window.PRELOADED_STATE || {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line
const store = createStore(
  reducers,
  { ...preloadedState },
  composeEnhancers(applyMiddleware(thunk))
);



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
