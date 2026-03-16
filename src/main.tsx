import { createRoot } from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "@/features/common/components/ErrorBoundary";
import { Provider } from 'react-redux';
import { store } from './store';
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

const container = document.getElementById("root");
const root = createRoot(container!); 

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Provider>
);
