import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/* istanbul ignore next */
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

/* istanbul ignore next */
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/* istanbul ignore next */
reportWebVitals();