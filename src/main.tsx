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
  VerifyEmail,
  ResetPassword,
  GuestCheckout,
  Store,
} from "./pages";
import { Cart, CheckoutPage, ProductDetails } from "./components";
import { Toaster } from "react-hot-toast";
import AdminLayout from "./components/admin-layout.tsx";
import AdminDashboard from "./pages/admin/admin-dashboard.tsx";
import Orders from "./pages/admin/orders/orders.tsx";
import Products from "./pages/admin/products/products.tsx";
import Customers from "./pages/admin/customers/customers.tsx";
import Analytics from "./pages/admin/analytics/analytics.tsx";
import SuccessPage from "./pages/admin/orders/_components/success-page.tsx";
import OrderConfirmation from "./pages/admin/orders/_components/order-confirmation.tsx";
import React from "react";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="verify-email" element={<VerifyEmail />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password/:token" element={<ResetPassword />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="customers" element={<Customers />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="store" element={<Store />} />
        <Route path="cart" element={<Cart />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="/guest-checkout" element={<GuestCheckout />} />
        <Route
          path="order/confirmation"
          element={<OrderConfirmation reference="" />}
        />
        <Route path="order/success" element={<SuccessPage />} />
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
      staleTime: 5 * 60 * 1000,
      networkMode: "always",
    },
    mutations: {
      networkMode: "always",
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
