//! apps/web/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './app/router';
import './app/styles/globals.css';

import { QueryClientProviderWrapper } from './app/providers/query-client';
import { ThemeProvider } from './app/providers/theme-provider';
import { SocketProvider } from './app/providers/socket-provider';
import AppStartup from './app/AppStartup';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProviderWrapper>
      <ThemeProvider>
        <SocketProvider>
          <Router />
          <AppStartup />
        </SocketProvider>
      </ThemeProvider>
    </QueryClientProviderWrapper>
  </React.StrictMode>,
);
