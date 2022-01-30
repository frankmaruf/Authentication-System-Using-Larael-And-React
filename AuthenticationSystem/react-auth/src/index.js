import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import App from './App';
//import tailwindcss
// import '../node_modules/tailwindcss/dist/tailwind.min.css';

import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.withCredentials = true;

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
