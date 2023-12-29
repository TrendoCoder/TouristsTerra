import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SearchContextProvider } from './Context/searchcontext';
import { AuthContextProvider } from './Context/authcontext';
import { SearchPostContextProvider } from './Context/searchpostcontext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthContextProvider>
  <SearchPostContextProvider>
  <SearchContextProvider>
  <App />
  </SearchContextProvider>
  </SearchPostContextProvider>
  </AuthContextProvider>
  </React.StrictMode>
);
reportWebVitals();
