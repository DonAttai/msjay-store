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
import {
  Cart,
  CheckoutPage,
  ProductDetails,
  Protected,
  PayWithPaystack,
} from "./components/";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="verify-email/:id/:token" element={<VerifyEmail />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password/:id/:token" element={<ResetPassword />} />
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route element={<Protected />}>
          <Route path="payment" element={<PayWithPaystack />} />
        </Route>
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route
          path="*"
          element={
            <h2 className="min-h-[calc(100vh-128px)] text-2xl">
              Page not found
            </h2>
          }
        />
      </Route>
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
      <Toaster />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  </React.StrictMode>
);
