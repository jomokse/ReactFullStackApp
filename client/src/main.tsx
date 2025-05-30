// main.tsx
// Entry point for the React application. Sets up the root React DOM, routing, and global styles.

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Create the root React DOM node and render the app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* BrowserRouter enables client-side routing for the app */}
    <BrowserRouter>
      {/* App component contains all routes and main UI */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
