import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      // retry: 3, // if a query fails, retry it 3 times,
      // staleTime: 1000 * 60 * 5, // 5 minutes - how long data is considered fresh, it has a default value of 0
      // stale data = old data
    },
  },
});

/*
If the data is stale, react query wil lattempt to fetch new data from the backend
while returning the stale data from the cache to the app. With this approach, we can
show the user the cached data immediately, while also getting the latest data in the
background. Once we have the updated data react query updates the cache and notifies
our component that the new data is available. Our component then will rerender with 
fresh data.
*/

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
