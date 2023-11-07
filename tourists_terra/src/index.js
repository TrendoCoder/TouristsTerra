import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SearchContextProvider } from './Context/searchcontext';
import { AuthContextProvider } from './Context/authcontext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthContextProvider>
  <SearchContextProvider>
  <App />
  </SearchContextProvider>
  </AuthContextProvider>
  </React.StrictMode>
);
reportWebVitals();
