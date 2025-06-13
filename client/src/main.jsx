import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './Context/AppContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import MobileWarning from './components/MobileWarning.jsx';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <MobileWarning />
        <App />
        <Analytics />
        <SpeedInsights />
      </QueryClientProvider>
    </AppProvider>
  </BrowserRouter>
);
