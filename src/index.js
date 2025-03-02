// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { updateLocalEntries, uploadSubmissions } from './globalUpdateHandlers';

// Attach global functions to the window object.
window.updateLocalEntries = updateLocalEntries;
window.uploadSubmissions = uploadSubmissions;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
); 

reportWebVitals();
