import React from 'react';
import ReactDOM from 'react-dom';
import './Assets/Stylesheets/fonts.css';
import './Assets/Stylesheets/colors.css';
import App from './app/App';

import store from './app/store';
import { Provider } from 'react-redux'

import "bootstrap";
import "@fortawesome/fontawesome-free/js/all.js";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { fetchTickerData } from './features/ticker/tickerSlice'

store.dispatch(fetchTickerData(store.getState().ticker.value));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
