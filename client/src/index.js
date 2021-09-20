import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './App';
import { AuthProvider } from './context/AuthContext';

axios.defaults.baseURL = '/api';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
