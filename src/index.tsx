import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import {QueryClientProvider,QueryClient} from '@tanstack/react-query'
import { AppProvider } from './context';

const client=new QueryClient()
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppProvider>
      <Router>
        <QueryClientProvider client={client}>
          <App />
        </QueryClientProvider>
      </Router>
    </AppProvider>
  </React.StrictMode>
);

