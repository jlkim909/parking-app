import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import { Provider } from 'react-redux';
import rootReducer from './store';
import { legacy_createStore } from 'redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={legacy_createStore(rootReducer)}>
    <BrowserRouter>
    <RecoilRoot>
      <App />
    </RecoilRoot>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
