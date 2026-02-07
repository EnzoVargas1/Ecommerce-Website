import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// import {Customers} from './redux/customers';
import reducer from './redux/reducers';


/**  
const store = createStore(
  combineReducers({
    shoes: Shoes,
    customers: Customers
  }),(applyMiddleware(thunk, logger)));
**/

const store = createStore(reducer, (applyMiddleware(thunk, logger)));

ReactDOM.render(
  <React.StrictMode>

    <BrowserRouter>
    <Provider store = {store}>
       <App /> 
    </Provider>
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
require('dotenv').config()
reportWebVitals();
