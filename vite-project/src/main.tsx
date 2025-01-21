// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import RouteConfig from './route';  // Import your RouteConfig

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> 
      <RouteConfig /> 
    </BrowserRouter>
  </StrictMode>
);
