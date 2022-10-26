import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StorageProvider } from './context/StorageContext';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <StorageProvider>
        <App />
      </StorageProvider>
    </AuthProvider>
  </React.StrictMode>
);
