import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContextProvider } from "./context/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000, //sau 1 phút se goi lai
    }
  }
});

axios.defaults.baseURL = "https://deploy-restapi-crud.herokuapp.com/api";

ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ContextProvider>
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById("root")
);
