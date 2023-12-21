import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App.tsx";
import "./index.css";
import {
  ForgotPassword,
  Home,
  Login,
  Register,
  ResetPassword,
  VerifyEmail,
} from "./pages/";
import { Cart, Paystack, ProductDetails, Protected } from "./components/";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route element={<Protected />}>
        <Route path="payment" element={<Paystack />} />
      </Route>
      <Route path="product/:id" element={<ProductDetails />} />
      <Route path="verify-email/:id/:token" element={<VerifyEmail />} />
      <Route path="auth/login" element={<Login />} />
      <Route path="auth/register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password/:id/:token" element={<ResetPassword />} />
      <Route
        path="*"
        element={
          <h2 className="min-h-[calc(100vh-128px)] text-2xl">Page not found</h2>
        }
      />
    </Route>
  )
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  </React.StrictMode>
);
