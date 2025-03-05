import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "./layout/global.css";
import { App } from "./layout/App";

// Initialize QueryClient for React Query
export const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
