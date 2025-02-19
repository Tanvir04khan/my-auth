import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router";
import MyAuthProvider from "./provider/MyAuthProvider.tsx";

const querClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={querClient}>
    <ReactQueryDevtools initialIsOpen={false} />

    <BrowserRouter>
      <MyAuthProvider>
        <App />
      </MyAuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
